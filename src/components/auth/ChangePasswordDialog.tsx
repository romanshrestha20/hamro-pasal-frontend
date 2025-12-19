"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export function ChangePasswordDialog() {
  const { changePassword, user } = useAuth();
  const [open, setOpen] = useState(false);

  const hasPassword = Boolean(user?.hasPassword);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const validateForm = () => {
    if (hasPassword && !oldPassword)
      return (toast.error("Current password is required"), false);

    if (newPassword.length < 6)
      return (toast.error("New password must be at least 6 characters"), false);

    if (newPassword !== confirmNewPassword)
      return (toast.error("New passwords do not match"), false);

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const toastId = toast.loading("Changing password...");
    const message = hasPassword
      ? "Password updated successfully"
      : "Password set successfully";

    await changePassword(hasPassword ? oldPassword : "", newPassword, {
      onSuccess: () => {
        toast.success(message, { id: toastId });

        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");

        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button className="transition-colors border rounded-xl bg-primary text-primary-foreground border-border hover:bg-accent hover:text-accent-foreground">
          Change Password
        </Button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="p-6 transition-all duration-300 border shadow-2xl bg-card text-card-foreground border-border rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Change Password
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter your current password and the new password you want to use.
          </DialogDescription>
        </DialogHeader>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {hasPassword && (
            <Input
              label="Current Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          )}

          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />

          <DialogFooter>
            <Button
              type="submit"
              className="w-full py-2 transition-all rounded-xl bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Change Password
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
