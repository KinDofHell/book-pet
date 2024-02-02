import { categoryLinks } from "@/constants";
import CategoryItem from "@/components/shared/CategoryItem";

export default function Home() {
  return (
    <>
      <section className="w-full flex-between flex-wrap gap-4">
        {categoryLinks?.map((link, index) => (
          <CategoryItem
            label={link.label}
            link={link.route}
            key={index}
            disabled={link.disabled}
          />
        ))}
      </section>
    </>
  );
}
