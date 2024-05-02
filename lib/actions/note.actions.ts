"use server";

import { CreateNoteParams, DeleteNoteParams } from "@/types";
import { handleError } from "@/lib/utils";
import { connectToDB } from "@/lib/database";
import { revalidatePath } from "next/cache";
import Note, { INote } from "@/lib/database/models/note.model";
import { Types } from "mongoose";

export const createNote = async ({
  title,
  text,
  relatedGlossaryItemId,
  path,
  userId,
}: CreateNoteParams) => {
  try {
    await connectToDB();

    const noteData = {
      title,
      text,
      userId,
      ...(relatedGlossaryItemId !== "" && { relatedGlossaryItemId }),
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

    const allNotes: INote[] = await Note.find({ userId }).populate(
      "relatedGlossaryItemId",
    );

    return JSON.parse(JSON.stringify(allNotes));
  } catch (e) {
    handleError(e);
  }
};

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
export const deleteNote = async ({
  userId,
  noteId,
  path,
}: DeleteNoteParams) => {
  try {
    await connectToDB();

    const deletedCategory = await Note.findOneAndDelete({
      userId,
      _id: noteId,
    });
    if (deletedCategory) {
      revalidatePath(path);
    }

    return { message: "Note deleted" };
  } catch (e) {
    handleError(e);
  }
};
