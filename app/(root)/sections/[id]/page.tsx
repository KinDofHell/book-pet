import { auth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/shared/CategoryCard";
import CategoryItem from "@/components/shared/CategoryItem";

const Page = () => {
  const { sessionClaims } = auth();

  const isUserAdmin = sessionClaims?.isUserAdmin as boolean;

  const dummyItems = [
    {
      id: "1",
      title: "Test Item TestItemTestItem Test Item",
      imgUrl: "/assets/images/fantasyLandsc.jpg",
      lastUpdate: new Date(),
      isFinished: false,
    },
    {
      id: "2",
      title: "Test Item",
      imgUrl: "/assets/images/fantasyLandsc.jpg",
      lastUpdate: new Date(),
      isFinished: true,
    },
    {
      id: "3",
      title: "Test Item",
      imgUrl: "/assets/images/fantasyLandsc.jpg",
      lastUpdate: new Date(),
      isFinished: false,
    },
    {
      id: "4",
      title: "Test Item",
      imgUrl: "/assets/images/fantasyLandsc.jpg",
      lastUpdate: new Date(),
      isFinished: true,
    },
    {
      id: "5",
      title: "Test Item",
      imgUrl: "/assets/images/fantasyLandsc.jpg",
      lastUpdate: new Date(),
      isFinished: false,
    },
  ];

  return (
    <>
      <section className="w-full flex-center flex-col desktop:mt-6">
        <h1 className="h1-font">Локації</h1>
        {isUserAdmin && (
          <Button
            size="lg"
            className="w-full max-w-[425px] uppercase tracking-wide text-black bg-white shadow-default mb-6 dark:bg-dark-primary dark:text-white hover:text-white hover:bg-light-gradient dark:hover:bg-dark-secondary-gradient"
          >
            Додати Запис
          </Button>
        )}
        <div className="flex justify-center flex-wrap gap-8 w-full desktop:mt-6">
          {dummyItems?.map(({ id, title, imgUrl, lastUpdate, isFinished }) => (
            <CategoryItem
              id={id}
              title={title}
              imgUrl={imgUrl}
              lastUpdate={lastUpdate}
              isFinished={isFinished}
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
