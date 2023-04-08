import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

export const space = {
  0: 0,
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  10: "2.5rem",
};

export const fontSize = {
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "2rem",
  "4xl": "2.5rem",
  "5xl": "2.75rem",
  "6xl": "3rem",
  "7xl": "3.5rem",
};

export const borderRadius = {
  sm: 5,
  md: 10,
  lg: 20,
  full: 999,
};

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
  },
  defaultCondition: "mobile",
  properties: {
    gap: space,
    alignItems: ["center"],
    fontSize,
    borderRadius,
    padding: space,
    paddingBlock: space,
    paddingInline: space,
  },
});

export const sprinkles = createSprinkles(responsiveProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
