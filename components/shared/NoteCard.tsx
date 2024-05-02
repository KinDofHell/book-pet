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
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SelectGlossaryItemWithSearch from "@/components/shared/forms/SelectGlossaryItemWithSearch";
import { startTransition, useTransition } from "react";
import { deleteCategory } from "@/lib/actions/category.actions";
import { deleteGlossaryItem } from "@/lib/actions/glossaryItem.actions";
import { usePathname } from "next/navigation";
import { deleteNote } from "@/lib/actions/note.actions";
import { IGlossaryItem } from "@/lib/database/models/glossaryItem.model";

type NoteCardProps = {
  id: string;
  title: string;
  content: string;
  userId: string;
  relatedGlossaryItem?: any;
};

const NoteCard = ({
  id,
  title,
  content,
  userId,
  relatedGlossaryItem,
}: NoteCardProps) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`w-full max-w-[425px] py-3 uppercase tracking-wide text-white rounded-2xl bg-light-primary shadow-default mb-6 dark:bg-dark-secondary-gradient hover:text-white hover:bg-light-gradient dark:hover:bg-dark-gradient dark:text-white`}
      >
        {title}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white dark:bg-dark-primary dark:text-white dark:border-black">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{content}</AlertDialogDescription>
          <AlertDialogDescription>
            {relatedGlossaryItem.title}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-black">
            Закрити
          </AlertDialogCancel>
          <div className="w-full flex justify-between gap-2 tablet:justify-end">
            <AlertDialogAction className="bg-light-primary hover:bg-light-gradient dark:bg-white dark:text-black w-1/2 dark:hover:text-white tablet:w-auto">
              Редагувати
            </AlertDialogAction>
            <AlertDialogAction
              className="bg-red-700 hover:bg-red-800 w-1/2 tablet:w-auto"
              onClick={() =>
                startTransition(async () => {
                  await deleteNote({
                    userId: userId,
                    noteId: id,
                    path: pathname,
                  });
                })
              }
            >
              Видалити
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NoteCard;
