import { MD3LightTheme as DefaultTheme } from "react-native-paper";

const getDynamicTheme = (fontSize: "small" | "medium" | "large", highContrast: boolean) => {
  // Define font sizes based on the selected preference
  const fontSizes = {
    small: 12,
    medium: 16,
    large: 20,
  };

  // Return the dynamically modified theme
  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: highContrast ? "#000000" : "#6FBBB1", 
      accent: highContrast ? "#FFFFFF" : "#A7D7D1", 
      background: highContrast ? "#FFFFFF" : "#EAEAEA", 
      white: highContrast ? "#fffff": "#eaeaea",
      grey: highContrast ? "#fffff": "#eaeaea",
      text: highContrast ? "#000000" : "#333333", 
      disabled: highContrast ? "#808080" : "#C0C0C0", 
      placeholder: highContrast ? "#606060" : "#A0A0A0", 
      backdrop: highContrast ? "#000000" : "#1e1e1e", 
    },
    fonts: {
      ...DefaultTheme.fonts,
      regular: {
        fontFamily: "sans-serif",
        fontWeight: "normal",
        fontSize: fontSizes[fontSize], // Use dynamic font size
      },
      medium: {
        fontFamily: "sans-serif-medium",
        fontWeight: "normal",
        fontSize: fontSizes[fontSize] + 2, // Slightly larger for medium
      },
      light: {
        fontFamily: "sans-serif-light",
        fontWeight: "normal",
        fontSize: fontSizes[fontSize] - 2, // Slightly smaller for light
      },
      thin: {
        fontFamily: "sans-serif-thin",
        fontWeight: "normal",
        fontSize: fontSizes[fontSize] - 4, // Smallest for thin
      },
      large: {
        fontFamily: "sans-serif-medium",
        fontWeight: "bold",
        fontSize: fontSizes[fontSize] + 8, // Larger for large text
      },
      xlarge: {
        fontFamily: "sans-serif-medium",
        fontWeight: "bold",
        fontSize: fontSizes[fontSize] + 20, // Extra large for headings
      },
    },
  };
};

export type DynamicTheme = ReturnType<typeof getDynamicTheme>;


export default getDynamicTheme;