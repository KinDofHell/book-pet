export type CategoryCardProps = {
  id: string;
  type: string;
  title: string;
  isUserAdmin: boolean;
};

export type CategoryItemProps = {
  id: string;
  type: string;
  title: string;
  imgUrl: string;
  updatedAt?: Date;
  isFinished: boolean;
  isUserAdmin: boolean;
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
    value: string;
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

export type DeleteCategoryParams = {
  isAdmin: boolean;
  categoryId: string;
  defaultCategoryId: string;
  path: string;
};

export type CategoryFormProps = {
  mode: "CREATE" | "UPDATE";
  categoryData?: { id: string; name: string; type: string };
  isAdmin: boolean;
};

export interface IGlossaryItem {
  title: string;
  imageUrl: string;
  description: string;
  history: string;
  additional?: string;
  tableInfo: Record<string, any>[];
  isVisible: boolean;
  categoryId: string;
}

export type GlossaryItemFormProps = {
  type: "CREATE" | "UPDATE";
  glossaryItem?: IGlossaryItem;
  isAdmin: boolean;
  categoryType: string;
};

type TableInfoFields = {
  [index: number]: {
    key: `tableInfo.${number}.key`;
    value: `tableInfo.${number}.value`;
  };
};

export type GlossaryItemFormFields = {
  title: string;
  description: string;
  history: string;
  imageUrl: string;
  categoryType: string;
  isVisible: boolean;
  additional?: string;
  tableInfo: TableInfoFields;
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
