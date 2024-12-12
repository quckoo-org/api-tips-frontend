"use client";

import { clientErrorWrapper } from "@/shared/grpc/errorHandlers/clientErrorWrapper";
import { useGrpcClient } from "@/shared/grpc/useGrpcClient";
import LocaleSwitcher from "@/shared/locale/locale";
import { useTranslations } from "@/shared/locale/translations";
import {
  PingPongRequest,
  TestServiceDefinition,
} from "@/shared/proto/test/v1/test";
import { Button, TextInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { Client } from "nice-grpc-web";
import { useEffect, useState } from "react";
import {use} from 'react';
import { log } from "node:util";


export const useTestClient = () => {
  const client = useGrpcClient(TestServiceDefinition);
  let testClient: Client<TestServiceDefinition> = client;

  for (const accessClientKey in client) {
    const accessClientFn = client[accessClientKey as keyof typeof client];
    testClient = {
      ...testClient,
      [accessClientKey]: clientErrorWrapper(accessClientFn),
    };
  }

  return testClient;
};

const Test = () => {
  const { t } = useTranslations();
  const { pingPong } = useTestClient();
  const [value, setValue] = useState<string>("");
  const [responseValue, setResponseValue] = useState<string>("");
  const pingpongMutation = useMutation({
    mutationKey: ["pingpong"],
    mutationFn: (request: PingPongRequest) => pingPong(request),
  });
  useEffect(() => {
    fetch('http://localhost:8086/auth/login', {
      method: 'POST',
      credentials: 'include', // Важно для передачи кук
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Add your request payload here
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    document.cookie.split('; ').forEach((cookie) => {
      console.log('Cookie:', cookie);
    });
  }, []);


  const sendReqeust = () => {
    pingpongMutation.mutate({ ping: value } as PingPongRequest, {
      onSuccess: (data) => {
        console.log(data);
        setResponseValue(data.pong);
      },
    });
  };
  return (
    <div className={"w-1/2 m-2 "}>
      <p>{t("Привет")}</p>
      <LocaleSwitcher />
      Grpc response: {responseValue} <br />
      <TextInput
        label="Тест grpc request"
        required
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        mt="md"
        autoComplete="nope"
      />
      <Button className={"ml-1 mt-1"} onClick={sendReqeust}>
        Test
      </Button>
    </div>
  );
};

export default Test;
