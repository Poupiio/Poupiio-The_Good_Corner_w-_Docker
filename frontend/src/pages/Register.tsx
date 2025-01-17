import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../generated/graphql-types";
import { GET_USER_INFO } from "../graphql/queries";
import { toast } from "react-toastify";

const Register = () => {
   const [signUp] = useRegisterMutation({
      refetchQueries: [{ query: GET_USER_INFO }],
   });
   const navigate = useNavigate();
   type Inputs = {
      email: string,
      password: string
   }
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<Inputs>();
   const onSubmit: SubmitHandler<Inputs> = (data) => {
      signUp({ 
         variables: {
            data: {
               email: data.email,
               password: data.password
            }
         },
         onCompleted: () => {
            toast.success("Vous pouvez à présent confirmer votre adresse email !");
            navigate("/confirm");
         },
         onError: (error) => {
            console.log("error", error);
         },
      });
   }
   return (
      <>
         <h1>Inscription</h1>
         <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="login">Votre email
               <input className="text-field" type="email" placeholder="monemail@gmail.com" {...register("email", { required: true })} />
               {errors.email && <span>Ce champ est requis.</span>}
            </label>

            <label htmlFor="password">Votre mot de passe
               <input className="text-field" type="password" {...register("password", { required: true })} />
               {errors.password && <span>Ce champ est requis.</span>}
            </label>
            <button className="button" type="submit">Créer</button>
            <div className="switch-login">
               <p>Vous avez déjà un compte ?</p>
               <Link to="/login" className="login-button">Connectez-vous</Link>
            </div>
         </form>
      </>
   );
};

export default Register;