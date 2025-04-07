import { StyleSheet } from "react-native";
import theme from "../theme/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  projectCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    padding: 16,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
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
    color: theme.colors.text,
    marginBottom: 16,
    fontFamily: theme.fonts.regular.fontFamily,
  },
  detailsContainer: {
    marginTop: 16,
  },
  detail: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 8,
    fontFamily: theme.fonts.light.fontFamily,
  },
  detailLabel: {
    fontWeight: "bold",
    color: theme.colors.primary,
    fontFamily: theme.fonts.medium.fontFamily,
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.error,
    textAlign: "center",
    fontFamily: theme.fonts.medium.fontFamily,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.grey,
    marginVertical: 16,
  },
  updateCard: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 12,
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
    color: theme.colors.text,
    marginBottom: 8,
    fontFamily: theme.fonts.regular.fontFamily,
    lineHeight: 22,
  },
  updateDate: {
    fontSize: 14,
    color: theme.colors.placeholder,
    fontFamily: theme.fonts.light.fontFamily,
    marginBottom: 4,
  },
  updateBy: {
    fontSize: 14,
    color: theme.colors.primary,
    fontFamily: theme.fonts.medium.fontFamily,
  },
  updateLocation: {
    fontSize: 14,
    color: theme.colors.secondary,
    fontFamily: theme.fonts.light.fontFamily,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    color: theme.colors.primary,
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
    margin: 10,
    padding: 10,
    backgroundColor: "#eaeaea",
    borderRadius: 5,
  },
});

export default styles;
