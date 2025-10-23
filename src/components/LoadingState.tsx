interface LoadingStateProps {
  message: string;
}

const LoadingState = ({ message }: LoadingStateProps) => (
  <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
    <div className="text-lg text-gray-600">{message}</div>
  </div>
);

export default LoadingState;
