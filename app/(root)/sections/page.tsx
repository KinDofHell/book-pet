import { auth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/shared/CategoryCard";
import CategoryForm from "@/components/shared/forms/CategoryForm";

const Page = () => {
  const { sessionClaims } = auth();

  const isUserAdmin = sessionClaims?.isUserAdmin as boolean;

  const dummyCategories = [
    {
      id: "1",
      title: "Test Category TestCategoryTest Test Category",
      type: "locations",
    },
    {
      id: "2",
      title: "Test Category",
      type: "people",
    },
    {
      id: "3",
      title: "Test Category",
      type: "creations",
    },
    {
      id: "4",
      title: "Test Category",
      type: "creatures",
    },
    {
      id: "5",
      title: "Test Category",
      type: "saktra",
    },
    {
      id: "6",
      title: "Test Category",
      type: "history",
    },
  ];

  return (
    <>
      <section className="w-full flex-center flex-col desktop:mt-6">
        {isUserAdmin && <CategoryForm />}
        <div className="flex justify-center flex-wrap gap-8 w-full desktop:mt-6">
          {dummyCategories?.map(({ id, title, type }) => (
            <CategoryCard
              id={id}
              type={type}
              title={title}
              isUserAdmin={isUserAdmin}
              key={id}
            />
          ))}
        </div>
      </section>
    </>
  );
};
export default Page;
