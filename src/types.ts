export type OnThisDayEventType =
  | "all"
  | "selected"
  | "births"
  | "deaths"
  | "holidays"
  | "events";

export interface Thumbnail {
  source: string;
  height: number;
  width: number;
}

export interface PersonBirthPage {
  id: string;
  year: number;
  month: number;
  day: number;
  text: string;
  description: string;
  thumbnail: Thumbnail;
  pageLink: string;
}
