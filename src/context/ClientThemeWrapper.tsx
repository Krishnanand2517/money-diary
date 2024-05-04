"use client";

import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { ThemeContextType } from "@/types/ThemeContextTypes";

export default function ClientThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useContext(ThemeContext) as ThemeContextType;

  return <div data-theme={theme}>{children}</div>;
}
