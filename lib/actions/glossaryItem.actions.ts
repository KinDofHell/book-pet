"use server";

import { handleError } from "@/lib/utils";
import { connectToDB } from "@/lib/database";
import GlossaryItem from "@/lib/database/models/glossaryItem.model";
import { CreateGlossaryItemParams, DeleteGlossaryItemParams } from "@/types";
import Category from "@/lib/database/models/category.model";
import { revalidatePath } from "next/cache";

export const createGlossaryItem = async (
  {
    title,
    description,
    history,
    additional,
    imageUrl,
    categoryType,
    isVisible,
    tableInfo,
  }: CreateGlossaryItemParams,
  path: string,
) => {
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

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newGlossaryItem));
  } catch (e) {
    handleError(e);
  }
};

export const getAllGlossaryItems = async (type: string) => {
  try {
    await connectToDB();

    const category = await Category.findOne({ type: type });

    if (category) {
      const glossaryItems = await GlossaryItem.find({
        categoryId: category._id,
      });
      return JSON.parse(JSON.stringify(glossaryItems));
    }
  } catch (e) {
    handleError(e);
  }
};

export const getGlossaryItemById = async (id: string) => {
  try {
    await connectToDB();

    const glossaryItem = await GlossaryItem.findById(id);

    if (!glossaryItem) throw new Error("Glossary item not found");

    return JSON.parse(JSON.stringify(glossaryItem));
  } catch (e) {
    handleError(e);
  }
};

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

export const deleteGlossaryItem = async ({
  isAdmin,
  glossaryItemId,
  path,
}: DeleteGlossaryItemParams) => {
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  try {
    await connectToDB();

    const deletedGlossaryItem =
      await GlossaryItem.findByIdAndDelete(glossaryItemId);
    if (deletedGlossaryItem) {
      revalidatePath(path);
    }

    return { message: "Glossary item deleted and related items updated" };
  } catch (e) {
    handleError(e);
  }
};
