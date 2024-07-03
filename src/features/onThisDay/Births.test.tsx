import React from "react";
import { setupServer } from "msw/node";
import { fireEvent, screen } from "@testing-library/react";
import { handlers } from "../../utils/test-utils";
import { renderWithProviders } from "../../utils/test-utils";
import { Births } from "./Births";

const server = setupServer(...handlers);
// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("fetches and receives birthdays for the current date", async () => {
  renderWithProviders(<Births />);

  // No profiles should be rendered yet
  expect(screen.queryByText(/George/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Tony/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Thomas/i)).not.toBeInTheDocument();

  // Click to fetch the birthdays
  fireEvent.click(
    screen.getByRole("button", {
      name: (content) => content.includes("Birthdays"),
    }),
  );
  expect(await screen.findByText(/George/i)).toBeInTheDocument();
  expect(await screen.findByText(/Tony/i)).toBeInTheDocument();
  expect(await screen.findByText(/Thomas/i)).toBeInTheDocument();
  expect(await screen.findByText(/clear results/i)).toBeInTheDocument();

  // Click "clear results" to remove all profiles
  fireEvent.click(
    screen.getByRole("button", {
      name: (content) => content.includes("clear results"),
    }),
  );
  expect(screen.queryByText(/George/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Tony/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Thomas/i)).not.toBeInTheDocument();
});
