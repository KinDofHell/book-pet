import { convertFileToUrl } from "@/lib/utils";
import { expect, describe, it, jest } from "@jest/globals";

describe("convertFileToUrl function", () => {
  it("should return a URL for the given file", () => {
    const mockFile = new File(["content"], "test.txt", { type: "text/plain" });
    const mockUrl = "blob:http://example.com/test-url";

    // Type assertion for mock implementation
    global.URL.createObjectURL = jest
      .fn()
      .mockReturnValue(mockUrl) as jest.Mock<(obj: Blob) => string>;

    expect(convertFileToUrl(mockFile)).toBe(mockUrl);
    expect(URL.createObjectURL).toHaveBeenCalledWith(mockFile);
  });
});
