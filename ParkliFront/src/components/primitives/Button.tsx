import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { Link, type LinkProps } from "react-router";
import { cn } from "../../lib/utils";

type ButtonProps =
  | ({
      to: LinkProps["to"];
      children: ReactNode;
      className?: string;
      onClick?: MouseEventHandler<HTMLAnchorElement>;
      variant?: "default" | "ghost";
    } & Omit<LinkProps, "to" | "children" | "className" | "onClick">)
  | ({ to?: never } & ButtonHTMLAttributes<HTMLButtonElement>);

function Button(props: ButtonProps) {
  if ("to" in props && props.to !== undefined) {
    const { to, children, onClick, variant = "default", className: customClassName, ...linkProps } = props;
    const className = cn(
      variant === "default" && "px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover",
      "transition",
      customClassName
    );
    return (
      <Link {...linkProps} to={to} onClick={onClick} className={className}>
        {children}
      </Link>
    );
  }

  const { children, className: customClassName, ...buttonProps } = props;
  const className = cn(
    "px-4 py-2 rounded-lg bg-primary text-white shadow transition hover:bg-primary-hover",
    customClassName
  );
  return (
    <button {...buttonProps} className={className}>
      {children}
    </button>
  );
}

export default Button;