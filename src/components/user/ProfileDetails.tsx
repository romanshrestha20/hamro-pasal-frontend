import type { User } from "@/lib/types";

interface ProfileDetailsProps {
  user: User;
  className?: string;
}

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow = ({ label, value }: DetailRowProps) => (
  <p className="text-sm text-muted-foreground">
    <span className="font-medium text-foreground">{label}:</span>{" "}
    {value}
  </p>
);

const ProfileDetails = ({ user, className = "" }: ProfileDetailsProps) => {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  return (
    <div className={`space-y-2 ${className}`}>
      {fullName && <DetailRow label="Name" value={fullName} />}
      {user?.email && <DetailRow label="Email" value={user.email} />}
      {user?.phone && <DetailRow label="Phone" value={user.phone} />}

      {user.address ? (
        <DetailRow label="Address" value={user.address} />
      ) : (
        <div className="space-y-1">
          <DetailRow label="Address" value="Not provided" />
          <p className="text-xs font-medium text-destructive">
            Please add your address as soon as possible to avoid issues with
            order delivery.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
