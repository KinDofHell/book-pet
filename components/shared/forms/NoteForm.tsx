"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { startTransition, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NoteFormProps } from "@/types";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import SelectGlossaryItemWithSearch from "@/components/shared/forms/SelectGlossaryItemWithSearch";
import { createNote, updateNote } from "@/lib/actions/note.actions";
import { Button } from "@/components/ui/button";

const NoteForm = ({
  mode,
  noteData,
  creatorId,
  glossaryItems,
}: NoteFormProps) => {
  const pathname = usePathname();

  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [newGlossaryItemRelated, setGlossaryItemRelated] = useState<any>("");
  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (mode === "UPDATE" && noteData) {
      setNewNoteTitle(noteData.title);
      setNewNoteContent(noteData.content);
      if (noteData.relatedItemId)
        setGlossaryItemRelated(noteData.relatedItemId);
    }
  }, [mode, noteData]);

  const validateFields = () => {
    let valid = true;
    if (!newNoteTitle.trim()) {
      setTitleError("Заголовок є обов'язковим");
      valid = false;
    } else {
      setTitleError("");
    }
    if (!newNoteContent.trim()) {
      setContentError("Текст нотатки є обов'язковим");
      valid = false;
    } else {
      setContentError("");
    }
    return valid;
  };

  const handleAddNote = () => {
    setError("");
    if (!validateFields()) return;

    startTransition(() => {
      if (mode === "CREATE") {
        createNote({
          title: newNoteTitle.trim(),
          text: newNoteContent.trim(),
          userId: creatorId,
          relatedGlossaryItemId: newGlossaryItemRelated,
          path: pathname,
        })
          .then(() => {
            setNewNoteTitle("");
            setNewNoteContent("");
            setGlossaryItemRelated("");
            setIsModalOpen(false);
          })
          .catch((error: any) => {
            setError(
              "Помилка створення нотатки! Переконайтеся, що заголовок унікальний!",
            );
          });
      } else if (noteData) {
        updateNote({
          noteId: noteData.id,
          title: newNoteTitle.trim(),
          content: newNoteContent.trim(),
          relatedItemId: newGlossaryItemRelated,
          path: pathname,
        })
          .then(() => {
            setNewNoteTitle("");
            setNewNoteContent("");
            setGlossaryItemRelated("");
            setIsModalOpen(false);
          })
          .catch((error: any) => {
            setError(
              "Помилка створення нотатки! Переконайтеся, що заголовок унікальний!",
            );
          });
      }
    });
  };

  return (
    <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AlertDialogTrigger
        className={`w-full max-w-[425px] py-3 uppercase tracking-wide text-black ${
          mode === "CREATE"
            ? "bg-white shadow-default mb-6 dark:bg-dark-primary hover:text-white hover:bg-light-gradient dark:hover:bg-dark-secondary-gradient"
            : ""
        } dark:text-white`}
        onClick={() => setIsModalOpen(true)}
      >
        {mode === "CREATE" ? (
          "Додати нотатку"
        ) : (
          <Image
            src="/assets/icons/edit.svg"
            alt="edit icon"
            width={18}
            height={18}
            className="bg-light-primary rounded dark:bg-transparent"
          />
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white dark:bg-dark-primary dark:text-white dark:border-black">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {mode === "CREATE" ? "Нова нотатка" : "Зберегти нотатку"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mt-3">
              <Input
                type="text"
                placeholder="Заголовок"
                className="input-field"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
              />
              {titleError && <p className="text-red-500">{titleError}</p>}
            </div>
            <div className="mt-3">
              <Textarea
                placeholder="Текст нотатки"
                className="input-field"
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
              />
              {contentError && <p className="text-red-500">{contentError}</p>}
            </div>
            <SelectGlossaryItemWithSearch
              glossaryItems={glossaryItems}
              value={newGlossaryItemRelated}
              setOuterValue={setGlossaryItemRelated}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-black">
            Відмінити
          </AlertDialogCancel>
          <Button onClick={() => startTransition(handleAddNote)}>
            {mode === "CREATE" ? "Додати нотатку" : "Зберегти зміни"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NoteForm;
