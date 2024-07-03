export type OnThisDayEventType =
  | "all"
  | "selected"
  | "births"
  | "deaths"
  | "holidays"
  | "events";

export type ImageProperties = {
  height: number;
  source: string;
  width: number;
};

export enum SortDirection {
  ASCENDING = "ascending",
  DESCENDING = "descending",
}

export type UrlProperties = {
  edit: string;
  page: string;
  revision: string;
  talk: string;
};
export interface PageInfo {
  content_urls: {
    desktop: UrlProperties;
    mobile: UrlProperties;
  };
  description?: string;
  description_source?: string;
  dir: string;
  displaytitle: string;
  extract: string;
  extract_html: string;
  lang: string;
  namespace: {
    id: number;
    text: string;
  };
  normalizedtitle: string;
  originalimage: ImageProperties;
  pageid: number;
  revision: string;
  thumbnail?: ImageProperties;
  tid: string;
  timestamp: string;
  title: string;
  titles: {
    canonical: string;
    display: string;
    normalized: string;
  };
  type: string;
  wikibase_item: string;
}

export interface PersonBirth {
  text: string;
  year: number;
  pages: Partial<PageInfo>[];
}

export type PersonInfo = Pick<PersonBirth, "text" | "year"> & {
  month: string;
  day: string;
} & Partial<PageInfo>;

export type ResponseStatus = {
  ok: boolean;
  status: number;
  statusText: string;
};
