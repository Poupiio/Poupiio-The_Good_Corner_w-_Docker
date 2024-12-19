import { Category } from "../entities/Category";
import { Field, ID, InputType } from "type-graphql";
import { Tag } from "../entities/Tag";
import { Picture } from "../entities/Picture";
import { Ad } from "src/entities/Ad";

@InputType()
export class PictureInput {
  @Field()
  url: string;
}

@InputType()
export class TagInput {
  @Field()
  id: number;
}

@InputType()
class AdInput implements Partial<Ad> {
   @Field()
   title: string;

   @Field()
   description?: string;

   @Field()
   owner: string;
   
   @Field()
   price: number;

   @Field()
   location: string;

   @Field(() => ID)
   category: Category;

   @Field(() => [PictureInput], { nullable: true })
   pictures?: Picture[];

   @Field(() => [TagInput], { nullable: true })
   tags?: Tag[];
}

export default AdInput;