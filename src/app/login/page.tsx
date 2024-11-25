import React from 'react';
import {createChannel, createClient} from "nice-grpc";
import {PingPongRequest, TestServiceDefinition} from "@/proto/test/v1/test";
import Test from "@/app/login/Test";

// Подключаемся к gRPC серверу через обычный gRPC протокол
const channel = createChannel('https://beta.api-tips.api.quckoo.net'); // Настройте адрес gRPC сервера
const client = createClient(TestServiceDefinition, channel);

async function fetchGrpcData(requestData: PingPongRequest) {
	try {
		const response = await client.pingPong(requestData);
		return response;
	} catch (error) {
		console.error('Error fetching gRPC data:', error);
		throw error;
	}
}
const Page = async () => {

	const res = await fetchGrpcData({ping: 'test'})
	console.log(res)
	return (
		<div>
			Логин страница
			<Test/>
		</div>
	);
};

export default Page;