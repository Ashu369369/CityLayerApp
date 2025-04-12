import { StyleSheet } from "react-native";
import { DynamicTheme } from "../theme/theme";
const useStyles = (theme: DynamicTheme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: theme.colors.background, // Use theme background
    },
    imageBackground: {
      width: "100%",
      minHeight: 200, // Ensures a minimum height
      maxHeight: "auto", // Expands dynamically
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    overlay: {
      flexGrow: 1,
      width: "100%",
      justifyContent: "flex-end",
      paddingBottom: 20,
      // backgroundColor: "rgba(0, 0, 0, 0.3)", // Subtle overlay effect
    },
    title: {
      marginTop: 100,
      padding: 20,
      fontSize: 28,
      fontWeight: "bold",
      color: theme.colors.white, // Use theme text color
      textAlign: "center",
      fontFamily: theme.fonts.medium.fontFamily,
    },
    content: {
      backgroundColor: theme.colors.background, // Use theme surface color
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      marginTop: -20,
    },
    descContainer: {
      width: "100%",
      alignItems: "flex-start",
      paddingHorizontal: 20,
      marginTop: 10,
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      color: theme.colors.background, // Use theme text color
      textAlign: "left",
      lineHeight: 22,
      marginTop: 50,
      marginBottom: 30,
      fontFamily: theme.fonts.regular.fontFamily,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: theme.colors.backdrop, // Use theme primary color
      paddingVertical: 0,
    },
    button: {
      flexGrow: 1,
      backgroundColor: theme.colors.grey, // Use theme text color
      borderRadius: 0,
    },
    focusedButton: {
      backgroundColor: theme.colors.primary, // Use primary color for focused state
    },
    buttonText: {
      color: theme.colors.text, // Use theme text color
      fontSize: 16,
      fontWeight: "bold",
      fontFamily: theme.fonts.medium.fontFamily,
    },
    announcements: {
      padding: 20,
    },
    announcementText: {
      fontSize: 16,
      color: theme.colors.text,
      fontFamily: theme.fonts.light.fontFamily,
    },
    projectItem: {
      margin: 20,
      padding: 20,
      paddingTop: 25,
      paddingBottom: 35,
      borderBottomWidth: 0,
      backgroundColor: theme.colors.backdrop,
      borderRadius: 8,
      marginVertical: 5,
      borderColor: theme.colors.white,
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      shadowColor: theme.colors.backdrop,
    },
    projectTitle: {
      fontWeight: "bold",
      color: theme.colors.primary,
      fontFamily: theme.fonts.medium.fontFamily,
      fontSize: theme.fonts.medium.fontSize,
    },
    projectDescription: {
      fontSize: theme.fonts.light.fontSize,
      fontFamily: theme.fonts.light.fontFamily,
      color: theme.colors.surface,
    },
    statusLabel: {
      color: theme.colors.white,
    },
    sortFilterBar: {
      flexDirection: "row",
      justifyContent: "flex-end",
      backgroundColor: theme.colors.grey,
    },
    sortByList:{
      top: -25,
      borderRadius: 5,
      backgroundColor: theme.colors.backdrop,
      borderWidth: 1,
      borderColor: theme.colors.accent,
    },
    soryByListItem:{
      color: theme.colors.surface
    },
    CardsContainer: {
      backgroundColor: theme.colors.grey,
    },
    projectCard: {
      marginHorizontal: 10,
      marginVertical: 5,
      padding: 15,
      // paddingBottom: 30,
      borderRadius: 10,
      backgroundColor: theme.colors.grey,
      tintColor: "#ffffff",
    },
    emptyCard: {
      margin: 20,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      backgroundColor: theme.colors.surface,
    },
  });

export default useStyles;
