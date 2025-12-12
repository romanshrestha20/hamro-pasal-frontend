"use client";

import { Check, MapPin, CreditCard, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface CheckoutStepperProps {
  currentStep: number;
}

const stepIcons = [MapPin, CreditCard, FileText];

export default function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const steps = ["Address", "Payment", "Review"];

  const progressValue = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full py-6">
      <div className="relative flex items-center justify-between">

        {/* Background Progress Line (Behind steps) */}
        <div className="absolute left-0 z-0 w-full -translate-y-1/2 top-1/2">
          <Progress value={progressValue} className="h-[3px]" />
        </div>

        {steps.map((label, index) => {
          const stepNum = index + 1;
          const isCompleted = currentStep > stepNum;
          const isActive = currentStep === stepNum;
          const Icon = stepIcons[index];

          return (
            <div key={label} className="relative z-10 flex flex-col items-center flex-1">
              <div
                className={`
                  w-12 h-12 flex items-center justify-center rounded-full border-2 
                  text-sm font-semibold transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : isActive
                      ? "border-primary text-primary bg-card shadow-md"
                      : "border-muted-foreground text-muted-foreground bg-card"
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>

              <span
                className={`mt-2 text-sm font-medium transition-colors
                ${isActive ? "text-primary" : "text-muted-foreground"}
              `}
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
