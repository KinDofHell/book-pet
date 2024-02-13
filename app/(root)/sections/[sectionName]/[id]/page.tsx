import Image from "next/image";
import Table from "@/components/shared/Table";
import AccordionBlock from "@/components/shared/AccordionBlock";

const Page = () => {
  const dummyTableData = {
    Розташування: "Королівство Сентеріяда",
    "Рівень печаті": "Катастрофічний",
    Статус: "Розквіт",
    "Місце головної послідовності": false,
    "К-сть Лерхоріїв": 24,
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
        <div className="mt-6 shadow-default">
          <AccordionBlock
            title="Опис"
            textContent="Тестовий опис Замку Великої Загибелі Тестовий опис Замку Великої
                    Загибелі Тестовий опис Замку Великої Загибелі Тестовий опис
                    Замку Великої Загибелі."
          />
          <AccordionBlock
            title="Історія"
            textContent="Тестовий опис Замку Великої Загибелі Тестовий опис Замку Великої
                    Загибелі Тестовий опис Замку Великої Загибелі Тестовий опис
                    Замку Великої Загибелі. Тестовий опис Замку Великої Загибелі Тестовий опис Замку Великої
                    Загибелі Тестовий опис Замку Великої Загибелі Тестовий опис
                    Замку Великої Загибелі. Тестовий опис Замку Великої Загибелі Тестовий опис Замку Великої
                    Загибелі Тестовий опис Замку Великої Загибелі Тестовий опис
                    Замку Великої Загибелі."
          />
        </div>
        <div className="flex flex-wrap w-full gap-4 mt-5">
          <Table data={dummyTableData} className="grow" />
          <Table data={dummyTableData} className="grow" />
        </div>
        <div className="mt-6 shadow-default">
          <AccordionBlock
            title="Додатково"
            textContent="Тестовий опис Замку Великої Загибелі Тестовий опис Замку Великої
                    Загибелі Тестовий опис Замку Великої Загибелі Тестовий опис
                    Замку Великої Загибелі."
          />
        </div>
      </section>
    </article>
  );
};
export default Page;
