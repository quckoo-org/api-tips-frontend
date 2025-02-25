import { ComboboxItem } from "@mantine/core";
import { createStrictContext } from "@/shared/hooks/useSctrictContext";

type ManageUserOrderDeps = {
  getTariffs: () => ComboboxItem[];
};

export const manageUserOrderDepsContext =
  createStrictContext<ManageUserOrderDeps>();
