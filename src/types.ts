export type OnThisDayEventType =
  | "all"
  | "selected"
  | "births"
  | "deaths"
  | "holidays"
  | "events";

export interface OnThisDayEventInfo {
  [key: string]:
    | number
    | string
    | OnThisDayEventInfo
    | Array<string | number | OnThisDayEventInfo>;
}

export interface Thumbnail {
  source: string;
  height: number;
  width: number;
}

export interface PersonBirthInfo {
  id: string;
  year: number;
  month: number;
  day: number;
  text: string;
  description: string;
  thumbnail: Thumbnail;
  pageLink: string;
}
