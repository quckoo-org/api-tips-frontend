import Link from "next/link";
import { ROUTES } from "@/shared/router";

export default function Home() {
  return (
    <div>
      Home
      <Link href={ROUTES.LOGIN}>Login</Link>
      <Link href={ROUTES.TARIFFS}>Tariffs</Link>
    </div>
  );
}
