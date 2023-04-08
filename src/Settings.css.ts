import { globalStyle, style } from "@vanilla-extract/css";

export const main = style({
  padding: "1.5rem",
  minHeight: "100%",
  backgroundColor: "hsl(206deg 45% 15%)",
  display: "grid",
  gridTemplateColumns: "1fr minmax(auto, 42rem) 1fr",
  gridTemplateRows: "1fr auto 1fr",
  alignItems: "center",
  "@media": {
    "screen and (min-width: 768px)": {
      padding: "3rem",
    },
  },
});

globalStyle(`${main} > *`, {
  gridColumn: "2 / 3",
});

export const heading = style({
  fontSize: "2rem",
  color: "hsl(0deg 0% 99%)",
  textAlign: "center",
  "@media": {
    "screen and (min-width: 768px)": {
      fontSize: "2.5rem",
    },
  },
});

export const form = style([
  {
    flexBasis: "42rem",
    padding: "1.5rem",
    backgroundColor: "hsl(0deg 0% 99%)",
    borderRadius: 10,
    "@media": {
      "screen and (min-width: 768px)": {
        padding: "3.5rem",
        borderRadius: 20,
      },
    },
  },
]);

// export const legend = style({
//   color: "hsl(203deg 22% 55%)",
//   "@media": {
//     "screen and (min-width: 768px)": {
//       fontSize: "1.25rem",
//     },
//   },
// });

// // Could be a Switcher?
// export const radioGroup = style({
//   display: "grid",
//   gridAutoFlow: "column",
//   gridAutoColumns: "1fr",
//   gap: "0.75rem",
//   "@media": {
//     "screen and (min-width: 768px)": {
//       gap: "2rem",
//     },
//   },
// });
