export const useOrdersClient = () => {
  const getAllOrders = async (req: unknown, opt: unknown) => {
    console.log(req, "req");
    console.log(opt, "opt");
    const data = {
      orders: [
        {
          id: 1,
          orderNumber: 10,
          createdAt: {
            nanos: 10000,
            seconds: 100000,
          },
          tariff: {
            name: "Тариф",
          },
          sum: 1000,
          currency: "RUB",
          status: "Статус",
          firstName: "Имя",
          lastName: "Фамилия",
          email: "test@test.com",
          count: 19,
        },

        {
          id: 2,
          orderNumber: 10,
          createdAt: {
            nanos: 10000,
            seconds: 100000,
          },
          tariff: {
            name: "Тариф",
          },
          sum: 1000,
          currency: "RUB",
          status: "Статус",
          firstName: "Имя",
          lastName: "Фамилия",
          email: "test@test.com",
          count: 19,
        },
        {
          id: 3,
          orderNumber: 10,
          createdAt: {
            nanos: 10000,
            seconds: 100000,
          },
          tariff: {
            name: "Тариф",
          },
          sum: 1000,
          currency: "RUB",
          status: "Статус",
          firstName: "Имя",
          lastName: "Фамилия",
          email: "test@test.com",
          count: 19,
        },
      ],
    };
    return data;
  };

  const getOrder = async (req: unknown, opt: unknown) => {
    console.log(req, "req");
    console.log(opt, "opt");
    return { order: ORDER };
  };

  const updateOrder = async (req: unknown, opt?: unknown) => {
    console.log(req, "req");
    console.log(opt, "opt");
    return { order: ORDER };
  };

  const createOrder = async (req: unknown, opt?: unknown) => {
    console.log(req, "req");
    console.log(opt, "opt");
    return { order: ORDER };
  };

  return { getAllOrders, updateOrder, createOrder, getOrder };
};

const ORDER = {
  id: 1,
  orderNumber: 10,
  createdAt: {
    nanos: 10000,
    seconds: 100000,
  },
  tariff: {
    name: "Тариф",
  },
  sum: 1000,
  currency: "RUB",
  status: "Статус",
  firstName: "Имя",
  lastName: "Фамилия",
  email: "test@test.com",
  count: 19,
};
