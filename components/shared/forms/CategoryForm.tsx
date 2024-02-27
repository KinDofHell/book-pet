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
import { createCategory, updateCategory } from "@/lib/actions/category.actions";
import { usePathname } from "next/navigation";
import { CategoryFormProps } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const CategoryForm = ({ mode, categoryData, isAdmin }: CategoryFormProps) => {
  const pathname = usePathname();

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryType, setNewCategoryType] = useState("");

  useEffect(() => {
    if (mode === "UPDATE" && categoryData) {
      setNewCategoryName(categoryData.name);
      setNewCategoryType(categoryData.type);
    }
  }, [mode, categoryData]);

  const handleAddCategory = () => {
    if (mode === "CREATE") {
      createCategory({
        categoryName: newCategoryName.trim(),
        type: newCategoryType.trim(),
        path: pathname,
      });
    } else if (categoryData) {
      updateCategory({
        isAdmin,
        categoryId: categoryData.id,
        categoryName: newCategoryName.trim(),
        categoryType: newCategoryType.trim(),
        path: pathname,
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`w-full max-w-[425px] py-3 uppercase tracking-wide text-black ${mode === "CREATE" ? "bg-white shadow-default mb-6 dark:bg-dark-primary hover:text-white hover:bg-light-gradient dark:hover:bg-dark-secondary-gradient" : ""} dark:text-white`}
      >
        {mode === "CREATE" ? (
          "Додати категорію"
        ) : (
          <Image
            src="/assets/icons/edit.svg"
            alt="edit icon"
            width={18}
            height={18}
          />
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white dark:bg-dark-primary dark:text-white dark:border-black">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {mode === "CREATE" ? "Нова категорія" : "Зберегти категорію"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Input
              type="text"
              placeholder="Назва категорії"
              className="input-field mt-3"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            ></Input>
            <Input
              type="text"
              placeholder="Тип категорії (ex. locations)"
              className="input-field mt-3"
              value={newCategoryType}
              onChange={(e) => setNewCategoryType(e.target.value)}
            ></Input>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-black">
            Відмінити
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>
            {mode === "CREATE" ? "Додати категорію" : "Зберегти зміни"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default CategoryForm;
