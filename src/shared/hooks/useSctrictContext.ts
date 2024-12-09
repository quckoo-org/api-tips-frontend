import { Context, createContext, useContext } from "react";

export function useStrictContext<T>(context: Context<T>): NonNullable<T> {
  const contextState = useContext(context);

  if (contextState == null) {
    throw new Error(
      `useStrictContext must be used within ${
        context.displayName || ""
      }Provider`,
    );
  }

  return contextState as NonNullable<T>;
}

export function createStrictContext<T>() {
  return createContext<T | null>(null);
}
