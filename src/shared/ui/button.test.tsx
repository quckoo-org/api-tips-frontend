import { Button, MantineProvider } from "@mantine/core";
import { render } from "@testing-library/react";
import { describe, test } from "vitest";

describe("<Button />", () => {
  test("renders without crashing", () => {
    render(
      <MantineProvider withCssVariables withGlobalClasses>
        <Button>Click me</Button>
      </MantineProvider>,
    );
  });
});
