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
