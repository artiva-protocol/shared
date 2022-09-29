import { PostTypeEnum } from "./PostTypeEnum";
import { PostContent } from "./PostContent";

export type Post = {
  id: string;
  content: PostContent;
  type: PostTypeEnum;
  tags: string;
};
