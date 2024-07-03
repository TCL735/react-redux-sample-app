import React from "react";
import { setupServer } from "msw/node";
import { fireEvent, screen } from "@testing-library/react";
import { handlers } from "../../utils/test-utils";
import { renderWithProviders } from "../../utils/test-utils";
import { App } from "../../app/App";
import { BirthsOnThisDayState } from "./birthsSlice";

const server = setupServer(...handlers);
// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("ErrorModal appears when in error state and can be closed", async () => {
  const errorMessage = "Something terrible has happened";
  const initialState = {
    persons: [],
    status: "error" as BirthsOnThisDayState["status"],
    errorMessage,
  };
  renderWithProviders(<App />, { preloadedState: { births: initialState } });

  expect(screen.getByText(errorMessage)).toBeInTheDocument();

  fireEvent.click(
    screen.getByRole("button", {
      name: (content) => content.toLowerCase().includes("close"),
    }),
  );

  expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
});
