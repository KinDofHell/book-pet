import {
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Slash } from "lucide-react";

type RouteArray = { label: string; route: string };

type BreadcrumbDynamicProps = {
  routesArray: RouteArray[];
};

const BreadcrumbDynamic = ({ routesArray }: BreadcrumbDynamicProps) => {
  let href: string = "/";

  return (
    <BreadcrumbList className="mb-3 tablet:mb-0 text-gray-800 dark:text-gray-400">
      {routesArray?.map((route: RouteArray, index: number) => {
        href += route.route + "/";
        return (
          <>
            <BreadcrumbItem>
              <Link href={href}>{route.label}</Link>
            </BreadcrumbItem>
            {index !== routesArray.length - 1 && (
              <BreadcrumbSeparator>•</BreadcrumbSeparator>
            )}
          </>
        );
      })}
    </BreadcrumbList>
  );
};

export default BreadcrumbDynamic;
