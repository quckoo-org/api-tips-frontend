"use client";

import { Button, TextInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { Client } from "nice-grpc-web";
import { useState } from "react";
import { clientErrorWrapper } from "@/shared/grpc/errorHandlers/clientErrorWrapper";
import { useGrpcClient } from "@/shared/grpc/useGrpcClient";
import LocaleSwitcher from "@/shared/locale/locale";
import { useTranslations } from "@/shared/locale/translations";
import {
  PingPongRequest,
  TestServiceDefinition,
} from "@/shared/proto/test/v1/test";



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
