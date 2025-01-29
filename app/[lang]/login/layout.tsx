import AuthUiLayout from "@/shared/ui/auth-ui-layout";

export default async function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthUiLayout>{children}</AuthUiLayout>;
}
