import { style, styleVariants } from "@vanilla-extract/css";

export const main = style({
  padding: "1.5rem",
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: "hsl(0deg 0% 99%)",
});

export const heading = style({
  fontSize: "1.5rem",
});

export const cardGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "0.75rem",
});

const cardButtonBase = style({
  display: "grid",
  placeContent: "center",
  minWidth: "4.5rem",
  aspectRatio: "1 / 1",
  borderRadius: "50%",
  border: "none",
  fontSize: "2.5rem",
  outlineOffset: "0.25rem",
  outlineColor: "hsl(205deg 30% 27%)",
});

export const cardButton = styleVariants({
  faceDown: [
    cardButtonBase,
    {
      backgroundColor: "hsl(205deg 30% 27%)",
    },
  ],
  faceUp: [
    cardButtonBase,
    {
      backgroundColor: "hsl(37deg 98% 54%)",
      color: "white",
    },
  ],
  matched: [
    cardButtonBase,
    {
      backgroundColor: "hsl(203deg 28% 79%)",
      color: "white",
    },
  ],
});

export const metadataSection = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "1.5rem",
});

export const greyBox = style({
  padding: "0.75rem",
  backgroundColor: "hsl(203deg 25% 90%)",
  borderRadius: 5,
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
});

export const metadataHeading = style({
  fontSize: "1rem",
  color: "hsl(203deg 23% 54%)",
});

export const metadataValue = style({
  fontSize: "1.5rem",
  color: "hsl(205deg 30% 27%)",
});

export const dialogOverlay = style({
  backgroundColor: "hsl(0deg 0% 0% / 0.5)",
  position: "fixed",
  inset: 0,
});

export const dialogPositioner = style({
  display: "grid",
  alignContent: "center",
  position: "fixed",
  padding: "1.5rem",
  inset: 0,
});

const stackBase = style({
  display: "flex",
  flexDirection: "column",
});

export const stack8 = style([
  stackBase,
  {
    gap: "0.5rem",
  },
]);

export const stack16 = style([
  stackBase,
  {
    gap: "1rem",
  },
]);

export const stack24 = style([
  stackBase,
  {
    gap: "1.5rem",
  },
]);

export const dialogContent = style([
  {
    padding: "1.5rem",
    backgroundColor: "hsl(0deg 0% 99%)",
    borderRadius: 10,
  },
  stack24,
]);

export const dialogHeader = style([
  stack8,
  {
    alignItems: "center",
  },
]);

export const dialogHeading = style({
  fontSize: "1.5rem",
  color: "hsl(206deg 45% 15%)",
});

export const dialogSubheading = style({
  fontSize: "0.875rem",
  color: "hsl(203deg 22% 55%)",
});

export const gameScoreItem = style({
  padding: "1rem",
  backgroundColor: "hsl(203deg 25% 90%)",
  borderRadius: 5,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const gameScoreDt = style({
  fontSize: "0.875rem",
  color: "hsl(203deg 22% 55%)",
});

export const gameScoreDd = style({
  fontSize: "1.25rem",
  color: "hsl(205deg 30% 27%)",
});

const buttonBase = style({
  paddingBlock: "0.75rem",
  paddingInline: "1.75rem",
  border: "none",
  borderRadius: 999,
  display: "flex",
  justifyContent: "center",
});

export const buttonPrimary = style([
  buttonBase,
  {
    backgroundColor: "hsl(37deg 98% 54%)",
    color: "hsl(0deg 0% 99%)",
  },
]);

export const buttonSecondary = style([
  buttonBase,
  {
    backgroundColor: "hsl(203deg 25% 90%)",
    color: "hsl(205deg 30% 27%)",
  },
]);
