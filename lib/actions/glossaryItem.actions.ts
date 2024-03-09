"use server";

import { handleError } from "@/lib/utils";
import { connectToDB } from "@/lib/database";
import GlossaryItem from "@/lib/database/models/glossaryItem.model";
import { CreateGlossaryItemParams } from "@/types";
import Category from "@/lib/database/models/category.model";

export const createGlossaryItem = async ({
  title,
  description,
  history,
  additional,
  imageUrl,
  categoryType,
  isVisible,
  tableInfo,
}: CreateGlossaryItemParams) => {
  try {
    await connectToDB();

    const category = await Category.findOne({ type: categoryType });
    if (!category) {
      throw new Error(`Category with type "${categoryType}" not found`);
    }

    const newGlossaryItem = await GlossaryItem.create({
      title,
      description,
      history,
      additional,
      imageUrl,
      categoryId: category._id,
      isVisible,
      tableInfo,
    });

    return JSON.parse(JSON.stringify(newGlossaryItem));
  } catch (e) {
    handleError(e);
  }
};

// export const getAllCategories = async () => {
//   try {
//     await connectToDB();
//
//     const categories = await Category.find();
//     return JSON.parse(JSON.stringify(categories));
//   } catch (e) {
//     handleError(e);
//   }
// };
//
// export const updateCategory = async ({
//   isAdmin,
//   categoryId,
//   categoryName,
//   categoryType,
//   path,
// }: UpdateCategoryParams) => {
//   if (!isAdmin) {
//     throw new Error("Unauthorized");
//   }
//
//   try {
//     await connectToDB();
//
//     const categoryToUpdate = await Category.findById(categoryId);
//     if (!categoryToUpdate) {
//       throw new Error("Category not found");
//     }
//
//     const updatedCategory = await Category.findOneAndUpdate(
//       { _id: categoryId },
//       { $set: { name: categoryName, type: categoryType } },
//       { new: true },
//     );
//
//     if (!updatedCategory) {
//       throw new Error("Failed to update the category");
//     }
//
//     revalidatePath(path);
//
//     return JSON.parse(JSON.stringify(updatedCategory));
//   } catch (e) {
//     handleError(e);
//   }
// };
//
// export const deleteCategory = async ({
//   isAdmin,
//   categoryId,
//   defaultCategoryId,
//   path,
// }: DeleteCategoryParams) => {
//   if (!isAdmin) {
//     throw new Error("Unauthorized");
//   }
//
//   try {
//     await connectToDB();
//
//     const deletedCategory = await Category.findByIdAndDelete(categoryId);
//     if (deletedCategory) {
//       revalidatePath(path);
//     }
//
//     // // Find all related items and update their category field
//     // const updatedItems = await Item.updateMany(
//     //     { categoryId: categoryId }, // Condition to find related items
//     //     { $set: { categoryId: defaultCategoryId } } // Update to set the default category ID
//     // );
//     //
//     // if (updatedItems.matchedCount === 0) {
//     //   console.log("No related items found to update.");
//     // } else {
//     //   console.log(`${updatedItems.modifiedCount} related items updated to default category.`);
//     // }
//
//     return { message: "Category deleted and related items updated" };
//   } catch (e) {
//     handleError(e);
//   }
// };