import { twConfig } from "./config";

export type TailwindThemeT = (typeof twConfig)["theme"];

export type TailwindColorsT = (typeof twConfig)["theme"]["colors"];
