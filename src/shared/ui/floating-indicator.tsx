"use client";

import {
  FloatingIndicator as FloatingIndicatorMantine,
  Text,
  UnstyledButton,
} from "@mantine/core";
import clsx from "clsx";
import * as React from "react";
import { forwardRef, useState } from "react";

type FloatingIndicatorProps = {
  data: string[];
  className?: string;
};

export const FloatingIndicator = forwardRef<
  HTMLDivElement,
  FloatingIndicatorProps
>(({ data, className }, ref) => {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const [active, setActive] = useState(0);

  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  const controls = data.map((item, index) => (
    <UnstyledButton
      key={item}
      className="px-3 py-1.5 leading-none text-gray-700 dark:text-dark-200 rounded-md font-medium transition-colors duration-100 ease-in-out"
      ref={setControlRef(index)}
      onClick={() => setActive(index)}
      mod={{ active: active === index }}
    >
      <Text
        className={clsx("relative z-10 text-white", {
          ["!text-blue-700 font-bold"]: active === index,
        })}
      >
        {item}
      </Text>
    </UnstyledButton>
  ));

  return (
    <div
      className={clsx(
        "border-white border w-fit rounded-sm font-['Inter']",
        className,
      )}
    >
      <div
        ref={setRootRef}
        className="relative bg-blue-700 w-fit rounded-sm dark:bg-dark-800 dark:border-dark-400 m-0.5"
      >
        {controls}
        <FloatingIndicatorMantine
          ref={ref}
          className="bg-white rounded-[0.875rem]"
          target={controlsRefs[active]}
          parent={rootRef}
        />
      </div>
    </div>
  );
});

FloatingIndicator.displayName = "FloatingIndicator";
