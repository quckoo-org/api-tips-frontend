"use client"
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useGetCurrentUser } from "@/features/auth/model/use-get-current-user";
import { authStore } from "@/shared/stores/AuthStore";
import { Loader } from "@mantine/core";

const AuthMe = () => {
  const currentUserQuery = useGetCurrentUser()
  const {setCurrentUser, user} = authStore

  useEffect(() => {
    console.log(currentUserQuery.data?.user,user);
    if (currentUserQuery.data?.user) {
      console.log(currentUserQuery.data?.user);
      setCurrentUser(currentUserQuery.data.user);
    }
  }, [currentUserQuery.data?.user]);

  return (
    <div/>
  );
};

export default observer(AuthMe);