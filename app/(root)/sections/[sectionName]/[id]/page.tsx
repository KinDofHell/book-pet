import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Table from "@/components/shared/Table";

const Page = () => {
  const dummyTableData = {
    Розташування: "Королівство Сентеріяда",
    Статус: "Функціонує",
  };

  return (
    <article>
      <section>
        <h1 className="h1-font text-center">Замок Великої Загибелі</h1>
        <Image
          src="/assets/images/fantasyLandsc.jpg"
          alt="item image"
          width={1300}
          height={800}
          className="w-full"
        />
        <div className="mt-6">
          <Accordion type="single" collapsible>
            <AccordionItem
              value="description"
              className="bg-light-primary px-2 text-white dark:bg-dark-secondary-gradient"
            >
              <AccordionTrigger className="tablet:text-2xl dark:text-white">
                Опис
              </AccordionTrigger>
              <AccordionContent className="tablet:text-xl dark:text-white">
                Тестовий опис Замку Великої Загибелі Тестовий опис Замку Великої
                Загибелі Тестовий опис Замку Великої Загибелі Тестовий опис
                Замку Великої Загибелі.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div>
          <Table data={dummyTableData} />
        </div>
      </section>
    </article>
  );
};
export default Page;
