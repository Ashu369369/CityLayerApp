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

  // Return the modified theme
  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,

      // In high contrast, use stark, pure colors for maximal difference
      primary: highContrast ? "#000000" : "#6FBBB1", // High contrast primary is pure black
      accent: highContrast ? "#FF4500" : "#A7D7D1", // Use a bold OrangeRed in high contrast mode
      background: highContrast ? "#FFFFFF" : "#EAEAEA", // Keep background white in high contrast mode
      white: "#FFFFFF", // Always pure white
      grey: highContrast ? "#EEEEEE" : "#F7F7F7", // A very light grey for subtle divisions
      text: highContrast ? "#000000" : "#333333", // Text is pure black in high contrast
      disabled: highContrast ? "#CCCCCC" : "#C0C0C0", // A noticeable light gray for disabled elements
      placeholder: highContrast ? "#AAAAAA" : "#A0A0A0", // Distinct mid-grey for placeholders
      backdrop: highContrast ? "#222222" : "#1e1e1e", // A very dark shade for backdrops in high contrast
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
