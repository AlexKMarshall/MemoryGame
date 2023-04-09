import { ButtonHTMLAttributes, ComponentProps, forwardRef } from "react";
import * as styles from "./Button.css";
import type { ButtonVariants } from "./Button.css";
import { Link } from "react-router-dom";

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> &
  ButtonVariants;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ size, color, ...props }, ref) {
    return (
      <button {...props} className={styles.Button({ size, color })} ref={ref} />
    );
  }
);

type LinkProps = ComponentProps<typeof Link>;

export type ButtonLinkProps = Omit<LinkProps, "className"> & ButtonVariants;

/**
 * A Link with button styles
 */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function ButtonLink({ size, color, ...props }, ref) {
    return (
      <Link {...props} className={styles.Button({ size, color })} ref={ref} />
    );
  }
);
