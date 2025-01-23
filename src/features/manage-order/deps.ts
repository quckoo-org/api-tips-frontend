import { ComboboxItem } from "@mantine/core";
import { createStrictContext } from "@/shared/hooks/useSctrictContext";

type MenageOrderDeps = {
  getUsers: () => ComboboxItem[];
  getTariffs: () => ComboboxItem[];
};

export const menageOrderDepsContext = createStrictContext<MenageOrderDeps>();
