import { useRouter } from "next/navigation";
import Button from "./Button";

const GuestState = () => {
  const router = useRouter();

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Access Your Dashboard
        </h2>
        <p className="text-gray-600 mb-6">
          Please sign in to view your personalized dashboard and access all
          features.
        </p>
        <div className="space-y-3">
          <Button
            onClick={() => router.push("/auth/login")}
            className="w-full bg-blue-500"
            label="Sign In"
          />
          <Button
            onClick={() => router.push("/auth/register")}
            className="w-full bg-indigo-400"
            label="Create Account"
          />
        </div>
      </div>
    </div>
  );
};

export default GuestState;
