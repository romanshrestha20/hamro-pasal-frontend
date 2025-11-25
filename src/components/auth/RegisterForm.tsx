"use client";
import { useAuth } from "@/hooks/useAuth";
import { ChangeEvent, useState } from "react";
import { Input } from "../ui/Input";
import { AuthForm } from "./AuthForm";
import { Button } from "../ui/Button";
import { FormError } from "../ui/FormError";
import { GoogleSignButton } from "./GoogleSignButton";

export const RegisterForm = () => {
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationError(null);
  };

  const validateForm = (): boolean => {
    if (
      !formData.email ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.password
    ) {
      setValidationError("All fields are required");
      return false;
    }

    if (formData.password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    await register({
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: formData.password,
    });
  };

  const displayError = validationError || error;

  return (
    <AuthForm>
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="First Name"
          name="firstName"
          type="text"
          placeholder="John"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Doe"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        placeholder="••••••••"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      <FormError message={displayError ?? undefined} />

      <Button type="submit" onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating Account..." : "Create Account"}
      </Button>

      <div className="relative flex items-center justify-center my-4">
        <div className="flex-grow mx-2 border-t border-border" />
        <span className="text-sm text-muted-foreground">or</span>
        <div className="flex-grow mx-2 border-t border-border" />
      </div>

      <GoogleSignButton />
    </AuthForm>
  );
};
