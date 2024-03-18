import { ObjectArrayParams } from "@/types";

export const menuLinks = [
  {
    label: "Головна",
    route: "/",
  },
  {
    label: "Розділи",
    route: "/sections",
  },
  {
    label: "Примітки",
    route: "/notes",
  },
  {
    label: "Збережене",
    route: "/saved",
  },
];

export const glossaryItemDefaultValues = {
  title: "",
  imageUrl: "",
  description: "",
  history: "",
  additional: "",
  tableInfo: [{ key: "", value: "" }],
  isVisible: false,
  categoryId: "",
};

export enum CategoryTitles {
  locations = "Локації",
  lerchories = "Лерхорії",
}

export const DEFAULT_CATEGORY_ID = "65ce02afa688f48fd2cce67e";
