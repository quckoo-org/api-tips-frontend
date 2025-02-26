import { ComboboxItem } from "@mantine/core";
import { createStrictContext } from "@/shared/hooks/useSctrictContext";

type BalanceDeps = {
  getUsers: () => ComboboxItem[];
};

export const balanceDepsContext = createStrictContext<BalanceDeps>();
