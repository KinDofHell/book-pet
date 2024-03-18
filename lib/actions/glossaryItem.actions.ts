"use server";

import { handleError } from "@/lib/utils";
import { connectToDB } from "@/lib/database";
import GlossaryItem from "@/lib/database/models/glossaryItem.model";
import {
  CreateGlossaryItemParams,
  DeleteGlossaryItemParams,
  UpdateGlossaryItemParams,
} from "@/types";
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

export const updateGlossaryItem = async ({
  isAdmin,
  glossaryItem,
  path,
}: UpdateGlossaryItemParams) => {
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  try {
    await connectToDB();

    const glossaryItemToUpdate = await GlossaryItem.findById(glossaryItem._id);
    if (!glossaryItemToUpdate) {
      throw new Error("Glossary item not found");
    }

    const updatedGlossaryItem = await GlossaryItem.findByIdAndUpdate(
      glossaryItem._id,
      { ...glossaryItem },
      { new: true },
    );
    revalidatePath(path);

    if (!updatedGlossaryItem) {
      throw new Error("Failed to update the glossary item");
    }

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedGlossaryItem));
  } catch (e) {
    handleError(e);
  }
};

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
