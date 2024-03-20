import React from "react";
import { render, screen } from "@testing-library/react";
import { ObjectArrayParams } from "@/types";
import { convertObjectToKeyValuePairs } from "@/lib/utils";
import Table from "@/components/shared/Table";

const { expect, describe, it } = require("@jest/globals");

describe("Table component", () => {
  const data: ObjectArrayParams = [
    {
      key: "Name",
      value: "John Doe",
    },
    {
      key: "Age",
      value: 30,
    },
    {
      key: "Is Married",
      value: true,
    },
  ];

  it("renders empty table with no data", () => {
    render(<Table data={[] as ObjectArrayParams} />);

    const rows = screen.queryAllByRole("row");
    expect(rows).toHaveLength(0);
  });

  it("converts data correctly", () => {
    const convertedData = convertObjectToKeyValuePairs(data);

    expect(convertedData).toEqual([
      { key: "0", value: { key: "Name", value: "John Doe" } },
      { key: "1", value: { key: "Age", value: 30 } },
      { key: "2", value: { key: "Is Married", value: true } },
    ]);
  });
});
