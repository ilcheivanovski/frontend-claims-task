import React from "react";
import { render, fireEvent, waitFor, queryByText } from "@testing-library/react";
import { Claims } from "../Claims";

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
    const { getByText } = render(<Claims />);

    // Check if the component renders loading initially
    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("submits a new claim", async () => {
    const { getByText, getByTestId } = render(<Claims />);

    // Fill out the form fields
    fireEvent.change(getByTestId("name"), {
      target: { value: "New Claim" },
    });
    fireEvent.change(getByTestId("type"), { target: { value: "test" } });
    fireEvent.change(getByTestId("cost"), { target: { value: "2000" } });
    fireEvent.change(getByTestId("coverId"), { target: { value: "cover" } });

    // Submit the form
    fireEvent.click(getByText("Submit new Claim"));

    // Wait for the form submission to complete
    await waitFor(() => {
      // Check if the claim is added to the table
      expect(getByText("New Claim")).toBeInTheDocument();
      expect(getByText("test")).toBeInTheDocument();
      expect(getByText("2000")).toBeInTheDocument();
      expect(getByText("cover")).toBeInTheDocument();
    });
  });

  it("deletes a claim", async () => {
    const { getByText } = render(<Claims />);

    // Wait for the claims to load
    await waitFor(() => {
      // Find and click the "Delete" button for the first claim
      const deleteButton = getByText("Delete");
      fireEvent.click(deleteButton);
    });

    // Wait for the deletion to complete
    await waitFor(() => {
      // Check if the claim is removed from the table
      expect(getByText("Test Claim")).toBeNull();
    });
  });
});
