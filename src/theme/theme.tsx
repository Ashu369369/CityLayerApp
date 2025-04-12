import { MD3LightTheme as DefaultTheme } from "react-native-paper";

/**
 * Dynamically creates a theme based on the user's font-size preference
 * and whether high-contrast mode is enabled.
 */
const getDynamicTheme = (
  fontSize: "small" | "medium" | "large",
  highContrast: boolean
) => {
  // Define font sizes based on selected preference
  const fontSizes = {
    small: 12,
    medium: 16,
    large: 20,
  };

  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      // In default mode, use your usual colors.
      // In high contrast mode: use a dark background and light text.
      primary: highContrast ? "#6FBBB1" : "#4D9A90",
      accent: highContrast ? "#FF4500" : "#A7D7D1",
      background: highContrast ? "#000000" : "#EAEAEA",
      white: "#FFFFFF",
      grey: highContrast ? "#333333" : "#F7F7F7",
      button: highContrast ? "#333333" : "#FFFFFF",
      buttonText: highContrast ? "#FFFFFF" : "#4D9A90",
      text: highContrast ? "#FFFFFF" : "#333333",
      oppositeText: highContrast ? "#333333" : "#FFFFFF",
      // Use a lighter color for the text in high contrast mode
      disabled: highContrast ? "#AAAAAA" : "#C0C0C0",
      placeholder: highContrast ? "#CCCCCC" : "#A0A0A0",
      backdrop: highContrast ? "#111111" : "#1e1e1e",
      // For cards or surfaces, provide a slight variation in high-contrast mode
      surface: highContrast ? "#222222" : "#FFFFFF",

      card: highContrast ? "#444444" : "#FAFAFA", // Card background: darker in high contrast
      header: highContrast ? "#6FBBB1" : "#4D9A90", // Header background or accent; can be customized
      footer: highContrast ? "#222222" : "#DDDDDD", // Footer background
      error: highContrast ? "#FF5555" : "#D32F2F", // Error state
      warning: highContrast ? "#FFA500" : "#FBC02D", // Warning state
      success: highContrast ? "#66BB6A" : "#388E3C", // Success state
      info: highContrast ? "#29B6F6" : "#1976D2", // Informational state
      link: highContrast ? "#81D4FA" : "#1976D2",
    },
    fonts: {
      ...DefaultTheme.fonts,
      regular: {
        fontFamily: "sans-serif",
        fontWeight: "normal",
        fontSize: fontSizes[fontSize],
      },
      medium: {
        fontFamily: "sans-serif-medium",
        fontWeight: "normal",
        fontSize: fontSizes[fontSize] + 2,
      },
      light: {
        fontFamily: "sans-serif-light",
        fontWeight: "normal",
        fontSize: fontSizes[fontSize] - 2,
      },
      thin: {
        fontFamily: "sans-serif-thin",
        fontWeight: "normal",
        fontSize: fontSizes[fontSize] - 4,
      },
      large: {
        fontFamily: "sans-serif-medium",
        fontWeight: "bold",
        fontSize: fontSizes[fontSize] + 8,
      },
      xlarge: {
        fontFamily: "sans-serif-medium",
        fontWeight: "bold",
        fontSize: fontSizes[fontSize] + 20,
      },
    },
  };
};

export type DynamicTheme = ReturnType<typeof getDynamicTheme>;
export default getDynamicTheme;
