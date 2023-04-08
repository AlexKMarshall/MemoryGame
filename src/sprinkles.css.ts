import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

const space = {
  0: 0,
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
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
  },
});

export const sprinkles = createSprinkles(responsiveProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
