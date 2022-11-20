import { PlatformThemeType } from ".";
import { ArtivaContextType } from "../../context/ArtivaContext";

export type TagProps = {
  ctx: ArtivaContextType;
  platform: PlatformThemeType;
  tag: string;
};
