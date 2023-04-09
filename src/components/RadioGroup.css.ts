import { style } from "@vanilla-extract/css";
import { sprinkles } from "../sprinkles.css";

export const RadioGroupLabel = style([
  sprinkles({ fontSize: { mobile: "base", tablet: "xl" } }),
  {
    color: "hsl(203deg 22% 55%)",
  },
]);

// TODO: Could be a Switcher?
export const RadioGroupControls = style({
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "1fr",
  gap: "0.75rem",
  "@media": {
    "screen and (min-width: 768px)": {
      gap: "2rem",
    },
  },
});

// TODO: add focus and hover styles
// These styles are mostly a copy of the Button secondary, regular sizer styles
export const RadioButton = style([
  sprinkles({
    paddingBlock: { mobile: 3, tablet: 4 },
    paddingInline: { mobile: 5, tablet: 7 },
    borderRadius: "full",
    fontSize: { mobile: "base", tablet: "2xl" },
  }),
  {
    display: "grid",
    placeContent: "center",
    // TODO: extract color theme
    backgroundColor: "hsl(203deg 28% 79%)",
    color: "hsl(0deg 0% 99%)",

    selectors: {
      ":checked + &": {
        backgroundColor: "hsl(205deg 30% 27%)",
      },
    },
  },
]);
