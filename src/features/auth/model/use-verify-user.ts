"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { fetchClient } from "@/shared/utils/fetchClient";

export const useVerifyUser = () => {
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (!token) {
          throw new Error("Invalid or missing token");
        }

        // Запрос на бэкенд для верификации
        await fetchClient.get("/api/auth/verify-email" + "?token=" + token);
        toast.success("Email verified successfully.", { duration: 5000 });

        // Редирект на логин при успешной верификации
        router.push("/login?verification=failed");
      } catch (error) {
        console.error("Verification error:", error);
        toast.error("Email verification error.", { duration: 5000 });
        // Редирект обратно на логин с query-параметром, чтобы вывести сообщение
        router.push("/login?verification=failed");
      }
    };

    verifyEmail();
  }, [router]);
};
