export const useTariffsClient = () => {
  const getAllTariffs = async (req: unknown, opt: unknown) => {
    console.log(req, "req");
    console.log(opt, "opt");
    const data = {
      totalPages: 10,
      rows: [
        {
          startDate: "01.01.2001",
          endDate: "01.03.2001",
          name: "Название тарифа 1",
          freeRequests: 10,
          paidRequests: 90,
          totalRequests: 100,
          cost: 0.1,
          totalCost: 100,
        },
        {
          startDate: "01.01.2001",
          endDate: "01.03.2001",
          name: "Название тарифа 2",
          freeRequests: 10,
          paidRequests: 90,
          totalRequests: 100,
          cost: 0.1,
          totalCost: 100,
        },
        {
          startDate: "01.01.2001",
          endDate: "01.03.2001",
          name: "Название тарифа 3",
          freeRequests: 10,
          paidRequests: 90,
          totalRequests: 100,
          cost: 0.1,
          totalCost: 100,
        },
      ],
    };
    return data;
  };

  const updateTariff = async (req: unknown, opt?: unknown) => {
    console.log(req, "req");
    console.log(opt, "opt");
  };

  const createTariff = async (req: unknown, opt?: unknown) => {
    console.log(req, "req");
    console.log(opt, "opt");
  };

  return { getAllTariffs, updateTariff, createTariff };
};
