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
      name: string,
      email: string,
      password: string
   }
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<Inputs>();
   const onSubmit: SubmitHandler<Inputs> = (data) => {
      console.log("data", data);
      signUp({ 
         variables: {
            data: {
               // name: data.name,
               email: data.email,
               password: data.password
            }
         },
         onCompleted: () => {
            toast.success("Bienvenue !");
            navigate("/");
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
            <label htmlFor="name">Votre email
               <input className="text-field" type="text" placeholder="Angelina Polie" {...register("name", { required: true })} />
               {errors.name && <span>Ce champ est requis.</span>}
            </label>

            <label htmlFor="login">Votre email
               <input className="text-field" type="email" placeholder="monemail@gmail.com" {...register("email", { required: true })} />
               {errors.email && <span>Ce champ est requis.</span>}
            </label>

            <label htmlFor="password">Votre mot de passe
               <input className="text-field" type="password" {...register("password", { required: true })} />
               {errors.password && <span>Ce champ est requis.</span>}
            </label>

            <button className="button" type="submit">Connexion</button>
            <p>Vous avez déjà un compte ?
               <Link to="/login" className="button link-button">Connectez-vous</Link>
            </p>
         </form>
      </>
   );
};

export default Register;