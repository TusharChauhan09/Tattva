// FitAI Typography System
import { TextStyle } from "react-native";

export const Typography: Record<string, TextStyle> = {
  // Headings
  h1: {
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -0.5,
    lineHeight: 42,
  },
  h2: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.3,
    lineHeight: 36,
  },
  h3: {
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 30,
  },

  // Body
  bodyLarge: {
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 26,
  },
  body: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 18,
  },

  // Labels
  label: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
  },
  labelSmall: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  // Button
  button: {
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.3,
    lineHeight: 22,
  },
  buttonSmall: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.2,
    lineHeight: 18,
  },

  // Logo
  logo: {
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: -1,
  },

  // Caption
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
};
