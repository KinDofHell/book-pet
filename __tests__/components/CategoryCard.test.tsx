import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CategoryCard from "@/components/shared/CategoryCard";
import { CategoryCardProps } from "@/types";
import { userEvent } from "@testing-library/user-event";

const { expect, describe, it } = require("@jest/globals");

const defaultProps: CategoryCardProps = {
  id: "1",
  title: "Test Title",
  isUserAdmin: false,
};

describe("CategoryCard Component", () => {
  it("renders title correctly", () => {
    render(<CategoryCard {...defaultProps} />);

    const titleElement = screen.getByText("Test Title");
    expect(titleElement).toBeInTheDocument();
  });

  it("renders edit icon and delete confirmation when user is admin", () => {
    render(<CategoryCard {...defaultProps} isUserAdmin={true} />);
    const editIcon = screen.getByAltText("edit icon");
    expect(editIcon).toBeInTheDocument();

    const deleteIcon = screen.getByAltText("delete icon");
    expect(deleteIcon).toBeInTheDocument();
  });

  it("does not render edit icon and delete confirmation when user is not admin", () => {
    render(<CategoryCard {...defaultProps} />);
    const editIcon = screen.queryByAltText("edit icon");
    expect(editIcon).toBeNull();

    const deleteConfirmationButton = screen.queryByRole("button", {
      name: "Delete",
    });
    expect(deleteConfirmationButton).toBeNull();
  });
});
