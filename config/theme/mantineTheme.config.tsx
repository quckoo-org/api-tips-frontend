import {
  Accordion,
  Button,
  Container,
  createTheme,
  MantineSize,
  PasswordInput,
  rem,
  Select,
  Text,
  TextInput,
  Title,
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
  h0: typedTwConfig.theme.fontSize["h0"],
  h1: typedTwConfig.theme.fontSize["h1"],
  h2: typedTwConfig.theme.fontSize["h2"],
  h3: typedTwConfig.theme.fontSize["h3"],
};

const TITLE_LEADING: Record<string, string> = {
  h0: typedTwConfig.theme.lineHeight["h0"],
  h1: typedTwConfig.theme.lineHeight["h1"],
  h2: typedTwConfig.theme.lineHeight["h2"],
  h3: typedTwConfig.theme.lineHeight["h3"],
};

const BUTTON_VARIANT = {
  xs: {
    height: rem(30),
    paddingInline: rem(14),
    fontSize: typedTwConfig.theme.fontSize.xs,
    borderRadius: typedTwConfig.theme.borderRadius.xs,
  },
  sm: {
    height: rem(36),
    paddingInline: rem(18),
    fontSize: typedTwConfig.theme.fontSize.sm,
    borderRadius: typedTwConfig.theme.borderRadius.sm,
  },
  md: {
    height: rem(48),
    paddingInline: rem(24),
    fontSize: typedTwConfig.theme.fontSize.md,
    borderRadius: typedTwConfig.theme.borderRadius.md,
  },
  lg: {
    height: rem(48),
    paddingInline: rem(24),
    fontSize: typedTwConfig.theme.fontSize.md,
    borderRadius: typedTwConfig.theme.borderRadius.lg,
  },
  xl: {
    height: rem(48),
    paddingInline: rem(24),
    fontSize: typedTwConfig.theme.fontSize.md,
    lineHeight: typedTwConfig.theme.lineHeight.md,
    borderRadius: typedTwConfig.theme.borderRadius.xl,
  },
};

export const mantineTheme = createTheme({
  autoContrast: true,
  colors: tailWindColors,
  primaryColor: "blue",
  radius: typedTwConfig.theme.borderRadius,
  headings: {
    fontFamily: "Roboto",
  },

  lineHeights: typedTwConfig.theme.lineHeight,
  components: {
    Checkbox: {
      styles: {
        cursor: "pointer",
      },
      classNames: {
        input: "rounded-xs",
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
    Accordion: Accordion.extend({
      defaultProps: {
        chevron: <ChevronDown />,
        classNames: {
          item: clsx("bg-white border-none rounded-lg mb-2"),
          panel: "text-lg",
          label: clsx("py-5 text-xl font-semibold"),
          content: clsx("lg:px-5 bg-white rounded-lg px-10 py-5"),
          control: "lg:px-5 px-10 rounded-lg bg-white hover:bg-gray-100",
          chevron: "w-7 h-7 flex justify-center",
        },
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        classNames: {
          label: "font-semibold mb-1 text-sm",
        },
      },
    }),
    Select: Select.extend({
      defaultProps: {
        classNames: {
          label: "font-semibold mb-1 text-sm",
        },
      },
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: {
        classNames: {
          label: "font-semibold mb-1 text-sm",
        },
      },
    }),
    Button: Button.extend({
      vars: (_, { size = "md" }) => ({
        root: {
          "--button-height": BUTTON_VARIANT[size as MantineSize]?.height,
          "--button-padding-x":
            BUTTON_VARIANT[size as MantineSize]?.paddingInline,
          "--button-fz": BUTTON_VARIANT[size as MantineSize]?.fontSize,
          "--button-radius": BUTTON_VARIANT[size as MantineSize]?.borderRadius,
        },
      }),
    }),
  },
});
