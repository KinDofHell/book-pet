"use client";

import { menuLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-4 desktop:flex-row desktop:gap-10">
      {menuLinks?.map(({ label, route }) => (
        <Link
          href={route}
          key={label}
          className={`text-xl text-dark-primary dark:text-white desktop:text-white py-1 desktop:px-2 ${
            pathname === route
              ? "border-b-[1px] border-dark-primary desktop:border-white dark:border-white"
              : ""
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};
export default Navbar;
