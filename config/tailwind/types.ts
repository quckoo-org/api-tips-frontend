import { fontWeight } from "./fontWeight";
import { twConfig } from "./config";
import defaultColors from "tailwindcss/colors";

import { colors } from "./colors";

type DefaultColorsT = typeof defaultColors;

export type TailwindColorsT = DefaultColorsT & typeof colors;
export type TailwindFontWightT = { fontWeight: typeof fontWeight };

export type ColorT = keyof TailwindColorsT;

export type TailwindThemeT = (typeof twConfig)["theme"] &
  TailwindColorsT &
  TailwindFontWightT;
