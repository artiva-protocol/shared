import { Platform } from "../metadata";

export type { HomeProps } from "./HomeProps";
export type { NFTProps } from "./NFTProps";
export type { NFTContractProps } from "./NFTContractProps";
export type { ThemeConfig } from "./ThemeConfig";

export type PlatformThemeType = Platform & { id: string };
