import * as React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement>;
export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className = "", ...props }, ref) => (
  <div ref={ref} className={"rounded-xl shadow border border-gray-200 bg-white " + className} {...props} />
));
Card.displayName = "Card";

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className = "", ...props }, ref) => (
  <div ref={ref} className={"px-6 py-4 border-b border-gray-100 " + className} {...props} />
));
CardHeader.displayName = "CardHeader";

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(({ className = "", ...props }, ref) => (
  <h3 ref={ref} className={"text-lg font-bold " + className} {...props} />
));
CardTitle.displayName = "CardTitle";

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className = "", ...props }, ref) => (
  <div ref={ref} className={"px-6 py-4 " + className} {...props} />
));
CardContent.displayName = "CardContent";
