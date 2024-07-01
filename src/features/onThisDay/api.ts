import { OnThisDayEventType, PersonBirthPage } from "../../types";

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

export const getBirthsOnThisDay = async (): Promise<PersonBirthPage[]> => {
  const eventType = "births";
  const { promiseResponse, month, day } = getOnThisDay(eventType);
  const response = await promiseResponse;
  const results = await response.json();
  const persons = await results[eventType].map((personInfo: any) => {
    return {
      id: personInfo.pages[0].tid,
      year: personInfo.year,
      month: Number(month),
      day: Number(day),
      text: personInfo.text,
      description: personInfo.pages[0].description,
      thumbnail: personInfo.pages[0].thumbnail,
      pageLink: personInfo.pages[0].content_urls.desktop.page,
    };
  });
  return persons;
};
