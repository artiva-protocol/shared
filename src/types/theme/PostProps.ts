import { ArtivaContextType } from "../../context/ArtivaContext";
import { Post } from "../../types/posts/Post";
import { Platform } from "../metadata";

export type PostProps = {
  ctx: ArtivaContextType;
  platform: Platform;
  post?: Post;
};
