import Link from "next/link";
import Image from "next/image";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";
import { CategoryCardProps } from "@/types";
import { Button } from "@/components/ui/button";
import CategoryForm from "@/components/shared/forms/CategoryForm";

const CategoryCard = ({ id, title, type, isUserAdmin }: CategoryCardProps) => {
  return (
    <div className="w-full max-w-[500px] shadow-default bg-light-gradient dark:bg-dark-secondary-gradient dark:hover:bg-dark-gradient relative">
      <Link
        href={`/sections/${type}`}
        className="w-full h-full inline-block p-8 text-center text-white text-xl uppercase tracking-wider"
      >
        {title}
      </Link>
      {isUserAdmin && (
        <div className="absolute top-2 right-1 flex flex-col gap-2">
          {/*<Button className="p-0 bg-transparent w-auto h-auto">*/}
          {/*  <Image*/}
          {/*    src="/assets/icons/edit.svg"*/}
          {/*    alt="edit icon"*/}
          {/*    width={18}*/}
          {/*    height={18}*/}
          {/*  />*/}
          {/*</Button>*/}
          <CategoryForm
            mode="UPDATE"
            categoryData={{ id: id, name: title, type: type }}
            isAdmin={isUserAdmin}
          />
          <DeleteConfirmation
            itemId={id}
            itemsType="CATEGORY"
            isUserAdmin={isUserAdmin}
          />
        </div>
      )}
    </div>
  );
};
export default CategoryCard;
