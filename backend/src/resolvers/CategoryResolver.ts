import CategoryInput from "../inputs/CategoryInput";
import { Category } from "../entities/Category";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver(Category)
export class CategoryResolver {
   @Query(() => [Category])
   async getAllCategories() {
      const categories = await Category.find();
      return categories;
   }

   @Query(() => Category)
   async getCategoryById(@Arg("id") id: number) {
      const category = await Category.findOneByOrFail({ id: id });
      return category;
   }

   @Mutation(() => Category)
   async createNewCategory(@Arg("data") newData: CategoryInput) {
      const newCategory = new Category();
      newCategory.name = newData.name;
      const categoryUpdated = await newCategory.save();
      return categoryUpdated;
   }

   @Mutation(() => Category)
   async updateCategory(@Arg("id") id: number, @Arg("data")dataToUpdate: CategoryInput) {
      let categoryToUpdate = await Category.findOneByOrFail({ id: id });
      categoryToUpdate = Object.assign(categoryToUpdate, dataToUpdate);
   
      const categoryUpdated = await categoryToUpdate.save();
      return categoryUpdated;
   }

   @Mutation(() => String)
   async removeCategory(@Arg("id") id: number) {
      await Category.delete(id);
      return "The category has been successfully deleted!";
   }
}