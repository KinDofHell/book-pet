import { auth } from "@clerk/nextjs";
import CategoryItem from "@/components/shared/CategoryItem";
import { IGlossaryItem } from "@/lib/database/models/glossaryItem.model";
import { getAllSavedGlossaryItemsByUserId } from "@/lib/actions/glossaryItem.actions";
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

  const glossaryItems: IGlossaryItem[] = await getAllSavedGlossaryItemsByUserId(
    sectionName,
    isUserAdmin,
    userId,
  );

  const breadcrumbData = [
    {
      label: "Збережені категорії",
      route: "saved",
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
          Збережені {CategoryTitles[type as keyof typeof CategoryTitles]}
        </h1>
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
              pathType="saved"
              key={item._id}
            />
          ))}
        </div>
      </section>
    </>
  );
};
export default Page;
