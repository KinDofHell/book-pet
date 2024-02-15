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
import { ICategory } from "@/lib/database/models/category.model";
import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/category.actions";

const CategoryForm = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    createCategory({ categoryName: newCategory.trim() }).then((category) => {
      setCategories((prevState) => [...prevState, category]);
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      if (categoryList) setCategories(categoryList as ICategory[]);
    };

    getCategories();
  }, []);

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
              onChange={(e) => setNewCategory(e.target.value)}
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
