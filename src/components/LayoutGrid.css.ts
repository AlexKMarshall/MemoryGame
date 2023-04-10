import { globalStyle, style } from "@vanilla-extract/css";

// Empty class name to hang global styles off
export const LayoutGrid = style({});

globalStyle(`${LayoutGrid}[role='grid'] > [role='row']`, {
  display: "contents",
});
