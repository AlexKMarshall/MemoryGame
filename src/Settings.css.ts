import { style } from "@vanilla-extract/css";

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

export const form = style({
  padding: "1.5rem",
  backgroundColor: "hsl(0deg 0% 99%)",
  borderRadius: 10,
});
