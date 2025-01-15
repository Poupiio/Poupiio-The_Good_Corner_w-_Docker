import AdInput from "../inputs/AdInput";
import { Ad } from "../entities/Ad";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import UpdateAdInput from "../inputs/UpdateAdInput";
import { User } from "../entities/User";

@Resolver(Ad)
export class AdResolver {
   @Query(() => [Ad])
   async getAllAds() {
      const ads = await Ad.find({
         order: {
            id: "DESC",
            pictures: {
               id: "DESC",
            },
         },
      });
      return ads;
   }

   @Query(() => Ad)
   async getAdById(@Arg("id") id: number) {
      const ad = await Ad.findOne({
        where: { id: id },
        order: { pictures: { id: "DESC" } },
      });

      if (ad === null) {
        throw new Error("Cannot find ad with id " + id);
      }
      return ad;
   }

   @Authorized()
   @Mutation(() => Ad)
   async createNewAd(@Arg("data") newData: AdInput, @Ctx() context: any) {
      console.log("context of create new ad mutation", context);
      const userFromContext = await User.findOneByOrFail({
         email: context.email,
      });
      const newAd = Ad.create({ 
         ...newData,
         user: userFromContext,
      });

      const adToSave = await newAd.save();
      return adToSave;
   }

   @Authorized()
   @Mutation(() => String)
   async removeAd(@Arg("id") id: number) {
      await Ad.delete(id);
      return "The ad has been successfully deleted!";
   }

   @Authorized()
   @Mutation(() => Ad)
   async updateAd(@Arg("data") dataToUpdate: UpdateAdInput) {
      let adToUpdate = await Ad.findOneByOrFail({ id: dataToUpdate.id });
      adToUpdate = Object.assign(adToUpdate, dataToUpdate);
   
      const adUpdated = await adToUpdate.save();
      return adUpdated;
   }
}