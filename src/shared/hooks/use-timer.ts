import { useEffect, useState } from "react";

export const useTimer = (initialTime: number = 0) => {
  const [timer, setTimer] = useState<number>(initialTime); // Таймер повторной отправки

  // Логика для таймера
  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);

  return {
    timer,
    setTimer,
  };
};
