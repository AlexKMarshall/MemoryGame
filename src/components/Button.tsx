import { ButtonHTMLAttributes, ComponentProps } from "react";
import * as styles from "./Button.css";
import type { ButtonVariants } from "./Button.css";
import { Link } from "react-router-dom";

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> &
  ButtonVariants;

export function Button({ size, color, ...props }: ButtonProps) {
  return <button {...props} className={styles.Button({ size, color })} />;
}

type LinkProps = ComponentProps<typeof Link>;

export type ButtonLinkProps = Omit<LinkProps, "className"> & ButtonVariants;

/**
 * A Link with button styles
 */
export function ButtonLink({ size, color, ...props }: ButtonLinkProps) {
  return <Link {...props} className={styles.Button({ size, color })} />;
}
