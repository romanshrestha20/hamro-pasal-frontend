import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextArea = ({ label, error, ...props }: TextAreaProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <textarea
        {...props}
        className={` text-gray-700 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500
        ${error ? "border-red-500" : "border-gray-300"}
      `}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
