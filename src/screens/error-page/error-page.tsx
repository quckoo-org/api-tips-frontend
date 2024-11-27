import { FC } from "react";

type ErrorPageProps = { error: Error; reset: () => void };

const ErrorPage: FC<ErrorPageProps> = ({ error }) => {
  return (
    <div>
      Error <p>{error?.message}</p>
    </div>
  );
};

export default ErrorPage;
