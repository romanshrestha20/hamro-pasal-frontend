"use client";

import { ReactNode } from "react";

export const AuthForm = ({ children }: { children: ReactNode }) => (
  <form className="flex flex-col gap-4">{children}</form>
);
