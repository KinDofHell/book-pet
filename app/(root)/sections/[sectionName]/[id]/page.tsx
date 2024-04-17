import Image from "next/image";
import Table from "@/components/shared/Table";
import AccordionBlock from "@/components/shared/AccordionBlock";
import { getGlossaryItemById } from "@/lib/actions/glossaryItem.actions";
import BreadcrumbDynamic from "@/components/shared/Breadcrumb";
import { CategoryTitles } from "@/constants";

const Page = async ({
  params: { id, sectionName },
}: {
  params: { id: string; sectionName: string };
}) => {
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
    { label: glossaryItem?.title, route: id },
  ];

  return (
    <article>
      <BreadcrumbDynamic routesArray={breadcrumbData} />
      <section>
        <h1 className="h1-font text-center">{glossaryItem.title}</h1>
        <Image
          src={glossaryItem.imageUrl}
          alt={glossaryItem.title}
          width={1300}
          height={800}
          className="w-full"
        />
        <div className="mt-6 shadow-default">
          <AccordionBlock title="Опис" textContent={glossaryItem.description} />
          <AccordionBlock title="Історія" textContent={glossaryItem.history} />
        </div>
        <div className="flex flex-wrap w-full gap-4 mt-5">
          <Table data={glossaryItem?.tableInfo} className="grow" />
        </div>
        {glossaryItem.additional && (
          <div className="mt-6 shadow-default">
            <AccordionBlock
              title="Додатково"
              textContent={glossaryItem.additional}
            />
          </div>
        )}
      </section>
    </article>
  );
};
export default Page;
