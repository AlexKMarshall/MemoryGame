import { ButtonHTMLAttributes } from "react";
import * as styles from "./Button.css";
import type { ButtonVariants } from "./Button.css";

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> &
  ButtonVariants;

function Button({ size, color, ...props }: ButtonProps) {
  return <button {...props} className={styles.Button({ size, color })} />;
}
