import { convertObjectToKeyValuePairs } from "@/lib/utils";
import { ObjectArrayParams } from "@/types";

const { expect, describe, it } = require("@jest/globals");

const testValue: ObjectArrayParams = [
  {
    key: "Тип",
    value: "Замок",
  },
];

describe("convertObjectToKeyValuePairs function", () => {
  it("should return array of key-value pair objects", () => {
    expect(convertObjectToKeyValuePairs(testValue)).toEqual([
      { key: "0", value: { key: "Тип", value: "Замок" } },
    ]);
  });
});
