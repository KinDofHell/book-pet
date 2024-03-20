import Link from "next/link";
import Image from "next/image";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";
import { formatDateTime } from "@/lib/utils";
import { CategoryItemProps } from "@/types";

const CategoryItem = ({
  id,
  type,
  title,
  imgUrl,
  updatedAt,
  isVisible,
  isUserAdmin,
}: CategoryItemProps) => {
  return (
    <div className="w-full max-w-[500px] shadow-default bg-light-gradient dark:bg-dark-secondary-gradient dark:hover:bg-dark-gradient relative">
      <Link href={`/sections/${type}/${id}`} className="block">
        <Image
          src={imgUrl}
          alt={title}
          width={280}
          height={200}
          className="w-full max-h-[350px]"
        />
      </Link>
      <div className="absolute top-2 left-2 flex gap-2 items-center">
        <span className="bg-white px-1.5 py-0.5 rounded-lg text-sm dark:bg-dark-primary dark:text-white tracking-wide">
          {updatedAt && formatDateTime(updatedAt).dateOnly}
        </span>
        {!isVisible && (
          <div className="bg-white rounded-2xl p-0.5" title="Приховано">
            <Image
              src="/assets/icons/hidden.svg"
              alt="finished icon"
              width={20}
              height={20}
            />
          </div>
        )}
      </div>
      <div className="absolute bg-white bottom-1 left-1/2 -translate-x-1/2 min-w-[90%] text-center py-1 px-3 dark:bg-dark-primary">
        <h2 className="text-sm tablet:text-lg dark:text-white tracking-wide">
          {title}
        </h2>
      </div>
      {isUserAdmin && (
        <div className="absolute top-2 right-1 flex flex-col gap-2">
          <Link href={`/sections/${type}/${id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit icon"
              width={18}
              height={18}
            />
          </Link>
          <DeleteConfirmation
            itemId={id}
            itemsType="GLOSSARY_ITEM"
            isUserAdmin={isUserAdmin}
          />
        </div>
      )}
    </div>
  );
};
export default CategoryItem;
