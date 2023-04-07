import { style } from "@vanilla-extract/css";
import { buttonBase, buttonPrimary, stack12, stack32 } from "./Home.css";

export const main = style({
  padding: "1.5rem",
  minHeight: "100%",
  backgroundColor: "hsl(206deg 45% 15%)",
  display: "grid",
  gridTemplateRows: "1fr auto 1fr",
  alignItems: "center",
});

export const heading = style({
  fontSize: "2rem",
  color: "hsl(0deg 0% 99%)",
  textAlign: "center",
});

export const form = style([
  stack32,
  {
    padding: "1.5rem",
    backgroundColor: "hsl(0deg 0% 99%)",
    borderRadius: 10,
  },
]);

export const fieldset = stack12;

export const legend = style({
  color: "hsl(203deg 22% 55%)",
});

export const radioGroup = style({
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "1fr",
  gap: "0.75rem",
});

export const radio = style([
  buttonBase,
  {
    backgroundColor: "hsl(203deg 28% 79%)",
    color: "hsl(0deg 0% 99%)",

    selectors: {
      ":checked + &": {
        backgroundColor: "hsl(205deg 30% 27%)",
      },
    },
  },
]);

export const submitButton = buttonPrimary;
