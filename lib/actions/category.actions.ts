"use server";

import {
  CreateCategoryParams,
  DeleteCategoryParams,
  UpdateCategoryParams,
} from "@/types";
import { handleError } from "@/lib/utils";
import { connectToDB } from "@/lib/database";
import Category from "@/lib/database/models/category.model";
import { revalidatePath } from "next/cache";
import GlossaryItem from "@/lib/database/models/glossaryItem.model";
import { DEFAULT_CATEGORY_ID } from "@/constants";

export const createCategory = async ({
  categoryName,
  type,
  path,
}: CreateCategoryParams) => {
  try {
    await connectToDB();

    const newCategory = await Category.create({
      name: categoryName,
      type: type,
    });

    if (newCategory) revalidatePath(path);

    return JSON.parse(JSON.stringify(newCategory));
  } catch (e) {
    handleError(e);
  }
};

export const getAllCategories = async () => {
  try {
    await connectToDB();

    const categories = await Category.find();
    return JSON.parse(JSON.stringify(categories));
  } catch (e) {
    handleError(e);
  }
};

export const updateCategory = async ({
  isAdmin,
  categoryId,
  categoryName,
  categoryType,
  path,
}: UpdateCategoryParams) => {
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  try {
    await connectToDB();

    const categoryToUpdate = await Category.findById(categoryId);
    if (!categoryToUpdate) {
      throw new Error("Category not found");
    }

    const updatedCategory = await Category.findOneAndUpdate(
      { _id: categoryId },
      { $set: { name: categoryName, type: categoryType } },
      { new: true },
    );

    if (!updatedCategory) {
      throw new Error("Failed to update the category");
    }

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedCategory));
  } catch (e) {
    handleError(e);
  }
};

export const deleteCategory = async ({
  isAdmin,
  categoryId,
  path,
}: DeleteCategoryParams) => {
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  try {
    await connectToDB();

    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (deletedCategory) {
      revalidatePath(path);
    }

    const updatedItems = await GlossaryItem.updateMany(
      { categoryId: categoryId },
      { $set: { categoryId: DEFAULT_CATEGORY_ID } },
    );

    return { message: "Category deleted and related items updated" };
  } catch (e) {
    handleError(e);
  }
};
