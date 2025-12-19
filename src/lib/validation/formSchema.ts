// Reusable validation rules for common fields
export const validationRules = {
    firstName: {
        required: "First name is required",
        minLength: { value: 2, message: "First name must be at least 2 characters" },
    },
    lastName: {
        minLength: { value: 2, message: "Last name must be at least 2 characters" },
    },
    email: {
        required: "Email is required",
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address",
        },
    },
    password: {
        required: "Password is required",
        minLength: { value: 8, message: "Password must be at least 8 characters" },
    },
    phone: {
        pattern: {
            value: /^[\d\s\-\+\(\)]{7,}$/,
            message: "Please enter a valid phone number",
        },
    },
    address: {
        minLength: { value: 5, message: "Address must be at least 5 characters" },
    },
    postalCode: {
        minLength: { value: 3, message: "Postal code must be at least 3 characters" },
    },
} as const;

// Validation rule type
export type ValidationRule = {
    required?: string;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
    custom?: (value: string) => string | null;
};

export type ValidationSchema = Record<string, ValidationRule>;
