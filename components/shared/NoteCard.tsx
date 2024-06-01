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
import Link from "next/link";
import { INote } from "@/lib/database/models/note.model";
import NoteForm from "@/components/shared/forms/NoteForm";

type NoteCardProps = {
  id: string;
  title: string;
  content: string;
  userId: string;
  relatedGlossaryItem?: any;
  glossaryItems: IGlossaryItem[];
};

const NoteCard = ({
  id,
  title,
  content,
  userId,
  relatedGlossaryItem,
  glossaryItems,
}: NoteCardProps) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  return (
    <div className="relative w-[425px]">
      <div className="absolute -right-1 -top-4">
        <NoteForm
          creatorId={userId}
          mode="UPDATE"
          noteData={{
            id,
            title,
            content,
            relatedItemId: relatedGlossaryItem,
          }}
          glossaryItems={glossaryItems}
        />
      </div>
      <AlertDialog>
        <AlertDialogTrigger
          className={`w-full max-w-[425px] py-3 px-6 uppercase tracking-wide text-white rounded-2xl bg-light-primary shadow-default dark:bg-dark-secondary-gradient hover:text-white hover:bg-light-gradient dark:hover:bg-dark-gradient dark:text-white`}
        >
          {title}
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white dark:bg-dark-primary dark:text-white dark:border-black">
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{content}</AlertDialogDescription>
            <AlertDialogDescription className="border-t border-black pt-4 dark:border-white">
              {relatedGlossaryItem && (
                <>
                  <span>{`Прив'язаний запис:`} </span>
                  <Link
                    href={`/sections/${relatedGlossaryItem.categoryId.type}/${relatedGlossaryItem._id}`}
                    className="p-1 rounded bg-light-primary text-black dark:bg-white"
                  >
                    {relatedGlossaryItem.title}
                  </Link>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:text-black">
              Закрити
            </AlertDialogCancel>
            <div className="w-full flex justify-between gap-2 tablet:justify-end">
              <AlertDialogAction
                className="bg-red-700 hover:bg-red-800 w-full tablet:w-auto"
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
    </div>
  );
};

export default NoteCard;
