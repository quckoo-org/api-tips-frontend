"use client";

import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ROUTES } from "@/shared/router";
import { fetchClient } from "@/shared/utils/fetchClient";


const RegisterPage = () => {
  const [form, setForm] = useState({ email: "", password: "", firstName: "", lastName: "", countryCode: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchClient.post("/auth/register", form);
      notifications.show({
        title: "Registration Successful",
        message: "Please check your email to verify your account.",
        color: "teal",
      });
      //toast.success('Registration Successful. Please check your email to verify your account.', {duration: 5000})
      router.push(ROUTES.LOGIN);

    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">Register</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="p-2 mb-2 border"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="p-2 mb-2 border"
      />
      <input
        name="firstName"
        type="text"
        placeholder="Name"
        value={form.firstName}
        onChange={handleChange}
        className="p-2 mb-2 border"
      />
      <input
        name="lastName"
        type="text"
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleChange}
        className="p-2 mb-2 border"
      />
      {/*<CountrySelect         className="mb-2"*/}
      {/*                        onChangeCountry={(country) => setForm({ ...form, countryCode: country ?? "" })} hideLabel*/}
      {/*               value={form.countryCode} />*/}
      <Button type="submit" className="p-2  text-white">Register</Button>
    </form>
  );
};

export default RegisterPage;
