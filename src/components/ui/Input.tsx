import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <div className="flex flex-col w-full gap-1">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}

      <input
        {...props}
        value={props.value ?? ""}
        className={`
          w-full px-3 py-2 rounded-lg
          bg-input text-foreground
          border border-border
          placeholder:text-muted-foreground
          focus:outline-none focus:ring-2 focus:ring-primary/40
          transition
          ${error ? "border-error focus:ring-error/40" : ""}
        `}
      />

      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
};
