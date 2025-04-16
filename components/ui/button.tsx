// components/ui/button.tsx
import { cn } from "../../lib/utils"; 
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost";
  size?: "small" | "medium" | "large"; // Add size to the ButtonProps interface
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "medium", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-4 py-2 rounded-lg font-semibold transition-all",
          variant === "outline" && "border border-gray-300",
          variant === "secondary" && "bg-gray-200",
          variant === "destructive" && "bg-red-500 text-white",
          variant === "ghost" && "bg-transparent text-gray-600",
          size === "small" && "text-sm py-1 px-3", // Small size
          size === "large" && "text-lg py-3 px-6", // Large size
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button };
