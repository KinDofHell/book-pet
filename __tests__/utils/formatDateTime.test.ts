import { formatDateTime } from "@/lib/utils";
import { expect, describe, it } from "@jest/globals";

describe("formatDateTime function", () => {
  it("should return formatted date and time strings", () => {
    const dateString = "2023-05-19T15:30:00Z";
    const { dateTime, dateOnly, timeOnly } = formatDateTime(
      new Date(dateString),
    );

    expect(dateTime).toBe("Fri, May 19, 6:30 PM");
    expect(dateOnly).toBe("Fri, May 19, 2023");
    expect(timeOnly).toBe("6:30 PM");
  });
});
