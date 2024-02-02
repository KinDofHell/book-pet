import React from "react";
import Link from "next/link";

type CategoryItemProps = {
  label: string;
  link: string;
  disabled?: boolean;
};

const CategoryItem = ({ label, link, disabled }: CategoryItemProps) => {
  return (
    <div className="w-full lg:w-[400px] text-main-light bg-main-dark">
      {disabled ? (
        <h2 className="category-item">{label}</h2>
      ) : (
        <Link href={link} className="category-item">
          {label}
        </Link>
      )}
    </div>
  );
};
export default CategoryItem;
