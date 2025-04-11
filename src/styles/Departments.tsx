import { StyleSheet } from "react-native";
import { DynamicTheme } from "../theme/theme";

const useStyles = (theme: DynamicTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
      // position: "relative",
      // paddingVertical: 10,
    },
    card: {
      marginVertical: 10,
      marginHorizontal: 16,
      borderRadius: 20,
      elevation: 5,
      backgroundColor: theme.colors.backdrop,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      // padding: 0,
    },
    cardImage: {
      height: 180,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      width: "100%",
    },
    cardContent: {
      padding: 16,
    },
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
      // fontFamily: theme.fonts.medium.fontFamily,
    },
    cardDescription: {
      fontSize: 14,
      color: theme.colors.white,
      marginTop: 6,
      // fontFamily: theme.fonts.regular.fontFamily,
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
      // backgroundColor: theme.colors.surface,
      // opacity: 0.5,
      borderRadius: 5,
    },
    editButtonText: {
      color: theme.colors.white,
    },
    deleteButton: {
      marginLeft: 8,
      backgroundColor: theme.colors.surface,
      opacity: 0.5,
      borderRadius: 5,
      color: theme.colors.primary,
    },

    emptyContainer: {
      alignItems: "center",
      marginTop: 60,
    },
    emptyText: {
      fontSize: 16,
      color: theme.colors.placeholder,
      // fontFamily: theme.fonts.light.fontFamily,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.colors.primary,
      // fontFamily: theme.fonts.medium.fontFamily,
      marginBottom: 6,
    },
    subtitle: {
      fontSize: 14,
      color: theme.colors.surface,
      // fontFamily: theme.fonts.regular.fontFamily,
      marginBottom: 4,
    },

    fabGroup: {
      position: "absolute",
      paddingBottom: 5,
      paddingRight: 5,
    },
    textInput: {
      marginBottom: 10,
      backgroundColor: "white",
    },
  });

export default useStyles;
