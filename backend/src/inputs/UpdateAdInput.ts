import { Ad } from "src/entities/Ad";
import { Category } from "../entities/Category";
import { Field, ID, InputType } from "type-graphql";
import { Tag } from "../entities/Tag";
import { Picture } from "../entities/Picture";
import { PictureInput, TagInput } from "./AdInput";

@InputType()
class UpdateAdInput implements Partial<Ad> {
   @Field()
   id: number;

   @Field({ nullable: true })
   title?: string;

   @Field({ nullable: true })
   description?: string;

   @Field({ nullable: true })
   owner?: string;

   @Field(() => [PictureInput], { nullable: true })
   pictures?: Picture[];

   @Field({ nullable: true })
   price?: number;

   @Field({ nullable: true })
   location?: string;

   @Field({ nullable: true })
   createdAt?: Date;

   @Field(() => ID)
   category?: Category;

   @Field(() => [TagInput], { nullable: true })
   tags: Tag[];
}

export default UpdateAdInput;