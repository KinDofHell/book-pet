import { IGlossaryItem } from "@/lib/database/models/glossaryItem.model";

export type CategoryCardProps = {
  id: string;
  type: string;
  title: string;
  isUserAdmin: boolean;
  linkType?: string;
};

export type CategoryItemProps = {
  id: string;
  type: string;
  title: string;
  imgUrl: string;
  updatedAt?: Date;
  isVisible: boolean;
  isUser: boolean;
  isUserAdmin: boolean;
  userId?: string;
  pathType?: string;
};

export type TableProps = {
  data: { [key: string]: string | number | boolean };
  className?: string;
};

export type ObjectArrayParams = {
  [key: string]: any;
};

export interface IObjectsArray {
  key: string;
  value: {
    key: string;
    value: string | number | boolean;
  };
}

export type AccordionBlockProps = {
  title: string;
  textContent: string;
};

export type CreateCategoryParams = {
  categoryName: string;
  type: string;
  path: string;
};

export type UpdateCategoryParams = {
  isAdmin: boolean;
  categoryId: string;
  categoryName: string;
  categoryType: string;
  path: string;
};

export type UpdateGlossaryItemParams = {
  isAdmin: boolean;
  glossaryItem: {
    _id: string;
    title: string;
    description: string;
    history: string;
    additional?: string;
    imageUrl: string;
    categoryId: string;
    isVisible: boolean;
    tableInfo: { [key: string]: string }[];
    updatedAt?: Date;
  };
  path: string;
};

export type DeleteCategoryParams = {
  isAdmin: boolean;
  categoryId: string;
  path: string;
};

export type CategoryFormProps = {
  mode: "CREATE" | "UPDATE";
  categoryData?: { id: string; name: string; type: string };
  isAdmin: boolean;
};

// export interface IGlossaryItem {
//   title: string;
//   imageUrl: string;
//   description: string;
//   history: string;
//   additional?: string;
//   tableInfo: Record<string, any>[];
//   isVisible: boolean;
//   categoryId: string;
// }

export type GlossaryItemFormProps = {
  type: "CREATE" | "UPDATE";
  glossaryItem?: IGlossaryItem;
  isAdmin: boolean;
  categoryType: string;
  glossaryItemId?: string;
};

export type CreateGlossaryItemParams = {
  title: string;
  description: string;
  history: string;
  additional?: string;
  imageUrl: string;
  categoryType: string;
  isVisible?: boolean;
  tableInfo: { [key: string]: string }[];
};

export type DeleteGlossaryItemParams = {
  isAdmin: boolean;
  glossaryItemId: string;
  path: string;
};

export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

export type NoteFormProps = {
  mode: "CREATE" | "UPDATE";
  noteData?: {
    id: string;
    title: string;
    content: string;
    relatedItemId?: string;
  };
  creatorId: string;
  glossaryItems: IGlossaryItem[];
};

export type CreateNoteParams = {
  title: string;
  text: string;
  userId: string;
  relatedGlossaryItemId?: string;
  path: string;
};

export type DeleteNoteParams = {
  userId: string;
  noteId: string;
  path: string;
};

export type UpdateNoteParams = {
  noteId: string;
  title: string;
  content: string;
  relatedItemId?: string;
  path: string;
};
