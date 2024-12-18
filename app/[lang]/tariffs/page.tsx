import { Suspense } from "react";
import { TariffsPage } from "@/screens/tariffs-page";

const Tariffs = async () => {
  return (
    <Suspense>
      <TariffsPage />
    </Suspense>
  );
};

export default Tariffs;
