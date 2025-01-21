import resolveConfig from "tailwindcss/resolveConfig";
import { TailwindThemeT } from "./types";
import tailwindConfig from "../../tailwind.config";

export const twConfig = resolveConfig(tailwindConfig);

export const typedTwConfig = twConfig as unknown as {
  theme: TailwindThemeT;
};

export default tailwindConfig;
