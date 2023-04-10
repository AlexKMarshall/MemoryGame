import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const main = style({
  padding: "1.5rem",
  height: "100%",
  backgroundColor: "hsl(0deg 0% 99%)",
  "@media": {
    "screen and (min-width: 768px)": {
      padding: "2.5rem",
    },
    "screen and (min-width: 1024px)": {
      padding: "4rem",
    },
  },
});

export const layout = style({
  boxSizing: "content-box",
  maxWidth: 1100,
  marginInline: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  justifyContent: "space-between",
  minHeight: "100%",
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const heading = style({
  fontSize: "1.5rem",
  "@media": {
    "screen and (min-width: 768px)": {
      fontSize: "2.5rem",
    },
  },
});

export const hideMobile = style({
  display: "none",
  "@media": {
    "screen and (min-width: 768px)": {
      display: "block",
    },
  },
});

export const hideTablet = style({
  display: "block",
  "@media": {
    "screen and (min-width: 768px)": {
      display: "none",
    },
  },
});

export const gameControls = style({
  display: "flex",
  gap: "1rem",
});

export const cardGrid = style({
  alignSelf: "center",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "0.75rem",
  justifyItems: "center",
  selectors: {
    '&[data-size="4"]': {
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "0.75rem",
      "@media": {
        "screen and (min-width: 768px)": {
          gap: "1.25rem",
        },
      },
    },
    '&[data-size="6"]': {
      gridTemplateColumns: "repeat(6, 1fr)",
      gap: "0.5rem",
      "@media": {
        "screen and (min-width: 768px)": {
          gap: "1rem",
        },
      },
    },
  },
});

const cardButtonBase = style({
  display: "grid",
  placeContent: "center",
  aspectRatio: "1 / 1",
  borderRadius: "50%",
  border: "none",
  outlineOffset: "0.25rem",
  outlineColor: "hsl(205deg 30% 27%)",
  selectors: {
    '[data-size="4"] &': {
      fontSize: "2.5rem",
      minWidth: "4.5rem",
      "@media": {
        "screen and (min-width: 768px)": {
          fontSize: "3.5rem",
          minWidth: "7rem",
        },
      },
    },
    '[data-size="6"] &': {
      fontSize: "1.5rem",
      minWidth: "3rem",
      "@media": {
        "screen and (min-width: 768px)": {
          fontSize: "2.75rem",
          minWidth: "5rem",
        },
      },
    },
  },
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
  display: "flex",
  justifyContent: "center",
  gap: "1.5rem",
  "@media": {
    "screen and (min-width: 768px)": {
      gap: "2rem",
    },
  },
});

export const playerIndicator = style({
  padding: "0.75rem",
  backgroundColor: "hsl(203deg 25% 90%)",
  borderRadius: 5,
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  flexBasis: "16rem",
  "@media": {
    "screen and (min-width: 768px)": {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingInline: "1.5rem",
      paddingBlock: "1.25rem",
    },
  },
  selectors: {
    '&[aria-current="step"]': {
      backgroundColor: "hsl(37deg 98% 54%)",
      color: "white",
    },
  },
});

export const playerNumber = style({
  fontSize: "1rem",
  color: "hsl(203deg 23% 54%)",
  "@media": {
    "screen and (min-width: 768px)": {
      fontSize: "1.125rem",
    },
  },
  selectors: {
    '[aria-current="step"] &': {
      color: "white",
    },
  },
});

export const playerScore = style({
  fontSize: "1.5rem",
  color: "hsl(205deg 30% 27%)",
  "@media": {
    "screen and (min-width: 768px)": {
      fontSize: "2rem",
    },
  },
  selectors: {
    '[aria-current="step"] &': {
      color: "white",
    },
  },
});

export const greyBox = style({
  padding: "0.75rem",
  backgroundColor: "hsl(203deg 25% 90%)",
  borderRadius: 5,
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  flexBasis: "16rem",
  "@media": {
    "screen and (min-width: 768px)": {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingInline: "1.5rem",
      paddingBlock: "1.25rem",
    },
  },
});

export const metadataHeading = style({
  fontSize: "1rem",
  color: "hsl(203deg 23% 54%)",
  "@media": {
    "screen and (min-width: 768px)": {
      fontSize: "1.125rem",
    },
  },
});

export const metadataValue = style({
  fontSize: "1.5rem",
  color: "hsl(205deg 30% 27%)",
  "@media": {
    "screen and (min-width: 768px)": {
      fontSize: "2rem",
    },
  },
});

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

export const dialogContent = style({
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

export const dialogHeading = style({
  fontSize: "1.5rem",
  lineHeight: 1.25,
  color: "hsl(206deg 45% 15%)",
  "@media": {
    "screen and (min-width: 768px)": {
      fontSize: "3rem",
    },
  },
});

export const dialogSubheading = style({
  fontSize: "0.875rem",
  color: "hsl(203deg 22% 55%)",
  "@media": {
    "screen and (min-width: 768px)": {
      fontSize: "1.125rem",
    },
  },
});

export const gameScoreItem = style({
  padding: "1rem",
  backgroundColor: "hsl(203deg 25% 90%)",
  borderRadius: 5,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "@media": {
    "screen and (min-width: 768px)": {
      paddingInline: "2rem",
      paddingBlock: "1rem",
      borderRadius: 10,
    },
  },
  selectors: {
    "&[data-inverted]": {
      backgroundColor: "hsl(206deg 45% 15%)",
      color: "hsl(0deg 0% 99%)",
    },
  },
});

export const gameScoreDt = style({
  fontSize: "0.875rem",
  color: "hsl(203deg 22% 55%)",
  "@media": {
    "screen and (min-width: 768px)": {
      fontSize: "1.125rem",
    },
  },
  selectors: {
    "[data-inverted] &": {
      color: "hsl(0deg 0% 99%)",
    },
  },
});

export const gameScoreDd = style({
  fontSize: "1.25rem",
  color: "hsl(205deg 30% 27%)",
  "@media": {
    "screen and (min-width: 768px)": {
      fontSize: "2rem",
    },
  },
  selectors: {
    "[data-inverted] &": {
      color: "hsl(0deg 0% 99%)",
    },
  },
});

export const gameCompleteActions = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  "@media": {
    "screen and (min-width: 768px)": {
      flexDirection: "row",
      gap: "0.75rem",
    },
  },
});

globalStyle(`${gameCompleteActions} > *`, {
  flex: 1,
});
