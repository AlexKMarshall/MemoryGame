import * as styles from "./Stack.css";
import { sprinkles, Sprinkles } from "../sprinkles.css";
import clsx from "clsx";

type StackElement = "div" | "dl" | "fieldset";

export type StackProps = {
  as?: StackElement;
  gap?: Sprinkles["gap"];
  align?: Sprinkles["alignItems"];
  children: React.ReactNode;
};

export function Stack({ as = "div", children, gap = 4, align }: StackProps) {
  const Element = as;
  return (
    <Element
      className={clsx(styles.Stack, sprinkles({ gap, alignItems: align }))}
    >
      {children}
    </Element>
  );
}
