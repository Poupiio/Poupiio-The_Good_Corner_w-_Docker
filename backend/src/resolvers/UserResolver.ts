import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import * as argon2 from "argon2";
import jwt, { Secret } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { User } from "../entities/User";
import { UserInput } from "../inputs/UserInput";
import { Resend } from "resend";
import { TempUser } from "../entities/TempUser";
import { ForgotPassword } from "../entities/ForgotPassword";

@ObjectType()
class UserInfo {
   @Field()
   isLoggedIn: boolean;

   @Field({ nullable: true })
   email?: string;
}

@Resolver(User)
class UserResolver {
   @Query(() => UserInfo)
   async getUserInfo(@Ctx() context: any) {
      if (context.email) {
         return { isLoggedIn: true, email: context.email };
      } else {
         return { isLoggedIn: false };
      }
   }

   @Mutation(() => String)
   async register(@Arg("data") newUserData: UserInput) {
      // On génère un code aléatoire
      const randomCode = uuidv4();
      // On sauvegarde l'utilisateur dans la table TempUser
      const result = await TempUser.save({
         email: newUserData.email,
         hashedPassword: await argon2.hash(newUserData.password),
         randomCode: randomCode,
      });
      const resend = new Resend(process.env.RESEND_API_KEY);
  
      (async function () {
         const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [newUserData.email],
            subject: "Verify Email",
            html: `
               <p>Merci de cliquer sur le lien ci-dessous pour valider votre adresse email</p>
               <a href="http://localhost:9000/confirm/${randomCode}">
                  http://localhost:9000/confirm/${randomCode}
               </a>
               `,
         });
  
         if (error) {
            return console.error({ error });
         }
   
         console.log({ data });
      })();
      console.log("result", result);
      return "The user was created";
   }

   @Mutation(() => String)
   async login(@Arg("data") loginUserdata: UserInput, @Ctx() context: any) {
      let isPasswordCorrect = false;
      // On récupère l'utilisateur via son email s'il existe
      // "findOneByOrFail" nous renverrait comme erreur que l'email n'est pas bon, pour des raisons de sécurité, on utilise findOneBy
      const user = await User.findOneBy({ email: loginUserdata.email });
      if (user) {
         isPasswordCorrect = await argon2.verify(user.hashedPassword, loginUserdata.password);
      }
      // On vérifie son mdp => retourne un booléen
      if (isPasswordCorrect && user) {
         /* Le jwt prend 2 arguments :
            1. Les éléments du payload (exemple : email, role, etc)
            2. La clé secrète (stockée dans un fichier .env pour plus de sécurité)
         */
         const token = jwt.sign({email: user.email, userRole: user.role}, process.env.JWT_SECRET_KEY as Secret);
         // Stockage du token dans les cookies
         context.res.setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly`);
         return "User logged in.";
      } else {
         throw new Error('Incorrect login');
      }
   }

   @Mutation(() => String)
   async logout(@Ctx() context: any) {
      context.res.setHeader(
         "Set-Cookie",
         `token=; Secure; HttpOnly;expires=${new Date(Date.now()).toUTCString()}`
      );
      return "User logged out.";
   }

   @Mutation(() => String)
   async confirmEmail(@Arg("codeByUser") codeByUser: string) {
      const tempUser = await TempUser.findOneByOrFail({ randomCode: codeByUser });
      // L'utilisateur a bien confirmé son adresse, on l'enregistre dans la table user
      await User.save({
         email: tempUser.email,
         hashedPassword: tempUser.hashedPassword,
      });
      // et on le retire de la table tempUser
      tempUser.remove();
      return "User email confirmed with success.";
   }

   @Mutation(() => String)
   async forgotPassword(@Arg("userEmail") userEmail: string) {
      const user = await User.findOneByOrFail({ email: userEmail });
      const randomCode = uuidv4();
      await ForgotPassword.save({ email: user.email, randomCode: randomCode });
      const resend = new Resend(process.env.RESEND_API_KEY);

      (async function () {
         const { data, error } = await resend.emails.send({
         from: "Acme <onboarding@resend.dev>",
            to: [user.email],
            subject: "Change Password",
            html: `
               <p>Please click the link below to change your password</p>
               <a href="http://localhost:9000/reset-password/${randomCode}">
                  http://localhost:9000/reset-password/${randomCode}
               </a>
            `,
         });

         if (error) {
            return console.error({ error });
         }
         console.log({ data });
      })();
      return "ok";
   }

   @Mutation(() => String)
   async changePassword(@Arg("code") code: string, @Arg("password") password: string) {
      const forgotPasswordUser = await ForgotPassword.findOneByOrFail({
         randomCode: code,
      });
      const user = await User.findOneByOrFail({
         email: forgotPasswordUser.email,
      });
      user.hashedPassword = await argon2.hash(password);
      user.save();
      forgotPasswordUser.remove();
      return "ok";
   }
}

export default UserResolver;