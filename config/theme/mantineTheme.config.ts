import { createTheme } from "@mantine/core";
import { typedTwConfig } from "../tailwind";
import { parseTailwindColors } from "./utils/parseTailwindColors";

const tailWindColors = parseTailwindColors(typedTwConfig.theme.colors);

export const mantineTheme = createTheme({
  autoContrast: true,
  colors: tailWindColors,
  primaryColor: "purple",
  black: typedTwConfig.theme.colors.indigo[700],
  components: {
    Checkbox: {
      styles: {
        cursor: "pointer",
      },
    },
  },
});
