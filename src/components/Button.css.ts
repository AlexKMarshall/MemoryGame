import { style } from "@vanilla-extract/css";
import { sprinkles } from "../sprinkles.css";
import { recipe, RecipeVariants } from "@vanilla-extract/recipes";

export const buttonBase = style([
  {
    border: "none",
    display: "grid",
    placeContent: "center",
    cursor: "pointer",
  },
  sprinkles({
    paddingBlock: { mobile: 3, tablet: 4 },
    paddingInline: { mobile: 5, tablet: 7 },
    borderRadius: "full",
  }),
]);

// TODO: add focus and hover states
export const Button = recipe({
  base: buttonBase,

  variants: {
    color: {
      primary: {
        backgroundColor: "hsl(37deg 98% 54%)",
        color: "hsl(0deg 0% 99%)",
      },
      secondary: {
        backgroundColor: "hsl(203deg 25% 90%)",
        color: "hsl(205deg 30% 27%)",
      },
    },
    size: {
      default: sprinkles({
        fontSize: { mobile: "base", tablet: "lg" },
      }),
      large: sprinkles({ fontSize: { mobile: "lg", tablet: "3xl" } }),
    },
  },

  defaultVariants: {
    color: "secondary",
    size: "default",
  },
});

export type ButtonVariants = RecipeVariants<typeof Button>;
