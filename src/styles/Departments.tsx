import { StyleSheet } from "react-native";
import { DynamicTheme } from "../theme/theme";

const useStyles = (theme: DynamicTheme) =>
  StyleSheet.create({
    // Main container: use theme.colors.grey so that in default mode (F7F7F7) it is lighter than card;
    // in high contrast, grey is "#333333" (lighter) compared to backdrop.
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 10,
    },
    // Card style: If in high contrast mode (background is "#000000"), then use theme.colors.backdrop;
    // otherwise, use theme.colors.background.
    card: {
      marginVertical: 10,
      marginHorizontal: 10,
      elevation: 5,
      borderRadius: 10,
      backgroundColor:
        theme.colors.card,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    cardImage: {
      height: 250,
      borderRadius: 0,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      width: "100%",
      backgroundColor: theme.colors.surface,
    },
    cardContent: {
      padding: 16,
    },
    // Right content area inside the card (if needed)
    cardRightContent: {
      flex: 1,
      justifyContent: "space-between",
      padding: 10,
      backgroundColor: theme.colors.surface,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.colors.primary,
    },
    cardDescription: {
      fontSize: 14,
      color: theme.colors.white,
      marginTop: 6,
      lineHeight: 20,
    },
    cardActions: {
      flexDirection: "row",
      justifyContent: "flex-start",
      paddingHorizontal: 10,
      paddingBottom: 10,
    },
    editButton: {
      marginLeft: 8,
      borderRadius: 5,
    },
    editButtonText: {
      color: theme.colors.text,
      fontWeight: "bold",
    },
    deleteButton: {
      marginLeft: 8,
      backgroundColor: theme.colors.error,
      borderRadius: 5,
    },
    fab: {
      position: "absolute",
      right: 16,
      bottom: 16,
      backgroundColor: theme.colors.primary,
      borderRadius: 28,
      elevation: 5,
    },
    emptyContainer: {
      alignItems: "center",
      marginTop: 60,
    },
    emptyText: {
      fontSize: 16,
      color: theme.colors.placeholder,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.colors.primary,
      marginBottom: 6,
    },
    subtitle: {
      fontSize: 14,
      color: theme.colors.text,
      marginBottom: 4,
    },
    fabGroup: {
      position: "absolute",
      paddingBottom: 5,
      paddingRight: 5,
    },
    textInput: {
      marginBottom: 10,
      backgroundColor: theme.colors.white,
    },
  });

export default useStyles;
