import {
  BirthsOnThisDayState,
  birthsReducer,
  clear,
  sort,
} from "./birthsSlice";
import { mockPeople } from "../../utils/test-utils";
import { SortDirection } from "../../types";

const status = "ready" as BirthsOnThisDayState["status"];
const errorMessage = "";

describe("births reducer and actions", () => {
  describe("clear actions", () => {
    it("should return the right shape", () => {
      expect(clear()).toEqual({ type: "births/clear", payload: undefined });
    });

    it("should be reduced correctly", () => {
      const state = {
        persons: mockPeople.map((person) => ({
          text: person.text,
          year: person.year,
          month: "07",
          day: "02",
          ...person.pages[0],
        })),
        status,
        errorMessage,
        sortDirection: SortDirection.DESCENDING,
      };

      expect(birthsReducer(state, clear())).toEqual({
        persons: [],
        status,
        errorMessage,
        sortDirection: SortDirection.DESCENDING,
      });
    });
  });

  describe("sort actions", () => {
    it("should return the right shape", () => {
      expect(sort(SortDirection.ASCENDING)).toEqual({
        type: "births/sort",
        payload: SortDirection.ASCENDING,
      });
      expect(sort(SortDirection.DESCENDING)).toEqual({
        type: "births/sort",
        payload: SortDirection.DESCENDING,
      });
    });

    it("should be reduced correctly", () => {
      const persons = mockPeople.map((person) => ({
        text: person.text,
        year: person.year,
        month: "07",
        day: "02",
        ...person.pages[0],
      }));
      const state = {
        persons,
        status,
        errorMessage,
        sortDirection: SortDirection.DESCENDING,
      };

      let direction = SortDirection.ASCENDING;
      expect(birthsReducer(state, sort(direction))).toEqual({
        persons: [...persons].sort((a, b) => a.year - b.year),
        status,
        errorMessage,
        sortDirection: direction,
      });

      direction = SortDirection.DESCENDING;
      expect(birthsReducer(state, sort(direction))).toEqual({
        persons: [...persons].sort((a, b) => b.year - a.year),
        status,
        errorMessage,
        sortDirection: direction,
      });
    });
  });
});
