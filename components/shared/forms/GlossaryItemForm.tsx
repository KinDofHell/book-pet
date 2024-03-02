"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { GlossaryItemFormProps } from "@/types";
import { useState } from "react";
import { glossaryItemDefaultValues } from "@/constants";
import { glossaryItemFormSchema } from "@/lib/validator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/shared/forms/FileUploader";
import { useUploadThing } from "@/lib/uploadthing";

const GlossaryItemForm = ({
  type,
  glossaryItem,
  isAdmin,
  categoryName,
}: GlossaryItemFormProps) => {
  const router = useRouter();

  if (!isAdmin) {
    router.push("/");
  }

  const [files, setFiles] = useState<File[]>([]);

  const initialValues =
    glossaryItem && type === "UPDATE"
      ? glossaryItem
      : glossaryItemDefaultValues;

  const [tableInfoFields, setTableInfoFields] = useState<
    { key: string; value: string }[]
  >([{ key: "", value: "" }]);

  const addTableInfoField = () => {
    setTableInfoFields([...tableInfoFields, { key: "", value: "" }]);
  };

  const form = useForm<z.infer<typeof glossaryItemFormSchema>>({
    resolver: zodResolver(glossaryItemFormSchema),
    defaultValues: initialValues,
  });

  const { startUpload } = useUploadThing("imageUploader");

  const onSubmit = async (values: z.infer<typeof glossaryItemFormSchema>) => {
    const tableInfoArray = values.tableInfo.map(({ key, value }) => ({
      [key]: value,
    }));

    let uploadedImageUrl = values.imageUrl;
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    console.log({
      ...values,
      imageUrl: uploadedImageUrl,
      categoryId: categoryName,
      tableInfo: tableInfoArray,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Заголовок"
                    {...field}
                    className="border border-light-primary dark:border-dark-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-56">
                  <Textarea
                    placeholder="Опис"
                    {...field}
                    className="border border-light-primary dark:border-dark-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="history"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-56">
                  <Textarea
                    placeholder="Історія"
                    {...field}
                    className="border border-light-primary dark:border-dark-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additional"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-56">
                  <Textarea
                    placeholder="Додатково(опціонально)"
                    {...field}
                    className="border border-light-primary dark:border-dark-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {tableInfoFields.map((field, index) => (
          <div key={index} className="flex gap-3">
            <FormField
              control={form.control}
              name={`tableInfo.${index}.key` as const}
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormControl>
                    <Input
                      placeholder="Назва поля"
                      {...field}
                      className="border border-light-primary dark:border-dark-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`tableInfo.${index}.value` as const}
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormControl>
                    <Input
                      placeholder="Значення поля"
                      {...field}
                      className="border border-light-primary dark:border-dark-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
        <div className="w-full border-b border-light-primary dark:border-white pb-5">
          <Button
            type="button"
            onClick={addTableInfoField}
            size="lg"
            className="col-2 w-full bg-light-primary dark:bg-white dark:text-dark-primary"
          >
            Додати поле
          </Button>
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="col-2 w-full bg-light-primary dark:bg-white dark:text-dark-primary"
        >
          {form.formState.isSubmitting
            ? "Додавання..."
            : `${type === "CREATE" ? "Додати" : "Оновити"} запис`}
        </Button>
      </form>
    </Form>
  );
};
export default GlossaryItemForm;
