import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  queryByText,
} from "@testing-library/react";
import { ClaimsPage } from "../Claims";

describe("Claims Component", () => {
  // Mock the useSWR hook to provide test data
  jest.mock("swr", () => ({
    __esModule: true,
    default: () => ({
      data: {
        claims: [
          {
            id: "1",
            name: "Test Claim",
            type: { name: "Test Type", value: "test" },
            coverId: { name: "Test Cover ID", value: "cover" },
            created: "2023-09-28",
            damageCost: 1000,
          },
        ],
      },
    }),
  }));

  it("renders the component", () => {
    const { getByText } = render(<ClaimsPage />);

    // Check if the component renders loading initially
    expect(getByText("Loading...")).toBeInTheDocument();
  });
});
