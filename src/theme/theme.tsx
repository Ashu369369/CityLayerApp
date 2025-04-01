import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6FBBB1", // Highlight color
    accent: "#A7D7D1", // Light highlight
    white: "#EAEAEA", // Primary background
    grey: "#D4D4D4", // Secondary background for cards/containers
    text: "#333333", // Primary text color for readability
    disabled: "#C0C0C0", // Disabled state color
    placeholder: "#A0A0A0", // Input placeholder text
    backdrop: "#000000", // Backdrop overlay
  },
  fonts: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
};

export default theme;