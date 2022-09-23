import { CustomProperty } from "../metadata";

export type ThemeConfig = {
  name: string;
  version: string;
  engines: {
    artiva: string;
  };
  custom: {
    [key: string]: CustomProperty;
  };
};
