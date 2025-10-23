import type { User } from "@/types/Users";

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="space-y-2 mb-6">
    {user?.firstName && (
      <p className="text-gray-600">
        <span className="font-medium">Name:</span> {user.firstName}
      </p>
    )}
    {user?.email && (
      <p className="text-gray-600">
        <span className="font-medium">Email:</span> {user.email}
      </p>
    )}
  </div>
  );

};

export default UserProfile;
