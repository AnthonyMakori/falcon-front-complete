import { cn } from "../../lib/utils";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "secondary" | "outline" | "success" | "destructive";
}

export const Badge = ({ children, variant }: BadgeProps) => {
  const baseStyle = "px-2 py-1 text-sm font-medium rounded-md";
  const variants = {
    secondary: "bg-gray-200 text-gray-800",
    outline: "border border-gray-400 text-gray-600",
    success: "bg-green-200 text-green-800",
    destructive: "bg-red-200 text-red-800",
  };
  
  return <span className={cn(baseStyle, variants[variant || "secondary"])}>{children}</span>;
};
