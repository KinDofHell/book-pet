import { menuLinks } from "@/constants";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex flex-col tablet:flex-row gap-10">
      {menuLinks?.map(({ label, route }) => (
        <Link
          href={route}
          key={label}
          className="text-xl text-white py-1 px-10 shadow-default bg-light-primary dark:bg-dark-primary hover:bg-dark-primary dark:hover:bg-light-primary active:shadow-none"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};
export default Navbar;
