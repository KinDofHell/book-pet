import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <section className="w-full relative my-4">
        <Image
          src="/assets/home-banner.png"
          alt="fantasy landscape"
          width={1920}
          height={500}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full blur-[10px] relative z-10"
        />
        <div className="absolute top-0 left-0 bottom-0 z-20 w-full flex-center flex-col gap-4 tablet:gap-8">
          <h1 className="f-unpack text-white text-2xl tracking-wide drop-shadow-lg tablet:text-5xl desktop:text-6xl">
            Відкрий для себе світ Лерхоріїв
          </h1>
          <p className="f-unpack text-white text-xl tracking-wide tablet:text-2xl desktop:text-4xl">
            Дізнайся про нього все
          </p>
          <Button asChild size="sm">
            <Link href="/sections">Почати дослідження</Link>
          </Button>
        </div>
      </section>
      <section className="dark:text-white tracking-wide">
        <article className="mt-10">
          <h2 className="text-xl border-b-[1px] border-black dark:border-white py-1">
            Про книгу
          </h2>
          <p className="mt-3">
            Вогні Корон Апокалеї - це пригодницька фентезі книга з елементами
            драми, психології та надприродніх сил, події якої розгортаються у
            світі під назвою Апокалея, де головним усьому є не просто люди, а
            їхній підвид - лерхорії.
          </p>
          <p className="mt-3">
            Сама ж історія обертатиметься навколо різносторонніх особистостей із
            мріями, що аж ніяк не перегукуються одна з одною, тож таємницею є
            те, що для них готує доля. Чи не обернуться готові померти за друзів
            на ворогів? Існує лише один шлях, щоб дізнатися...
          </p>
        </article>
        <article className="my-10">
          <h2 className="text-xl border-b-[1px] border-black dark:border-white py-1">
            Про плани
          </h2>
          <p className="mt-3">
            На даний момент, враховуючи запланований обсяг історії, планується
            написання трьох книг серії, кожна з яких міститиме принаймні 400
            сторінок. Сюжет налічуватиме більше 20 вагомих та пропрацьованих
            персонажів, їхні історії та мрії.
          </p>
          <p className="mt-3">Термінів написання не існує :)</p>
        </article>
      </section>
    </>
  );
}
