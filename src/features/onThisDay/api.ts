import {
  OnThisDayEventType,
  PersonBirth,
  PersonInfo,
  ResponseStatus,
} from "../../types";

export const getOnThisDay = (eventType: OnThisDayEventType) => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/${eventType}/${month}/${day}`;

  return {
    promiseResponse: fetch(url),
    month,
    day,
  };
};

export const getBirthsOnThisDay = async (): Promise<{
  persons: PersonInfo[];
  responseStatus: ResponseStatus;
}> => {
  const eventType = "births";
  const { promiseResponse, month, day } = getOnThisDay(eventType);
  const response = await promiseResponse;
  const { ok, status, statusText } = response;
  const results = await response.json();

  const persons = results?.[eventType]
    ?.map((person: PersonBirth) => {
      const keywords = person.text
        .split(" ")
        .map((word) => word.toLowerCase().replace(",", ""));

      const pageInfo = person.pages.find((page) => {
        return keywords.some((keyword) => {
          return page.titles?.normalized?.toLowerCase().includes(keyword);
        });
      });

      return {
        ...pageInfo,
        text: person.text,
        year: person.year,
        month,
        day,
        responseStatus: {
          ok,
          status,
          statusText,
        },
      };
    })
    .sort((a: PersonInfo, b: PersonInfo) => b.year - a.year);

  return {
    persons: persons ?? [],
    responseStatus: { ok, status, statusText },
  };
};
