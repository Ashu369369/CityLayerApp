import { StyleSheet } from "react-native";
import { DynamicTheme } from "../theme/theme";

const useStyles = (theme: DynamicTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  projectCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 0,
    padding: 25,
    paddingBottom: 0,
    boxShadow: "0 0 0 rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 8,
    fontFamily: theme.fonts.medium.fontFamily,
  },
  description: {
    fontSize: 16,
    color: theme.colors.backdrop,
    opacity: 0.4,
    marginBottom: 16,
    fontFamily: theme.fonts.regular.fontFamily,
  },
  detailsContainer: {
    marginTop: 0,
    padding:25,
  },
  detail: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 8,
    fontFamily: theme.fonts.light.fontFamily,
  },
  detailLabel: {
    color: theme.colors.text,
    // fontFamily: theme.fonts.small.fontFamily,
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.error,
    textAlign: "center",
    fontFamily: theme.fonts.medium.fontFamily,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.disabled,
    marginVertical: 16,
  },
  updateCard: {
    backgroundColor: theme.colors.surface,
    margin: 26,
    padding: 20,
    paddingBottom: 5,
    borderRadius: 0,
    marginBottom: 16,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: theme.colors.primary,
  },
  updateDescription: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 8,
    fontFamily: theme.fonts.regular.fontFamily,
    lineHeight: 22,
  },
  updateDate: {
    fontSize: 11,
    color: theme.colors.placeholder,
    fontFamily: theme.fonts.light.fontFamily,
    marginBottom: 4,
  },
  updateBy: {
    fontSize: 12,
    color: theme.colors.primary,
    fontFamily: theme.fonts.medium.fontFamily,
  },
  updateLocation: {
    fontSize: 13,
    color: theme.colors.secondary,
    fontFamily: theme.fonts.light.fontFamily,
  },
  subTitle: {
    paddingHorizontal: 25,
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 8,
    color: theme.colors.text,
  },
  updateFiles: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: theme.colors.surface, // Subtle background for contrast
    borderRadius: 8, // Rounded corners
    borderWidth: 1, // Thin border
    borderColor: theme.colors.grey, // Use theme grey color
    shadowColor: theme.colors.shadow, // Shadow effect
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // Shadow for Android
  },
  nameDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mediaContainer: {
    marginTop: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  mediaWebView: {
    width: "100%",
    height: 250,
    borderRadius: 8,
  },
  cardWrapper: {
    // backgroundColor: theme.colors.white,
    borderWidth: 0,
    
  },
});

export default useStyles;
