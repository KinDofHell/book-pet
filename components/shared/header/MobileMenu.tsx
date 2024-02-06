import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Image from "next/image";
import Navbar from "@/components/shared/header/Navbar";
import Link from "next/link";

const MobileMenu = () => {
  return (
    <nav className="desktop:hidden max-h-[32px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/assets/burger.png"
            alt="burger menu icon"
            width={32}
            height={32}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="dark:bg-dark-secondary-gradient dark:border-l-black dark:close-white">
          <SheetHeader className="mb-5">
            <SheetTitle>
              <Link
                href="/"
                className="text-dark-primary tracking-wide text-2xl tablet:text-3xl desktop:text-4xl dark:text-white"
              >
                BGloSSary
              </Link>
            </SheetTitle>
          </SheetHeader>
          <Navbar />
        </SheetContent>
      </Sheet>
    </nav>
  );
};
export default MobileMenu;
