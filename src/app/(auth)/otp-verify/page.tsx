import { OtpForm } from "@/components/auth/OtpForm";

export default function OtpVerifyPage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const email =
    typeof searchParams?.email === "string" ? searchParams.email : "";

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-background">
      <div className="w-full max-w-md p-8 border shadow-lg bg-card border-border rounded-2xl">
        <OtpForm email={email} />
      </div>
    </div>
  );
}
