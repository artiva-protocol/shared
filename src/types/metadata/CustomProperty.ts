export type CustomProperty = {
  type: "boolean" | "text" | "select" | "color" | "image";
  options?: string[];
  default?: any;
  group?: "homepage" | "post";
};
