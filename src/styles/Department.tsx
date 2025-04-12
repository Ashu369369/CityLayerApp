import { StyleSheet } from "react-native";
import { DynamicTheme } from "../theme/theme";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const useStyles = (theme: DynamicTheme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: theme.colors.background,
    },
    imageBackground: {
      width: "100%",
      minHeight: 200,
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
      backgroundColor: theme.colors.backdrop + "88",
    },
    title: {
      marginTop: 100,
      padding: 20,
      fontSize: 28,
      fontWeight: "bold",
      // -     color: theme.colors.white, // keep
      color: theme.colors.white,
      textAlign: "center",
      fontFamily: theme.fonts.medium.fontFamily,
    },
    content: {
      backgroundColor: theme.colors.surface,
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
      color: theme.colors.white,
      textAlign: "left",
      lineHeight: 22,
      marginTop: 50,
      marginBottom: 30,
      fontFamily: theme.fonts.regular.fontFamily,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: theme.colors.surface,
      paddingVertical: 0,
    },
    button: {
      flexGrow: 1,
      backgroundColor: theme.colors.grey,
      borderRadius: 0,
      color: theme.colors.oppositeText,
    },
    focusedButton: {
      backgroundColor: theme.colors.primary,
    },
    buttonText: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: "bold",
      fontFamily: theme.fonts.medium.fontFamily,
    },
    headerText: {
      color: theme.colors.text,
    },
    focusedHeaderText: {
      color: theme.colors.oppositeText,
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
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      marginVertical: 5,
      borderColor: theme.colors.placeholder,
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
      color: theme.colors.text,
    },
    statusLabel: {
      color: theme.colors.text,
    },
    sortFilterBar: {
      flexDirection: "row",
      justifyContent: "flex-end",
      backgroundColor: theme.colors.grey,
      color: "white",
    },
    CardsContainer: {
      backgroundColor: theme.colors.grey,
    },
    projectCard: {
      marginHorizontal: 10,
      marginVertical: 5,
      padding: 15,
      backgroundColor: theme.colors.surface,
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
