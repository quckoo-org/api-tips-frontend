'use client'
import React, {ChangeEvent, useState} from 'react';
import {useMutation, useQuery} from "react-query";
import {createChannel, createClient, FetchTransport} from "nice-grpc-web";
import {PingPongRequest, TestServiceDefinition} from "@/proto/test/v1/test";
import {Button, TextInput} from "@mantine/core";

const channel = createChannel('https://beta.api-tips.api.quckoo.net'); // Настройте адрес gRPC сервера

const client = createClient(TestServiceDefinition, channel);

const Test = () => {
	const {pingPong} = client
	const [value, setValue] = useState<string>('')
	const [responseValue, setResponseValue] = useState<string>('')
	const pingpongMutation = useMutation({
		mutationKey: ['pingpong'],
		mutationFn: (request: PingPongRequest) => pingPong(request),
	})


	const sendReqeust = () => {
		pingpongMutation.mutate({ping:value }as PingPongRequest, {
			onSuccess: (data) => {
				console.log(data)
				setResponseValue(data.pong)
			}
		})
	}
	return (
		<div className={'w-1/2 m-2 '}>
			Grpc response: {responseValue} <br/>
			<TextInput
				label="Тест grpc request"
				required
				value={value}
				onChange={(event) => setValue(event.currentTarget.value)}
				mt="md"
				autoComplete="nope"
			/>
			<Button className={'ml-1 mt-1' } onClick={sendReqeust}>Test</Button>
		</div>
	);
};

export default Test;