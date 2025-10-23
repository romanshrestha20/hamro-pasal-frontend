import { useRouter } from "next/navigation";

interface ErrorStateProps {
  message: string;
  redirectPath: string;
}

export const ErrorState = ({ message, redirectPath }: ErrorStateProps) => {
  const router = useRouter();

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 mb-4">Error: {message}</div>
        <button
          onClick={() => router.push(redirectPath)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition text-white font-medium rounded-lg"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
