import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  actionButton?: ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  children,
  actionButton,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        {actionButton && <div>{actionButton}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DashboardCard;
