import { MantineColorsTuple, MantineThemeColorsOverride } from "@mantine/core";
import { TailwindColorsT } from "../../tailwind/types";

export const parseTailwindColors = (
  colors: TailwindColorsT,
): MantineThemeColorsOverride => {
  const typedKeys = Object.keys(colors) as (keyof TailwindColorsT)[];

  const resultColors: Record<string, MantineColorsTuple> = {};

  typedKeys.forEach((color) => {
    if (typeof colors[color] === "object") {
      resultColors[color] = Object.values(
        colors[color],
      ) as unknown as MantineColorsTuple;
      return;
    }

    resultColors[color] = new Array(10).fill(
      colors[color],
    ) as unknown as MantineColorsTuple;
  });

  return resultColors;
};
