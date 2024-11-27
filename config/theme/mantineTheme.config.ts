import { Button, createTheme } from "@mantine/core";
import { parseTailwindColors } from "./utils/parseTailwindColors";

import { typedTwConfig } from "../tailwind";

const tailWindColors = parseTailwindColors(typedTwConfig.theme.colors);

export const mantineTheme = createTheme({
  autoContrast: true,
  colors: tailWindColors,
  black: typedTwConfig.theme.colors.indigo[700],
  components: {
    Button: Button.extend({
      defaultProps: {
        size: "md",
      },
    }),
  },
});
