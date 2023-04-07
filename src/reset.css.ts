import { globalStyle } from "@vanilla-extract/css";

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("*", {
  margin: 0,
});

globalStyle("html, body, #root", {
  height: "100%",
});

globalStyle("body", {
  lineHeight: 1.5,
  WebkitFontSmoothing: "antialiased",
});

globalStyle("ol, ul", {
  listStyle: "none",
  padding: 0,
});

globalStyle("img, picture, video, canvas, svg", {
  display: "block",
  maxWidth: "100%",
});

globalStyle("input, button, textarea, select", {
  font: "inherit",
});

globalStyle("p, h1, h2, h3, h4, h5, h6", {
  overflowWrap: "break-word",
});

globalStyle("#root", {
  isolation: "isolate",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle("fieldset", {
  margin: 0,
  padding: 0,
  border: "none",
});

globalStyle("legend", {
  padding: 0,
});
