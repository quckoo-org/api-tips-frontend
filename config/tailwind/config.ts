import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import { TailwindThemeT } from "./types";

export const twConfig = resolveConfig(tailwindConfig);

export const typedTwConfig = twConfig as unknown as {
  theme: TailwindThemeT;
};
