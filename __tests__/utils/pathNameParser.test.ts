import { pathNameParser } from "@/lib/utils";
import { expect, describe, it } from "@jest/globals";

describe("pathNameParser function", () => {
  it("should return the parsed path", () => {
    expect(pathNameParser("/level1/level2/level3", 1)).toBe("level1/level2/");
    expect(pathNameParser("/level1/level2/level3", 2)).toBe(
      "level1/level2/level3/",
    );
  });

  it("should throw an error if parse level is too high", () => {
    expect(() => pathNameParser("/level1/level2/level3", 3)).toThrow(
      "Parse level is too high",
    );
  });
});
