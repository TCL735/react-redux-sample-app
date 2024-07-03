import { BirthsOnThisDayState, birthsReducer, clear } from "./birthsSlice";
import { mockPeople } from "../../utils/test-utils";

describe("births reducer and actions", () => {
  test("'clear' action should return the right shape", () => {
    expect(clear()).toEqual({ type: "births/clear", payload: undefined });
  });

  test("births reducer should handle action 'clear'", () => {
    const state = {
      persons: mockPeople.map((person) => ({
        text: person.text,
        year: person.year,
        month: "07",
        day: "02",
        ...person.pages[0],
      })),
      status: "ready" as BirthsOnThisDayState["status"],
      errorMessage: "",
    };

    expect(birthsReducer(state, clear())).toEqual({
      persons: [],
      status: "ready",
      errorMessage: "",
    });
  });
});
