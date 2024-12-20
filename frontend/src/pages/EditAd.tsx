import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Category, Tag, useGetAdByIdAndAllCategoriesAndTagsQuery, useUpdateAdMutation } from "../generated/graphql-types";
import axios from "axios";


type FormValues = {
   title: string
   description: string,
   category: string,
   price: number,
   pictures: {url: string}[];
   location: string,
   tags: string[],
   __typename?: string;
}

const EditAd = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   
   const { loading, error, data } = useGetAdByIdAndAllCategoriesAndTagsQuery({
      variables: { getAdByIdId: parseInt(id as string) }
   });

   const [updateAd] = useUpdateAdMutation();

   const { register, handleSubmit, control, formState: { errors }, setValue, getValues, watch } = useForm<FormValues>({defaultValues: {
      title: data?.getAdById.title,
      description: data?.getAdById.description,
      // category: data?.getAdById.category.name,
      price: data?.getAdById.price,
      pictures: data?.getAdById?.pictures?.map((pic) => ({ url: pic.url })),
      location: data?.getAdById.location,
   }});

   watch("pictures");

   const { fields, append, remove } = useFieldArray({
      control,
      name: "pictures",
   });

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error?.message}</p>;
   
   const onSubmit: SubmitHandler<FormValues> = async (formData) => {
      console.log('form data', formData);
      
      try {
         console.log(formData);
         delete formData.__typename;
         
         const dataForBackend = {
            ...formData,
            pictures: formData.pictures.map((pic) => {
               return { url: pic.url };
            }),
            tags: formData.tags ? formData.tags.map((tagID) => ({ id: parseInt(tagID) })) : [],
            id: parseInt(id as string),
            price: Number(formData.price),
            category: formData.category
         }
         console.log(dataForBackend);
         
         await updateAd({
            variables: {
               data: dataForBackend
            },
         });
         toast.success("Ad has been updated");
         
         navigate("/");
      } catch (error) {
         console.error("Erreur lors de la création de l'annonce :", error, errors);
      }
   }

   if (data) {
      return (
         <>
            <h1>Modifier {data.getAdById.title}</h1>
            <form className="form" method="post" onSubmit={handleSubmit(onSubmit)}>
               <label htmlFor="title">Titre de l'annonce
                  <input className="text-field" type="text" {...register("title", { required: true })} placeholder="Titre de l'annonce" defaultValue={data.getAdById.title} />
               </label>
               
               <label htmlFor="description">Description
                  <textarea className="text-field" {...register("description")} id="description" placeholder="Description..." defaultValue={data.getAdById.description}></textarea>
               </label>
               
               <select className="text-field" {...register("category", { required: true })} id="category">
                  {data.getAllCategories.map((category: Category) => (
                     <option value={category.id} key={category.id}>{category.name}</option>
                  ))}
               </select>
               
               <label htmlFor="price">Prix
                  <input className="text-field" type="number" {...register("price", { required: true })} min="0" defaultValue={data.getAdById.price} />
               </label>
               
               <div className="images-container">
                  <label htmlFor="pictures">Modifier les images</label>
                  <button className="button add-image" type="button" onClick={() => append({ url: "" })}>+</button>
                  <div className="field images">
                     {fields.map((field, index) => {
                        return (
                           <div key={field.id}>
                              <section className="image-input-and-remove">
                                 {getValues(`pictures.${index}.url`) ? (
                                    <img src={getValues(`pictures.${index}.url`)} />
                                 ) : (
                                 <input
                                    id="file"
                                    type="file"
                                    onChange={async (
                                    e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                    if (e.target.files) {
                                       const formData = new FormData();
                                       formData.append("file", e.target.files[0]);

                                       try {
                                          const result = await axios.post("/img", formData);
                                          setValue(
                                          `pictures.${index}.url`,
                                          result.data.filename
                                          );
                                       } catch (error) {
                                          console.error(error);
                                       }
                                    }
                                    }}
                                 />
                                 )}
                                 <input
                                    className="text-field"
                                    placeholder="Entrez l'URL de votre image"
                                    {...register(`pictures.${index}.url` as const)}
                                    type="hidden"
                                 />
                                 <button className="button" onClick={() => remove(index)}>Supprimer</button>
                              </section>
                              <span>{errors.pictures?.[index]?.url?.message}</span>
                           </div>
                        );
                     })}
                  </div>
               </div>

               <label htmlFor="location">Localisation
                  <input className="text-field" type="text" {...register("location", { required: true })} placeholder="Paris" defaultValue={data.getAdById.location} />
               </label>

               <div className="checkbox-container">
                  {data.getAllTags.map((tag: Tag) => (
                     <label key={tag.id} htmlFor={`${tag.id}`}>
                        <input className="checkbox" type="checkbox" id={`${tag.id}`} value={tag.id} {...register("tags")} />{tag.name}
                     </label>
                  ))}
               </div>

               <button className="button" type="submit">Modifier</button>
            </form>
         </>
      );
   }
};

export default EditAd;