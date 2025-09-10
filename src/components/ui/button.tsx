import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    let base = "px-4 py-2 rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ";
    let variants: Record<string, string> = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-blue-600 text-blue-600 bg-white hover:bg-blue-50",
      ghost: "bg-transparent text-blue-600 hover:bg-blue-50",
      secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    };
    return (
      <button ref={ref} className={base + variants[variant] + " " + className} {...props} />
    );
  }
);
Button.displayName = "Button";
