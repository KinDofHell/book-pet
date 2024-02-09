import { auth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/shared/CategoryCard";

const Page = () => {
  const { sessionClaims } = auth();

  const isUserAdmin = sessionClaims?.isUserAdmin as boolean;

  const dummyCategories = [
    {
      id: "1",
      title: "Test Category",
      description: "Test category is a test category.",
    },
    {
      id: "2",
      title: "Test Category",
      description: "Test category is a test category.",
    },
    {
      id: "3",
      title: "Test Category",
      description: "Test category is a test category.",
    },
    {
      id: "4",
      title: "Test Category",
      description: "Test category is a test category.",
    },
    {
      id: "5",
      title: "Test Category",
      description: "Test category is a test category.",
    },
    {
      id: "6",
      title: "Test Category",
      description: "Test category is a test category.",
    },
  ];

  return (
    <>
      <section className="w-full flex-center flex-col desktop:mt-6">
        {isUserAdmin && (
          <Button
            size="lg"
            className="w-full max-w-[425px] uppercase tracking-wide text-black bg-white shadow-default mb-6 dark:bg-dark-primary dark:text-white hover:text-white hover:bg-light-gradient dark:hover:bg-dark-secondary-gradient"
          >
            Додати Категорію
          </Button>
        )}
        <div className="flex justify-center flex-wrap gap-8 w-full desktop:mt-6">
          {dummyCategories?.map(({ id, title }) => (
            <CategoryCard id={id} title={title} key={id} />
          ))}
        </div>
      </section>
    </>
  );
};
export default Page;
