import Link from "next/link";
import Image from "next/image";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";

type CategoryItemProps = {
  id: string;
  title: string;
  imgUrl: string;
  lastUpdate: Date;
  isFinished: boolean;
  isUserAdmin: boolean;
};

const CategoryItem = ({
  id,
  title,
  imgUrl,
  lastUpdate,
  isFinished,
  isUserAdmin,
}: CategoryItemProps) => {
  return (
    <div className="w-full max-w-[500px] shadow-default bg-light-gradient dark:bg-dark-secondary-gradient dark:hover:bg-dark-gradient relative">
      <Link href={`/items/${id}`} className="block">
        <Image
          src={imgUrl}
          alt={title}
          width={280}
          height={200}
          className="w-full h-full"
        />
      </Link>
      <div className="absolute bg-white bottom-1 left-1/2 -translate-x-1/2 min-w-[90%] text-center py-1 px-3 dark:bg-dark-primary">
        <h2 className="text-sm tablet:text-lg dark:text-white tracking-wide">
          {title}
        </h2>
      </div>
      {isUserAdmin && (
        <div className="absolute top-2 right-1 flex flex-col gap-2">
          <Link href={`/items/${id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit icon"
              width={18}
              height={18}
            />
          </Link>
          <DeleteConfirmation itemId={id} itemsType="ITEM" />
        </div>
      )}
    </div>
  );
};
export default CategoryItem;
