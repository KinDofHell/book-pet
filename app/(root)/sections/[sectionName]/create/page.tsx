import GlossaryItemForm from "@/components/shared/forms/GlossaryItemForm";
import { auth } from "@clerk/nextjs";
import { CategoryTitles } from "@/constants";
import BreadcrumbDynamic from "@/components/shared/Breadcrumb";

const CreateEvent = ({
  params: { sectionName },
}: {
  params: { sectionName: string };
}) => {
  const { sessionClaims } = auth();

  const isUserAdmin = sessionClaims?.isUserAdmin as boolean;

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
      label: "Додавання запису",
      route: "create",
    },
  ];

  return (
    <>
      <BreadcrumbDynamic routesArray={breadcrumbData} />
      <section className="py-5">
        <h3 className="text-center text-3xl desktop:text-4xl dark:text-white">
          Додати запис
        </h3>
      </section>
      <div className="my-8">
        <GlossaryItemForm
          type="CREATE"
          isAdmin={isUserAdmin}
          categoryType={sectionName}
        />
      </div>
    </>
  );
};
export default CreateEvent;
