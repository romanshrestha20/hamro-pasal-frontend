import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token =
    typeof searchParams?.token === "string" ? searchParams.token : "";

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5 dark:from-background dark:via-background dark:to-background">
      <div className="w-full max-w-md p-8 border shadow-xl bg-card text-card-foreground rounded-2xl border-border">
        <ResetPasswordForm  />
      </div>
    </div>
  );
}
