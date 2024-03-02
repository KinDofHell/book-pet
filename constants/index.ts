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
