// import TagInput from "../inputs/TagInput";
import { Tag } from "../entities/Tag";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver(Tag)
export class TagResolver {
   @Query(() => [Tag])
   async getAllTags() {
      const tags = await Tag.find();
      return tags;
   }

   @Query(() => Tag)
   async getTagById(@Arg("id") id: number) {
      const tag = await Tag.findOneByOrFail({ id: id });
      return tag;
   }

   // @Mutation(() => Tag)
   // async createNewTag(@Arg("data") newData: Tag) {
   //    const newTag = new Tag();
   //    newTag.name = newData.name;
   //    const tagUpdated = await newTag.save();
   //    return tagUpdated;
   // }

   // @Mutation(() => Tag)
   // async updateTag(@Arg("id") id: number, @Arg("data")dataToUpdate: TagInput) {
   //    let tagToUpdate = await Tag.findOneByOrFail({ id: id });
   //    tagToUpdate = Object.assign(tagToUpdate, dataToUpdate);
   
   //    const tagUpdated = await tagToUpdate.save();
   //    return tagUpdated;
   // }

   // @Mutation(() => String)
   // async removeTagCategory(@Arg("id") id: number) {
   //    await Tag.delete(id);
   //    return "The tag has been successfully deleted!";
   // }
}