import { auth } from "@clerk/nextjs";
import { getAllCategories } from "@/lib/actions/category.actions";
import CategoryForm from "@/components/shared/forms/CategoryForm";
import CategoryCard from "@/components/shared/CategoryCard";
import { ICategory } from "@/lib/database/models/category.model";
import { createUser } from "@/lib/actions/user.action";

const Page = async () => {
  const { sessionClaims } = auth();
  const isUserAdmin = (sessionClaims?.isUserAdmin as boolean) || false;

  let categories: ICategory[] = await getAllCategories(isUserAdmin);

  if (!isUserAdmin) {
    categories = categories.filter((category) => category.type !== "solving");
  }

  return (
    <>
      <section className="w-full flex-center flex-col desktop:mt-6">
        {isUserAdmin && <CategoryForm mode="CREATE" isAdmin={isUserAdmin} />}
        <div className="flex justify-center flex-wrap gap-8 w-full desktop:mt-6">
          {categories?.map(({ _id, name, type }) => (
            <CategoryCard
              id={_id}
              type={type}
              title={name}
              isUserAdmin={isUserAdmin}
              key={_id}
            />
          ))}
        </div>
      </section>
    </>
  );
};
export default Page;
