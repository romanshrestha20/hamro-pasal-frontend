"use client";

import { useState, useCallback } from "react";
import type { ValidationSchema, ValidationRule } from "@/lib/validation/formSchema";

type FormErrors<T> = Partial<Record<keyof T, string>>;

/**
 * Reusable form validation hook
 * @param schema - Validation rules for form fields
 * @param onValidate - Optional custom validation function
 */
export function useFormValidation<T extends Record<string, any>>(
    schema: ValidationSchema,
    onValidate?: (formData: T) => FormErrors<T> | Promise<FormErrors<T>>
) {
    const [errors, setErrors] = useState<FormErrors<T>>({});

    // Validate a single field
    const validateField = useCallback(
        (fieldName: string, value: any): string | null => {
            const rule = schema[fieldName];
            if (!rule) return null;

            // Check required
            if (rule.required && (!value || value.trim() === "")) {
                return rule.required;
            }

            if (!value) return null; // Skip other validations if empty and not required

            // Check minLength
            if (rule.minLength && value.length < rule.minLength.value) {
                return rule.minLength.message;
            }

            // Check maxLength
            if (rule.maxLength && value.length > rule.maxLength.value) {
                return rule.maxLength.message;
            }

            // Check pattern
            if (rule.pattern && !rule.pattern.value.test(value)) {
                return rule.pattern.message;
            }

            // Custom validation
            if (rule.custom) {
                const error = rule.custom(value);
                if (error) return error;
            }

            return null;
        },
        [schema]
    );

    // Validate entire form
    const validateForm = useCallback(
        async (formData: T): Promise<FormErrors<T>> => {
            const newErrors: FormErrors<T> = {};

            // Validate each field
            Object.keys(schema).forEach((fieldName) => {
                const value = formData[fieldName as keyof T];
                const error = validateField(fieldName, value);
                if (error) {
                    newErrors[fieldName as keyof T] = error;
                }
            });

            // Run custom validation if provided
            if (onValidate && Object.keys(newErrors).length === 0) {
                const customErrors = await onValidate(formData);
                Object.assign(newErrors, customErrors);
            }

            setErrors(newErrors);
            return newErrors;
        },
        [schema, validateField, onValidate]
    );

    // Clear errors
    const clearErrors = useCallback(() => {
        setErrors({});
    }, []);

    // Clear single field error
    const clearFieldError = useCallback((fieldName: keyof T) => {
        setErrors((prev) => {
            const updated = { ...prev };
            delete updated[fieldName];
            return updated;
        });
    }, []);

    return {
        errors,
        setErrors,
        validateField,
        validateForm,
        clearErrors,
        clearFieldError,
        isValid: Object.keys(errors).length === 0,
    };
}
