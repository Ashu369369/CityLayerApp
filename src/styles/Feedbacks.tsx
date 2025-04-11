import { StyleSheet } from "react-native";
import { DynamicTheme } from "../theme/theme";

export const useStyles = (theme: DynamicTheme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  headerTitle: {
    fontSize: theme.fonts.large.fontSize,
    fontWeight: theme.fonts.large.fontWeight as
      | "normal"
      | "bold"
      | "100"
      | "200"
      | "300"
      | "400"
      | "500"
      | "600"
      | "700"
      | "800"
      | "900",
    color: theme.colors.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  feedbackItem: {
    backgroundColor: theme.colors.background,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: theme.colors.shadow,
    // shadowOpacity: 0.2,
    // shadowRadius: 6,
    // elevation: 3,
    borderWidth: 2,
    borderColor: theme.colors.grey, // Replace 'grey' with an appropriate existing color property
  },
  title: {
    fontSize: theme.fonts.medium.fontSize,
    fontWeight: theme.fonts.large.fontWeight as "normal",
    color: theme.colors.text,
    marginBottom: 2,
  },
  comment: {
    // fontSize: theme.fonts.small.fontSize,
    color: theme.colors.secondary,
    marginTop: 6,
    lineHeight: 18,
  },
  user: {
    // fontSize: theme.fonts.small.fontSize,
    color: theme.colors.accent,
    marginTop: 4,
    fontStyle: "italic",
    fontWeight: theme.fonts.large.fontWeight as "bold",
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 1 },
  },
});
