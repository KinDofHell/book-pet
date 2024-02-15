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
  lastUpdate: Date;
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
  value: string | number | boolean;
}

export type AccordionBlockProps = {
  title: string;
  textContent: string;
};

export type CreateCategoryParams = {
  categoryName: string;
  type: string;
};

export type UpdateCategoryParams = {
  isAdmin: boolean;
  category: {
    _id: string;
    categoryName: string;
  };
  path: string;
};

export type DeleteCategoryParams = {
  isAdmin: boolean;
  categoryId: string;
  defaultCategoryId: string;
  path: string;
};
