import {
  Button as MantineButton,
  ButtonProps as MantineButtonProps,
  ButtonStylesNames,
  ButtonVariant,
  MantineSize,
} from "@mantine/core";
import clsx from "clsx";
import * as React from "react";

const getStyles = ({
  size,
  variant,
  fullWidth,
  className,
}: {
  size?: MantineSize | (string & {});
  variant?: ButtonVariant | (string & {});
  fullWidth?: boolean;
  className?: string;
}) => {
  const sizeClasses: Partial<
    Record<
      MantineSize | (string & {}),
      Partial<Record<ButtonStylesNames, string>>
    >
  > = {
    sm: {
      root: "px-5 py-2 text-sm",
    },
    md: {
      root: "px-5 py-2 text-sm h-10",
    },
    lg: {
      root: "lg:py-5 lg:h-[64px] lg:text-sm lg:leading-md px-8 py-6 font-semibold h-[72px]",
    },
    xl: {
      root: "lg:h-[64px] lg:py-5 lg:px-8 lg:text-sm lg:leading-md px-12 py-6 text-xl h-[72px]",
    },
  };

  const variantClasses: Partial<
    Record<
      ButtonVariant | (string & {}),
      Partial<Record<ButtonStylesNames, string>>
    >
  > = {
    filled: {
      root: "bg-blue-500 text-white hover:bg-blue-600",
    },
    outline: {
      root: "border border-blue-500 text-blue-500 hover:bg-blue-100 text-blue-500 hover:text-blue-700 hover:bg-transparent",
    },
    light: {
      root: "bg-blue-100 text-blue-500 hover:bg-blue-200",
    },
    black: {
      root: "bg-black text-white hover:bg-gray-900",
    },
    gradient: {
      root: "bg-custom-gradient border-0",
    },
  };

  return {
    root: clsx(
      className,
      fullWidth && "w-full",
      size && sizeClasses[size]?.root,
      variant && variantClasses[variant]?.root,
    ),
  };
};

const Button = React.forwardRef<HTMLButtonElement, MantineButtonProps>(
  ({ className, size, variant, fullWidth, ...props }, ref) => {
    const Comp = MantineButton;
    const classes = getStyles({ size, variant, fullWidth, className });

    return (
      <Comp
        ref={ref}
        {...props}
        size={size}
        variant={variant}
        fullWidth={fullWidth}
        classNames={classes}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
