import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IObjectsArray, ObjectArrayParams } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    year: "numeric",
    day: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions,
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions,
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions,
  );

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const convertObjectToKeyValuePairs = (
  object: ObjectArrayParams,
): IObjectsArray[] => {
  let result: IObjectsArray[] = [];

  Object.entries(object).forEach(([key, value]) => {
    if (
      typeof value.value === "string" ||
      typeof value.value === "number" ||
      typeof value.value === "boolean"
    ) {
      result.push({ key, value });
    }
  });

  return result;
};

export const handleError = (error: any) => {
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
};

export const pathNameParser = (
  pathName: string,
  parseLevel: number,
): string => {
  const pathParts = pathName.split("/").filter(Boolean);

  if (parseLevel > pathParts.length - 1) {
    throw new Error("Parse level is too high");
  }

  return pathParts.slice(0, parseLevel + 1).join("/") + "/";
};
