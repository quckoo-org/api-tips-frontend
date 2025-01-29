import {
  Container,
  createTheme,
  rem,
  Title,
  Text,
  MantineSize,
  Accordion,
  TextInput,
} from "@mantine/core";
import { clsx } from "clsx";
import { ChevronDown } from "lucide-react";
import { typedTwConfig } from "../tailwind";
import { parseTailwindColors } from "./utils/parseTailwindColors";
const tailWindColors = parseTailwindColors(typedTwConfig.theme.colors);

const CONTAINER_SIZES: Record<string, string> = {
  lg: rem(960),
  xl: rem(1440),
};

const TITLE_SIZES: Record<string, string> = {
  // h1: typedTwConfig.theme.fontSize["7xl"],
  // h2: typedTwConfig.theme.fontSize["6xl"],
  h3: typedTwConfig.theme.fontSize["h3"],
};

const TITLE_LEADING: Record<string, string> = {
  // h1: typedTwConfig.theme.lineHeight["7xl"],
  // h2: typedTwConfig.theme.lineHeight["6xl"],
  h3: typedTwConfig.theme.lineHeight["h3"],
};

export const mantineTheme = createTheme({
  autoContrast: true,
  colors: tailWindColors,
  primaryColor: "purple",
  radius: typedTwConfig.theme.borderRadius,
  headings: {
    fontFamily: "Montserrat",
  },
  lineHeights: typedTwConfig.theme.lineHeight,
  components: {
    Checkbox: {
      styles: {
        cursor: "pointer",
      },
    },
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          "--container-size": fluid
            ? "100%"
            : size !== undefined && size in CONTAINER_SIZES
              ? rem(CONTAINER_SIZES[size])
              : rem(size),
        },
      }),
    }),
    Title: Title.extend({
      vars: (_, { size }) => ({
        root: {
          "--title-fz":
            size !== undefined && size in TITLE_SIZES
              ? rem(TITLE_SIZES[size])
              : rem(size),
          "--title-lh":
            size !== undefined && size in TITLE_LEADING
              ? rem(TITLE_LEADING[size])
              : rem(size),
          "--title-fw": typedTwConfig.theme.fontWeight.bold,
        },
      }),
    }),
    Text: Text.extend({
      vars: (_, { size }) => ({
        root: {
          "--text-fz":
            size !== undefined && size in typedTwConfig.theme.fontSize
              ? rem(typedTwConfig.theme.fontSize[size as MantineSize])
              : rem(size),
        },
      }),
    }),
    TextInput: TextInput.extend({
      vars: () => ({
        root: {
          "--input-bd": "red",
        },
      }),
    }),
    Accordion: Accordion.extend({
      defaultProps: {
        chevron: <ChevronDown />,
        classNames: {
          item: clsx("bg-white border-none rounded-lg mb-2"),
          panel: "lg:text-sm lg:leading-sm text-lg",
          label: clsx("lg:text-sm lg:text-sm py-5 text-xl font-semibold"),
          content: clsx("lg:px-5 bg-white rounded-lg px-10 py-5"),
          control: "lg:px-5 px-10 rounded-lg",
          chevron: "w-7 h-7 flex justify-center",
        },
      },
    }),
  },
});
