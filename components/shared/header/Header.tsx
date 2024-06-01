import Navbar from "@/components/shared/header/Navbar";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import ThemeSwitcher from "@/components/shared/header/ThemeSwitcher";
import MobileMenu from "@/components/shared/header/MobileMenu";
import Link from "next/link";
import { auth, UserButton } from "@clerk/nextjs";

const Header = () => {
  const { userId } = auth();

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
          <Navbar isMobile={false} />
        </div>
        <div className="flex-center gap-4">
          {userId ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link
              href="/sign-in"
              className="bg-white py-1 p-2 rounded-xl hover:bg-gray-500"
            >
              <Image
                src="/assets/icons/login.svg"
                alt="login icon"
                width={24}
                height={24}
              />
            </Link>
          )}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};
export default Header;
