import React from "react";
import { render, screen } from "@testing-library/react";
import BreadcrumbDynamic from "@/components/shared/Breadcrumb";
import { expect, describe, it } from "@jest/globals";

describe("BreadcrumbDynamic component", () => {
  const routesArray = [
    { label: "Home", route: "" },
    { label: "Category", route: "category" },
    { label: "Subcategory", route: "subcategory" },
    { label: "Product", route: "product" },
  ];

  it("renders without crashing", () => {
    render(<BreadcrumbDynamic routesArray={[]} />);
  });

  it("renders nothing when there are no routes", () => {
    render(<BreadcrumbDynamic routesArray={[]} />);
    expect(screen.queryByText(/Home/i)).toBeNull();
  });

  it("last breadcrumb item is not a link", () => {
    render(<BreadcrumbDynamic routesArray={routesArray} />);
    const lastItem = screen.getByText(
      routesArray[routesArray.length - 1].label,
    );
    expect(lastItem.closest("a")).toBeNull();
  });
});
