import React from "react";
import Link from "next/link";
import Image from "next/image";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";
import { CategoryCardProps } from "@/types";

const CategoryCard = ({ id, title, isUserAdmin }: CategoryCardProps) => {
  return (
    <div className="w-full max-w-[500px] shadow-default bg-light-gradient dark:bg-dark-secondary-gradient dark:hover:bg-dark-gradient relative">
      <Link
        href={`/sections/${id}`}
        className="w-full h-full inline-block p-8 text-center text-white text-xl uppercase tracking-wider"
      >
        {title}
      </Link>
      {isUserAdmin && (
        <div className="absolute top-2 right-1 flex flex-col gap-2">
          <Link href={`/sections/${id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit icon"
              width={18}
              height={18}
            />
          </Link>
          <DeleteConfirmation itemId={id} itemsType="CATEGORY" />
        </div>
      )}
    </div>
  );
};
export default CategoryCard;
