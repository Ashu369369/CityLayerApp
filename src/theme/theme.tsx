import { MD3LightTheme as DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6FBBB1", // Highlight color
    accent: "#A7D7D1", // Light highlight
    white: "#EAEAEA", // Primary background
    grey: "#EDEDED", // Secondary background for cards/containers
    text: "#333333", // Primary text color for readability
    disabled: "#C0C0C0", // Disabled state color
    placeholder: "#A0A0A0", // Input placeholder text
    backdrop: "#1e1e1e", // Backdrop overlay
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: "sans-serif",
      fontWeight: "normal",
      fontSize: 16, // Default font size for regular text
    },
    medium: {
      fontFamily: "sans-serif-medium",
      fontWeight: "normal",
      fontSize: 18, // Font size for medium text
    },
    light: {
      fontFamily: "sans-serif-light",
      fontWeight: "normal",
      fontSize: 14, // Font size for light text
    },
    thin: {
      fontFamily: "sans-serif-thin",
      fontWeight: "normal",
      fontSize: 12, // Font size for thin text
    },
    large: {
      fontFamily: "sans-serif-medium",
      fontWeight: "bold",
      fontSize: 24, // Font size for large text
    },
    xlarge: {
      fontFamily: "sans-serif-medium",
      fontWeight: "bold",
      fontSize: 44, // Font size for large text
    },
    small: {
      fontFamily: "sans-serif",
      fontWeight: "normal",
      fontSize: 12, // Font size for small text
    },
  },
};

export default theme;
