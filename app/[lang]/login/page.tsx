import { LoginPage } from "@/screens/login-page/login-page";
// Подключаемся к gRPC серверу через обычный gRPC протокол
// const channel = createChannel("https://beta.api-tips.api.quckoo.net"); // Настройте адрес gRPC сервера
// const client = createClient(TestServiceDefinition, channel);

// async function fetchGrpcData(requestData: PingPongRequest) {
//   try {
//     const response = await client.pingPong(requestData);
//     return response;
//   } catch (error) {
//     console.error("Error fetching gRPC data:", error);
//     throw error;
//   }
// }

const Page = async () => {
  return <LoginPage />;
};

export default Page;
