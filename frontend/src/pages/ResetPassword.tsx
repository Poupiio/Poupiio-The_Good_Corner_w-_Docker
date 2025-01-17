import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useChangePasswordMutation } from "../generated/graphql-types";
import { toast } from "react-toastify";

const ResetPassword = () => {
   const [changePassword] = useChangePasswordMutation();
   const { code } = useParams();
   const navigate = useNavigate();
   type Inputs = {
      code: string;
      password: string;
      confirmation: string,
   };
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<Inputs>();
   const onSubmit: SubmitHandler<Inputs> = (data) => {
      if (data.password === data.confirmation) {
         changePassword({
            variables: { code: data.code, password: data.password },
            onCompleted: () => {
            navigate("/");
            toast.success("Votre mot de passe a bien été modifié.");
            },
            onError: () => {
            toast.error("Error");
            },
         });
      } else {
         toast.error("Les mots de passe ne correspondent pas.")
         throw new Error("Les adresses email ne correspondent pas.");
      }
   };
   return (
      <form className="form confirmation-form" onSubmit={handleSubmit(onSubmit)}>
         <h1>Réinitialiser mon mot de passe</h1>
         <input className="code-reset" defaultValue={code} placeholder="code" {...register("code", { required: true })} />
         {errors.code && <span>Ce champ est requis !</span>}

         <label htmlFor="password">Votre nouveau mot de passe
            <input className="text-field pwd" type="password" {...register("password", { required: true })} />
            {errors.password && <span>Ce champ est obligatoire !</span>}
         </label>
         <label htmlFor="confirmation">Confirmez votre mot de passe
            <input className="text-field pwd" type="password" {...register("confirmation", { required: true })} />
            {errors.password && <span>Ce champ est obligatoire !</span>}
         </label>
      
         <button className="button" type="submit">Modifier</button>
      </form>
  );
};

export default ResetPassword;