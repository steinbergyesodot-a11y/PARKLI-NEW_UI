import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { Link, type LinkProps } from "react-router";

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
    const className = `${variant === "default" ? "px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700" : ""} transition ${customClassName ?? ""}`;
    return (
      <Link {...linkProps} to={to} onClick={onClick} className={className}>
        {children}
      </Link>
    );
  }

  const { children, ...buttonProps } = props;
  const className = `px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition ${buttonProps.className ?? ""}`;
  return (
    <button {...buttonProps} className={className}>
      {children}
    </button>
  );
}

export default Button;