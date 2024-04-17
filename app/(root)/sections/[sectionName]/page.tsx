import { auth } from "@clerk/nextjs";
import CategoryItem from "@/components/shared/CategoryItem";
import Link from "next/link";
import { IGlossaryItem } from "@/lib/database/models/glossaryItem.model";
import { getAllGlossaryItems } from "@/lib/actions/glossaryItem.actions";
import { CategoryTitles } from "@/constants";
import BreadcrumbDynamic from "@/components/shared/Breadcrumb";

const Page = async ({
  params: { sectionName },
}: {
  params: { sectionName: string };
}) => {
  const { sessionClaims } = auth();

  const isUserAdmin = sessionClaims?.isUserAdmin as boolean;
  const userId = sessionClaims?.userId as string;
  const type = sectionName;

  const glossaryItems: IGlossaryItem[] = await getAllGlossaryItems(
    sectionName,
    isUserAdmin,
  );

  const breadcrumbData = [
    {
      label: "Категорії",
      route: "sections",
    },
    {
      label: CategoryTitles[type as keyof typeof CategoryTitles],
      route: sectionName,
    },
  ];

  return (
    <>
      <BreadcrumbDynamic routesArray={breadcrumbData} />
      <section className="w-full flex-center flex-col desktop:mt-6">
        <h1 className="h1-font">
          {CategoryTitles[type as keyof typeof CategoryTitles]}
        </h1>
        {isUserAdmin && (
          <Link
            href={`/sections/${type}/create`}
            className="w-full inline-block py-3 px-4 text-center max-w-[425px] uppercase tracking-wide bg-white shadow-default mb-6 dark:bg-dark-primary dark:text-white text-black hover:text-white hover:bg-light-gradient dark:hover:bg-dark-secondary-gradient"
          >
            Додати Запис
          </Link>
        )}
        <div className="flex justify-center flex-wrap gap-8 w-full desktop:mt-6">
          {glossaryItems?.map((item) => (
            <CategoryItem
              id={item._id}
              type={type}
              title={item.title}
              imgUrl={item.imageUrl}
              updatedAt={item.updatedAt}
              isVisible={item.isVisible}
              isUser={sessionClaims !== null}
              isUserAdmin={isUserAdmin}
              userId={userId}
              key={item._id}
            />
          ))}
        </div>
      </section>
    </>
  );
};
export default Page;
