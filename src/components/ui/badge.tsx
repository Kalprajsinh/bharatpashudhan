import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "secondary";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
  const base = "inline-block px-2 py-0.5 rounded text-xs font-semibold ";
  const variants: Record<string, string> = {
      default: "bg-blue-100 text-blue-800 border border-blue-200",
      outline: "bg-white text-blue-600 border border-blue-600",
      secondary: "bg-gray-100 text-gray-800 border border-gray-300",
    };
    return (
      <span ref={ref} className={base + variants[variant] + " " + className} {...props} />
    );
  }
);
Badge.displayName = "Badge";
