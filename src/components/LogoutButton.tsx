import Button from "./Button";

interface LogoutButtonProps {
  onLogout: () => Promise<void>;
}

const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  return (
    <Button
      label="Log Out"
      onClick={onLogout}
      className="bg-red-500 hover:bg-red-600"
    />
  );
};

export default LogoutButton;
