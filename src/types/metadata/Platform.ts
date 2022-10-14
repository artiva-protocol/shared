import { CustomProperty } from "./CustomProperty";
import { Navigation } from "./Navigation";
import { PostOrder } from "./PostOrder";
import { Tag } from "./Tag";

export type Platform = {
  title: string;
  description: string;
  logo?: string;
  icon?: string;
  themeURL?: string;
  accent_color?: string;
  cover_image?: string;
  codeinjection_head?: string;
  codeinjection_foot?: string;
  navigation?: Navigation[];
  tags?: Tag[];
  order?: PostOrder[];
  timezone?: string;
  locale?: string;
  meta_title?: string;
  meta_description?: string;
  twitter_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  og_image?: string;
  og_title?: string;
  og_description?: string;
  url?: string;
  custom: {
    [key: string]: CustomProperty;
  };
};
