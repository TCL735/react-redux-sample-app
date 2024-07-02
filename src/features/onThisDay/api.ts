import { OnThisDayEventType, PersonBirth, PersonInfo } from "../../types";

export const getOnThisDay = (eventType: OnThisDayEventType) => {
  let today = new Date();
  let month = String(today.getMonth() + 1).padStart(2, "0");
  let day = String(today.getDate()).padStart(2, "0");
  let url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/${eventType}/${month}/${day}`;

  return {
    promiseResponse: fetch(url),
    month,
    day,
  };
};

export const getBirthsOnThisDay = async (): Promise<PersonInfo[]> => {
  const eventType = "births";
  const { promiseResponse, month, day } = getOnThisDay(eventType);
  const response = await promiseResponse;
  const results = await response.json();

  const persons = results[eventType].map((personInfo: PersonBirth) => {
    const keywords = personInfo.text
      .split(" ")
      .map((word) => word.toLowerCase().replace(",", ""));

    const pageInfo = personInfo.pages.find((page) => {
      return keywords.some((keyword) => {
        return page?.titles.normalized.toLowerCase().includes(keyword);
      });
    });

    return {
      ...pageInfo,
      text: personInfo.text,
      year: personInfo.year,
      month,
      day,
    };
  });
  return persons;
};
