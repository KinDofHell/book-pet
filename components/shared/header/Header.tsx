import Navbar from "@/components/shared/header/Navbar";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import ThemeSwitcher from "@/components/shared/header/ThemeSwitcher";
import MobileMenu from "@/components/shared/header/MobileMenu";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-light-gradient dark:bg-dark-secondary-gradient">
      <div className="wrapper relative flex-between">
        <div className="flex-center gap-4">
          <Link
            href="/"
            className="text-white tracking-wide text-2xl tablet:text-3xl desktop:text-4xl"
          >
            BGloSSary
          </Link>
          <ThemeSwitcher />
        </div>
        <div className="hidden desktop:flex">
          <Navbar />
        </div>
        <div className="flex-center gap-4">
          <Button size="sm" className="bg-white hover:bg-white">
            <Image
              src="/assets/login.png"
              alt="login icon"
              width={32}
              height={32}
            />
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};
export default Header;
