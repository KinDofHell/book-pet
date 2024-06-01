import { auth } from "@clerk/nextjs";
import { getAllSavedCategories } from "@/lib/actions/category.actions";
import CategoryForm from "@/components/shared/forms/CategoryForm";
import CategoryCard from "@/components/shared/CategoryCard";
import { ICategory } from "@/lib/database/models/category.model";
import Link from "next/link";

const Page = async () => {
  const { sessionClaims } = auth();
  const isUserAdmin = (sessionClaims?.isUserAdmin as boolean) || false;
  const userId = (sessionClaims?.userId as string) || "";
  if (!userId) {
    return;
  }

  let categories: ICategory[] = await getAllSavedCategories(
    isUserAdmin,
    userId,
  );

  if (!isUserAdmin) {
    categories = categories.filter((category) => category.type !== "solving");
  }

  return (
    <>
      {categories.length > 0 ? (
        <section className="w-full flex-center flex-col desktop:mt-6">
          {isUserAdmin && <CategoryForm mode="CREATE" isAdmin={isUserAdmin} />}
          <div className="flex justify-center flex-wrap gap-8 w-full desktop:mt-6">
            {categories?.map(({ _id, name, type }) => (
              <CategoryCard
                id={_id}
                type={type}
                title={name}
                isUserAdmin={isUserAdmin}
                linkType="saved"
                key={_id}
              />
            ))}
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 h-[60vh]">
          <p className="text-2xl text-light-primary uppercase font-bold dark:text-white">
            Ви ще нічого не зберегли :(
          </p>
          <Link
            href="/sections"
            className="bg-light-primary p-2 rounded text-white dark:bg-white dark:text-black"
          >
            Повернутися до списку
          </Link>
        </div>
      )}
    </>
  );
};
export default Page;
