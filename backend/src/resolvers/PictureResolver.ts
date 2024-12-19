import { Picture } from "../entities/Picture";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver(Picture)
export class PictureResolver {
   @Query(() => [Picture])
   async getAllPictures() {
      const pictures = await Picture.find();
      return pictures;
   }

   @Query(() => Picture)
   async getPictureById(@Arg("id") id: number) {
      const picture = await Picture.findOneByOrFail({ id: id });
      return picture;
   }

   // @Mutation(() => Picture)
   // async createNewPicture(@Arg("data") newData: PictureInput) {
   //    const newPicture = new Picture();
   //    newPicture.url = newData.url;
   //    const PictureUpdated = await newPicture.save();
   //    return PictureUpdated;
   // }

   // @Mutation(() => Picture)
   // async updatePicture(@Arg("id") id: number, @Arg("data")dataToUpdate: PictureInput) {
   //    let PictureToUpdate = await Picture.findOneByOrFail({ id: id });
   //    PictureToUpdate = Object.assign(PictureToUpdate, dataToUpdate);
   
   //    const PictureUpdated = await PictureToUpdate.save();
   //    return PictureUpdated;
   // }

   // @Mutation(() => String)
   // async removePicture(@Arg("id") id: number) {
   //    await Picture.delete(id);
   //    return "The picture selected has been successfully deleted!";
   // }
}