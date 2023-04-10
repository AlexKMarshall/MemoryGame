import { style } from "@vanilla-extract/css";

export const dialogOverlay = style({
  backgroundColor: "hsl(0deg 0% 0% / 0.5)",
  position: "fixed",
  inset: 0,
});

export const dialogPositioner = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  padding: "1.5rem",
  inset: 0,
  "@media": {
    "screen and (min-width: 768px)": {
      padding: "3.5rem",
    },
  },
});

export const DialogContent = style({
  flexBasis: "42rem",
  marginInline: "auto",
  padding: "1.5rem",
  backgroundColor: "hsl(0deg 0% 99%)",
  borderRadius: 10,
  "@media": {
    "screen and (min-width: 768px)": {
      padding: "3.5rem",
      borderRadius: 20,
    },
  },
});

export const DialogTitle = style({
  fontSize: "1.5rem",
  lineHeight: 1.25,
  color: "hsl(206deg 45% 15%)",
  "@media": {
    "screen and (min-width: 768px)": {
      fontSize: "3rem",
    },
  },
});

export const DialogSubtitle = style({
  fontSize: "0.875rem",
  color: "hsl(203deg 22% 55%)",
  "@media": {
    "screen and (min-width: 768px)": {
      fontSize: "1.125rem",
    },
  },
});
