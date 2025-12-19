import type { User } from "@/lib/types";

interface ProfileDetailsProps {
  user: User;
  className?: string;
}

interface DetailRowProps {
  label: string;
  value: string;
}

export const DetailRow = ({ label, value }: DetailRowProps) => (
  <p className="text-sm text-muted-foreground">
    <span className="font-medium text-foreground">{label}:</span> {value}
  </p>
);

const ProfileDetails = ({ user, className = "" }: ProfileDetailsProps) => {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  return (
    <div className={`space-y-2 ${className}`}>
      {fullName && <DetailRow label="Name" value={fullName} />}
      {user?.email && <DetailRow label="Email" value={user.email} />}
      <OptionalDetailRow
        label="Phone"
        value={user.phone}
        warning="Please add your phone number as soon as possible to avoid issues with order delivery."
      />

      <OptionalDetailRow
        label="Address"
        value={user.address}
        warning="Please add your address as soon as possible to avoid issues with order delivery."
      />
    </div>
  );
};

export default ProfileDetails;

interface OptionalDetailRowProps {
  label: string;
  value?: string | null;
  warning?: string;
}

const OptionalDetailRow = ({
  label,
  value,
  warning,
}: OptionalDetailRowProps) => {
  if (value) {
    return <DetailRow label={label} value={value} />;
  }

  return (
    <div className="space-y-1">
      <DetailRow label={label} value="Not provided" />
      {warning && (
        <p className="text-xs font-medium text-destructive">
          {warning}
        </p>
      )}
    </div>
  );
};
