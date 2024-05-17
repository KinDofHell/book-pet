"use server";

import { CreateNoteParams, DeleteNoteParams, UpdateNoteParams } from "@/types";
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

    const allNotes: INote[] = await Note.find({ userId }).populate({
      path: "relatedGlossaryItemId",
      populate: {
        path: "categoryId",
        model: "Category",
      },
    });

    return JSON.parse(JSON.stringify(allNotes));
  } catch (e) {
    handleError(e);
  }
};

export const updateNote = async ({
  noteId,
  title,
  content,
  relatedItemId,
  path,
}: UpdateNoteParams) => {
  try {
    await connectToDB();

    const noteToUpdate = await Note.findById(noteId);
    if (!noteToUpdate) {
      throw new Error("Note not found");
    }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId },
      {
        $set: {
          title: title,
          content: content,
          relatedGlossaryItemId: relatedItemId ? relatedItemId : null,
        },
      },
      { new: true },
    );

    if (!updatedNote) {
      throw new Error("Failed to update the note");
    }

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedNote));
  } catch (e) {
    handleError(e);
  }
};

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
