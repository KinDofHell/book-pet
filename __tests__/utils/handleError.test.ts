import { handleError } from "@/lib/utils";
import { expect, describe, it } from "@jest/globals";

describe("handleError function", () => {
  it("should throw an error with string message", () => {
    expect(() => handleError("An error occurred")).toThrow("An error occurred");
  });

  it("should throw an error with object message", () => {
    const errorObject = { message: "An error occurred" };
    expect(() => handleError(errorObject)).toThrow(JSON.stringify(errorObject));
  });
});
