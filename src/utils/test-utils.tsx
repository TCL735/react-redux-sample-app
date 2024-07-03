import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { rest, response } from "msw";
import { setupStore } from "../app/store";
import type { AppStore, RootState } from "../app/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
) => {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`;

export const mockPeople = [
  {
    text: "Curious George",
    year,
    pages: [
      {
        content_urls: {
          desktop: {
            page: "some.random.url",
            edit: "edit",
            revision: "revision",
            talk: "talk",
          },
          mobile: {
            page: "some.random.url",
            edit: "edit",
            revision: "revision",
            talk: "talk",
          },
        },
        description: "describes Curious George",
        thumbnail: {
          source: "a.picture.of.curious-george",
          height: 400,
          width: 300,
        },
        titles: {
          normalized: "Curious Monkey",
          canonical: "canonical title",
          display: "display title",
        },
      },
    ],
  },
  {
    text: "Tony Stark",
    year,
    pages: [
      {
        content_urls: {
          desktop: {
            page: "a.random.url",
            edit: "edit",
            revision: "revision",
            talk: "talk",
          },
          mobile: {
            page: "a.random.url",
            edit: "edit",
            revision: "revision",
            talk: "talk",
          },
        },
        description: "describes Tony Stark",
        thumbnail: {
          source: "a.picture.of.tony-stark",
          height: 400,
          width: 300,
        },
        titles: {
          normalized: "Iron Man",
          canonical: "canonical title",
          display: "display title",
        },
      },
    ],
  },
  {
    text: "Thomas",
    year,
    pages: [
      {
        content_urls: {
          desktop: {
            page: "very.random.url",
            edit: "edit",
            revision: "revision",
            talk: "talk",
          },
          mobile: {
            page: "very.random.url",
            edit: "edit",
            revision: "revision",
            talk: "talk",
          },
        },
        description: "describes Thomas the Tank Engine",
        thumbnail: {
          source: "a.picture.of.thomas-the-tank-engine",
          height: 400,
          width: 300,
        },
        titles: {
          normalized: "A tank engine train",
          canonical: "canonical title",
          display: "display title",
        },
      },
    ],
  },
];

export const handlers = [
  rest.get(url, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        births: mockPeople,
      }),
    );
  }),
];
