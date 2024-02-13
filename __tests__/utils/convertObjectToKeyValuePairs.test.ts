import { convertObjectToKeyValuePairs } from "@/lib/utils";

const { expect, describe, it } = require("@jest/globals");

const testValue = {
  id: 1,
  title: "Hello",
  isFinished: true,
};

const testValueWithArray = {
  id: 1,
  title: ["Hello"],
  isFinished: true,
};

describe("convertObjectToKeyValuePairs function", () => {
  it("should return array of key-value pair objects", () => {
    expect(convertObjectToKeyValuePairs(testValue)).toEqual([
      { key: "id", value: 1 },
      { key: "title", value: "Hello" },
      { key: "isFinished", value: true },
    ]);
  });

  it("should return array without key which value is not string | number | boolean", () => {
    expect(convertObjectToKeyValuePairs(testValueWithArray)).toEqual([
      { key: "id", value: 1 },
      { key: "isFinished", value: true },
    ]);
  });
});
