import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store";
import { App } from "./App";
import { mockPeople, renderWithProviders } from "../utils/test-utils";
import { BirthsOnThisDayState } from "../features/onThisDay/birthsSlice";
import { SortDirection } from "../types";

test("Renders the app", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  expect(screen.getByText(/On This Day/i)).toBeInTheDocument();
});

test("Uses preloaded state to render", () => {
  const initialBirthdays = {
    persons: mockPeople.map((person) => ({
      text: person.text,
      year: person.year,
      month: "07",
      day: "02",
      ...person.pages[0],
    })),
    status: "ready" as BirthsOnThisDayState["status"],
    errorMessage: "",
    sortDirection: SortDirection.DESCENDING,
  };
  renderWithProviders(<App />, {
    preloadedState: { births: initialBirthdays },
  });

  expect(screen.getByText(/George/i)).toBeInTheDocument();
  expect(screen.getByText(/Tony/i)).toBeInTheDocument();
  expect(screen.getByText(/Thomas/i)).toBeInTheDocument();
  expect(screen.getByText(/clear results/i)).toBeInTheDocument();
  expect(screen.queryByText(/unknown/i)).not.toBeInTheDocument();
});
