"use client";

import { Check } from "lucide-react";

interface CheckoutStepperProps {
  currentStep: number; // Renamed for clarity (1-based index)
  steps?: string[];
}

export default function CheckoutStepper({
  currentStep,
  steps = ["Address", "Payment", "Review"],
}: CheckoutStepperProps) {
  return (
    <div className="w-full py-4">
      <div className="relative flex items-center justify-between">
        {/* Background Line */}
        <div className="absolute left-0 w-full h-1 transform -translate-y-1/2 bg-gray-200 top-1/2 -z-10" />

        {/* Active Line (Calculated width based on progress) */}
        <div
          className="absolute left-0 h-1 transition-all duration-300 transform -translate-y-1/2 bg-blue-600 top-1/2 -z-10"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((label, index) => {
          const stepNum = index + 1;
          const isCompleted = currentStep > stepNum;
          const isActive = currentStep === stepNum;

          return (
            <div key={label} className="flex flex-col items-center">
              {/* Step Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors duration-300 bg-white
                ${
                  isActive || isCompleted
                    ? "border-blue-600 text-blue-600"
                    : "border-gray-300 text-gray-400"
                }
                ${isCompleted ? "bg-blue-600 !text-white border-blue-600" : ""}
                `}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{stepNum}</span>
                )}
              </div>

              {/* Label */}
              <span
                className={`mt-2 text-sm font-medium ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
