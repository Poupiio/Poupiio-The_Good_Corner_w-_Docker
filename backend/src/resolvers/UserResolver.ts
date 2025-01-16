import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import * as argon2 from "argon2";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../entities/User";
import { UserInput } from "../inputs/UserInput";

@ObjectType()
class UserInfo {
   @Field()
   isLoggedIn: boolean;

   @Field({ nullable: true })
   email?: string;
}

@Resolver(User)
class UserResolver {
   @Mutation(() => String)
   async register(@Arg("data") newUserData: UserInput) {
      const result = await User.save({
         email: newUserData.email,
         hashedPassword: await argon2.hash(newUserData.password),
      });
      console.log("result", result);
      return "User registered.";
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
         const token = jwt.sign({email: user.email}, process.env.JWT_SECRET_KEY as Secret);
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

   @Query(() => UserInfo)
   async getUserInfo(@Ctx() context: any) {
      if (context.email) {
         return { isLoggedIn: true, email: context.email };
      } else {
         return { isLoggedIn: false };
      }
   }
}

export default UserResolver;