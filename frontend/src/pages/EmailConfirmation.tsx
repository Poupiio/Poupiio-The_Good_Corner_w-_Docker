import { SubmitHandler, useForm } from "react-hook-form";
import { useConfirmEmailMutation } from "../generated/graphql-types";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EmailConfirmation = () => {
   const [confirmEmail] = useConfirmEmailMutation();
   const navigate = useNavigate();
   const { code } = useParams();
   type Inputs = {
     code: string;
   };
 
   const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm<Inputs>();
   const onSubmit: SubmitHandler<Inputs> = (data) => {
      confirmEmail({
         variables: { codeByUser: data.code },
         onCompleted: () => {
            navigate("/");
   
            toast.success("Adresse mail confirmée ! Merci de vous connecter.");
         },
         onError: () => {
            toast.error("Erreur lors de la confirmation.");
         },
      });
   };
   return (
      <form className="form confirmation-form" onSubmit={handleSubmit(onSubmit)}>
         <h1>Confirmez votre email</h1>
         <input
            defaultValue={code}
            placeholder="code"
            {...register("code", { required: true })}
         />
         {errors.code && <span>Le code est obligatoire !</span>}
         <button className="button" type="submit">Confirmer</button>
      </form>
   );
};

export default EmailConfirmation;