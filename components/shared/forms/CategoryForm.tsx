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
import { startTransition, useState } from "react";
import { createCategory } from "@/lib/actions/category.actions";
import { usePathname } from "next/navigation";

const CategoryForm = () => {
  const pathname = usePathname();

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryType, setNewCategoryType] = useState("");

  const handleAddCategory = () => {
    createCategory({
      categoryName: newCategoryName.trim(),
      type: newCategoryType.trim(),
      path: pathname,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full max-w-[425px] py-3 uppercase tracking-wide text-black bg-white shadow-default mb-6 dark:bg-dark-primary dark:text-white hover:text-white hover:bg-light-gradient dark:hover:bg-dark-secondary-gradient">
        Додати Категорію
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white dark:bg-dark-primary dark:text-white dark:border-black">
        <AlertDialogHeader>
          <AlertDialogTitle>Нова категорія</AlertDialogTitle>
          <AlertDialogDescription>
            <Input
              type="text"
              placeholder="Назва категорії"
              className="input-field mt-3"
              onChange={(e) => setNewCategoryName(e.target.value)}
            ></Input>
            <Input
              type="text"
              placeholder="Тип категорії (ex. locations)"
              className="input-field mt-3"
              onChange={(e) => setNewCategoryType(e.target.value)}
            ></Input>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-black">
            Відмінити
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>
            Додати категорію
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default CategoryForm;
