'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';
import { ROUTES } from "@/shared/router";
import { fetchClient } from "@/shared/utils/fetchClient";
import { toast } from "react-hot-toast";

const VerifyPage = () => {
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (!token) {
          throw new Error('Invalid or missing token');
        }
        console.log('work');

        // Запрос на бэкенд для верификации
       await fetchClient.get('/auth/verify-email' + '?token=' + token);
        toast.success('Email verified successfully.', {duration: 5000})

        // Редирект на логин при успешной верификации
        router.push('/login?verification=failed');
      } catch (error) {
        console.error('Verification error:', error);
        toast.error('Email verification error.', {duration: 5000})
        // Редирект обратно на логин с query-параметром, чтобы вывести сообщение
        router.push('/login?verification=failed');
      }
    };

    verifyEmail();
  }, [router]);

  return <div className="flex justify-center items-center min-h-screen">Verifying...</div>;
};

export default VerifyPage;
