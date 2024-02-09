import React from "react";
import Link from "next/link";

type CategoryItemProps = {
  id: string;
  title: string;
};

const CategoryCard = ({ id, title }: CategoryItemProps) => {
  return (
    <div className="w-full max-w-[500px] shadow-default bg-light-gradient dark:bg-dark-secondary-gradient dark:hover:bg-dark-gradient">
      <Link
        href={`/sections/${id}`}
        className="w-full h-full inline-block p-8 text-center text-white text-xl uppercase tracking-wider"
      >
        {title}
      </Link>
    </div>
  );
};
export default CategoryCard;
