"use client";

import { FC, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchClient } from "@/shared/utils/fetchClient";
import { authStore } from "@/shared/stores/AuthStore";
import { Button } from "@mantine/core";

type LoginByEmailProps = {
  className?: string;
};

export const LoginByEmail: FC<LoginByEmailProps> = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams()
  const verificationStatus = searchParams.get('verification ')
  console.log(verificationStatus);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await fetchClient.post('/auth/login', form);
      localStorage.setItem('accessToken', data.accessToken)
      authStore.login(data);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">Login</h1>
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
      <Button type="submit" className="p-2  text-white">Login</Button>
    </form>
  );
};
