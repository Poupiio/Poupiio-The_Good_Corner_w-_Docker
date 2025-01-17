import { SubmitHandler, useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "../generated/graphql-types";

const ForgottenPassword = () => {
   const [forgotPassword] = useForgotPasswordMutation();
   type Inputs = {
      email: string;
   };
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<Inputs>();
   const onSubmit: SubmitHandler<Inputs> = (data) => {
      console.log(data);
      forgotPassword({ variables: { userEmail: data.email } });
   };

   return (
      <form className="form confirmation-form" onSubmit={handleSubmit(onSubmit)}>
         <h1>Mot de passe oublié</h1>
         <input className="text-field" placeholder="email" {...register("email", { required: true })} />
         {errors.email && <span>Ce champ est requis !</span>}

         <button className="button" type="submit">Envoyer</button>
      </form>
   );
};

export default ForgottenPassword;