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
import { deleteCategory } from "@/lib/actions/category.actions";
import { deleteGlossaryItem } from "@/lib/actions/glossaryItem.actions";

type DeleteConfirmationProps = {
  itemId: string;
  itemsType: "CATEGORY" | "GLOSSARY_ITEM";
  isUserAdmin: boolean;
};

const DeleteConfirmation = ({
  itemId,
  itemsType,
  isUserAdmin,
}: DeleteConfirmationProps) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Image
          src="/assets/icons/delete.svg"
          alt="delete icon"
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
              startTransition(async () => {
                if (itemsType === "CATEGORY") {
                  await deleteCategory({
                    isAdmin: isUserAdmin,
                    categoryId: itemId,
                    path: pathname,
                  });
                } else {
                  await deleteGlossaryItem({
                    isAdmin: isUserAdmin,
                    glossaryItemId: itemId,
                    path: pathname,
                  });
                }
              })
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
