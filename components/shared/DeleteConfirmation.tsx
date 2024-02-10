"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

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

// import { deleteEvent } from "@/lib/actions/event.actions";

type DeleteConfirmationProps = {
  itemId: string;
  itemsType: "CATEGORY" | "ITEM";
};

const DeleteConfirmation = ({ itemId, itemsType }: DeleteConfirmationProps) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Image
          src="/assets/icons/delete.svg"
          alt="edit"
          width={20}
          height={20}
        />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white dark:bg-dark-primary dark:border-black dark:text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Ви впевнені, що хочете видалити{" "}
            {itemsType === "CATEGORY" ? "цю категорію" : "цей запис"}?
          </AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            Видалення - назавжди!
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-black">
            Відмінити
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-700"
            onClick={() =>
              // startTransition(async () => {
              //   await deleteEvent({ eventId, path: pathname });
              // })
              console.log("delete")
            }
          >
            {isPending ? "Видалення..." : "Видалити"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmation;
