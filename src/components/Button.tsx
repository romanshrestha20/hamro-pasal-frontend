interface ButtonProps {
  className?: string;
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick, className }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 bg-green-500 hover:bg-green-600 transition text-white font-medium rounded-lg ${className ?? ''}`}
    >
      {label}
    </button>
  );
};
export default Button;
