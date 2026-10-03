import type { HTMLAttributes } from "react";

// --- Base Card Container ---
export type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      {...props}
      className={`h-25 rounded-lg border border-slate-200 shadow-sm ${className}`}
    />
  );
}

// --- Card Header ---
export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

export function CardHeader({ className = "", ...props }: CardHeaderProps) {
  return (
    <div
      {...props}
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
    />
  );
}

// --- Card Title (h3 element) ---
export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;

export function CardTitle({ className = "", ...props }: CardTitleProps) {
  return (
    <h3
      {...props}
      className={`text-2xl font-bold leading-none tracking-tight text-slate-900 ${className}`}
    />
  );
}

// --- Card Description (Paragraph) ---
export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export function CardDescription({ className = "", ...props }: CardDescriptionProps) {
  return (
    <p
      {...props}
      className={`text-sm text-slate-500 ${className}`}
    />
  );
}

// --- Card Content Body ---
export type CardContentProps = HTMLAttributes<HTMLDivElement>;

export function CardContent({ className = "", ...props }: CardContentProps) {
  return (
    <div
      {...props}
      className={`p-6 pt-0 ${className}`}
    />
  );
}

// --- Card Footer ---
export type CardFooterProps = HTMLAttributes<HTMLDivElement>;

export function CardFooter({ className = "", ...props }: CardFooterProps) {
  return (
    <div
      {...props}
      className={`flex items-center p-6 pt-0 ${className}`}
    />
  );
}