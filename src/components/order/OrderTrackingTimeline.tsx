"use client";

import { X, Package, Truck, CheckCircle } from "lucide-react";
import { OrderStatus } from "@/lib/types";
import styles from "./OrderTrackingTimeline.module.css";

const NORMAL_FLOW: OrderStatus[] = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
];

const STATUS_ICONS: Record<OrderStatus, React.ReactNode> = {
  PENDING: <Package className="w-4 h-4" />,
  PROCESSING: <Package className="w-4 h-4" />,
  SHIPPED: <Truck className="w-4 h-4" />,
  DELIVERED: <CheckCircle className="w-4 h-4" />,
  CANCELED: <X className="w-4 h-4" />,
};

interface OrderTrackingTimelineProps {
  status: OrderStatus;
  className?: string;
}

export default function OrderTrackingTimeline({
  status,
  className = "",
}: OrderTrackingTimelineProps) {
  const isCanceled = status === "CANCELED";
  const currentIndex = NORMAL_FLOW.indexOf(status);

  if (isCanceled) {
    return (
      <div className={`p-6 border rounded-lg bg-destructive/5 ${className}`}>
        <div className="flex items-center gap-3 text-destructive">
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
            <X className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">Order Canceled</h3>
            <p className="text-sm text-muted-foreground">
              This order has been canceled
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-6 ${className}`}>
      <div className="relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-muted -z-10" />
        <div
          className={styles.progressBar}
          style={{
            width: `${currentIndex >= 0 ? (currentIndex / (NORMAL_FLOW.length - 1)) * 100 : 0}%`,
          }}
        />

        {/* Steps */}
        <div className="flex justify-between">
          {NORMAL_FLOW.map((s, i) => {
            const isCompleted = currentIndex >= i;
            const isActive = currentIndex === i;

            return (
              <div key={s} className="flex flex-col items-center flex-1">
                <div
                  className={`
                    w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all
                    ${
                      isCompleted
                        ? "bg-primary border-primary text-white"
                        : "bg-background border-muted text-muted-foreground"
                    }
                    ${isActive ? "ring-4 ring-primary/20" : ""}
                  `}
                >
                  {isCompleted ? (
                    STATUS_ICONS[s]
                  ) : (
                    <span className="text-xs">{i + 1}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-medium text-center ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {s}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
