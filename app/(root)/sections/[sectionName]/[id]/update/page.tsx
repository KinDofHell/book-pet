import GlossaryItemForm from "@/components/shared/forms/GlossaryItemForm";
import { auth } from "@clerk/nextjs";
import { getGlossaryItemById } from "@/lib/actions/glossaryItem.actions";
import { CategoryTitles } from "@/constants";
import BreadcrumbDynamic from "@/components/shared/Breadcrumb";

const CreateEvent = async ({
  params: { sectionName, id },
}: {
  params: { sectionName: string; id: string };
}) => {
  const { sessionClaims } = auth();

  const isUserAdmin = sessionClaims?.isUserAdmin as boolean;
  const glossaryItem = await getGlossaryItemById(id);

  const breadcrumbData = [
    {
      label: "Категорії",
      route: "sections",
    },
    {
      label: CategoryTitles[sectionName as keyof typeof CategoryTitles],
      route: sectionName,
    },
    {
      label: `${glossaryItem?.title}`,
      route: `${glossaryItem?._id}`,
    },
    {
      label: `Редагування`,
      route: `update`,
    },
  ];

  return (
    <>
      <BreadcrumbDynamic routesArray={breadcrumbData} />
      <section className="py-5">
        <h3 className="text-center text-3xl desktop:text-4xl dark:text-white">
          Редагувати запис
        </h3>
      </section>
      <div className="my-8">
        <GlossaryItemForm
          type="UPDATE"
          isAdmin={isUserAdmin}
          glossaryItem={glossaryItem}
          categoryType={sectionName}
          glossaryItemId={id}
        />
      </div>
    </>
  );
};
export default CreateEvent;
