import * as z from "zod";

export const glossaryItemFormSchema = z.object({
  title: z
    .string()
    .min(3, "Заголовок повинен бути принаймні 4 символи")
    .max(50, "Заголовок має бути не більше 50 символів"),
  description: z
    .string()
    .min(10, "Опис має бути принаймні 10 символів")
    .max(2000, "Опис має бути не більше 2000 символів"),
  history: z
    .string()
    .min(10, "Історія має бути принаймні 10 символів")
    .max(2000, "Історія має бути не більше 2000 символів"),
  additional: z
    .string()
    .max(2000, "Історія має бути не більше 2000 символів")
    .optional(),
  imageUrl: z.string(),
  categoryId: z.string(),
  isVisible: z.boolean(),
  tableInfo: z.array(
    z.object({
      key: z.string().min(1, "Назва поля не може бути порожньою"),
      value: z.string().min(1, "Значення поля не може бути порожнім"),
    }),
  ),
});
