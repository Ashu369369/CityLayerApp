import { StyleSheet } from "react-native";
import { DynamicTheme } from "../theme/theme";

const useStyles = (theme: DynamicTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grey,
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 10,
    elevation: 5,
    borderRadius: 10,
    // borderColor: theme.colors.background,
    boxShadow: "0px 0px 5px rgba(255, 255, 255, 0.2)",
    // borderWidth: 1,
    backgroundColor: theme.colors.backdrop, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    height: 180,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 0,
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
    backgroundColor: theme.colors.error,
    opacity: 1,
    borderRadius: 5,
    color: theme.colors.primary,
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
    // right: 16,
    // bottom: 16,
  },
   textInput: {
    marginBottom: 10,
    backgroundColor: "white",
  },
});

export default useStyles;
