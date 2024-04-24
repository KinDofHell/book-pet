"use server";

import { CreateNoteParams } from "@/types";
import { handleError } from "@/lib/utils";
import { connectToDB } from "@/lib/database";
import { revalidatePath } from "next/cache";
import Note, { INote } from "@/lib/database/models/note.model";
import { Types } from "mongoose";

export const createNote = async ({
  title,
  text,
  relatedGlossaryItem,
  path,
  userId,
}: CreateNoteParams) => {
  try {
    await connectToDB();

    const noteData = {
      title,
      text,
      userId,
      ...(relatedGlossaryItem !== "" && { relatedGlossaryItem }),
    };

    const newNote = await Note.create(noteData);

    if (newNote) revalidatePath(path);

    return JSON.parse(JSON.stringify(newNote));
  } catch (e) {
    handleError(e);
  }
};

export const getAllNotes = async (userId: string) => {
  try {
    await connectToDB();

    if (!Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    const allNotes: INote[] = await Note.find({ userId });

    console.log(allNotes);

    return JSON.parse(JSON.stringify(allNotes));
  } catch (e) {
    handleError(e);
  }
};

//
// export const getAllSavedCategories = async (isAdmin: boolean, userId: string) => {
//     try {
//         await connectToDB();
//
//         const user = await User.findById(userId);
//
//         if (!user) {
//             throw new Error('User not found');
//         }
//
//         const allCategories = await Category.find();
//
//         if (isAdmin) {
//             return JSON.parse(JSON.stringify(allCategories));
//         }
//
//         const categoriesWithGlossaryItems = await Promise.all(
//             allCategories.map(async (category) => {
//                 const glossaryItems = await GlossaryItem.find({
//                     categoryId: category._id,
//                     isVisible: true,
//                     _id: { $in: user.savedGlossaryItems },
//                 });
//
//                 if (glossaryItems.length > 0) {
//                     return category;
//                 }
//
//                 return null;
//             }),
//         );
//
//         const filteredCategories = categoriesWithGlossaryItems.filter(Boolean);
//
//         return JSON.parse(JSON.stringify(filteredCategories));
//     } catch (e) {
//         handleError(e);
//     }
// };
//
//
// export const updateCategory = async ({
//                                          isAdmin,
//                                          categoryId,
//                                          categoryName,
//                                          categoryType,
//                                          path,
//                                      }: UpdateCategoryParams) => {
//     if (!isAdmin) {
//         throw new Error("Unauthorized");
//     }
//
//     try {
//         await connectToDB();
//
//         const categoryToUpdate = await Category.findById(categoryId);
//         if (!categoryToUpdate) {
//             throw new Error("Category not found");
//         }
//
//         const updatedCategory = await Category.findOneAndUpdate(
//             { _id: categoryId },
//             { $set: { name: categoryName, type: categoryType } },
//             { new: true },
//         );
//
//         if (!updatedCategory) {
//             throw new Error("Failed to update the category");
//         }
//
//         revalidatePath(path);
//
//         return JSON.parse(JSON.stringify(updatedCategory));
//     } catch (e) {
//         handleError(e);
//     }
// };
//
// export const deleteCategory = async ({
//                                          isAdmin,
//                                          categoryId,
//                                          path,
//                                      }: DeleteCategoryParams) => {
//     if (!isAdmin) {
//         throw new Error("Unauthorized");
//     }
//
//     try {
//         await connectToDB();
//
//         const deletedCategory = await Category.findByIdAndDelete(categoryId);
//         if (deletedCategory) {
//             revalidatePath(path);
//         }
//
//         const updatedItems = await GlossaryItem.updateMany(
//             { categoryId: categoryId },
//             { $set: { categoryId: DEFAULT_CATEGORY_ID } },
//         );
//
//         return { message: "Category deleted and related items updated" };
//     } catch (e) {
//         handleError(e);
//     }
// };
