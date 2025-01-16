import { toast } from "react-toastify";
import { useLoginLazyQuery  } from "../generated/graphql-types";
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";

const Login = () => {
   const [login] = useLoginLazyQuery();
   const navigate = useNavigate();
   type Inputs = {
      login: string
      password: string
   }
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<Inputs>();
   const onSubmit: SubmitHandler<Inputs> = (data) => {
      console.log("data", data);
      login({ 
         variables: {
            data: {
               email: data.login,
               password: data.password
            }
         },
         onCompleted: () => {
            toast.success("Ravi de vous revoir !");
            navigate("/");
         },
         onError: (error) => {
            console.log("error", error);
         },
      });
   }

   return (
      <>
         <h1>Connexion</h1>
            
         <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="login">Votre email
               <input className="text-field" type="email" placeholder="monemail@gmail.com" {...register("login", { required: true })} />
               {errors.login && <span>Ce champ est requis.</span>}
            </label>

            <label htmlFor="password">Votre mot de passe
               <input className="text-field" type="password" {...register("password", { required: true })} />
               {errors.password && <span>Ce champ est requis.</span>}
            </label>

            <button className="button" type="submit">Connexion</button>
         </form>
      </>
   );
};

export default Login;