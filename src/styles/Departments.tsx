import { StyleSheet } from "react-native";
import theme from "../theme/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background, // Use theme background color
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 12, // Rounded corners for cards
    elevation: 4, // Shadow for cards
    backgroundColor: theme.colors.surface, // Use theme surface color
    // overflow: "hidden",
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primary, // Use theme primary color for titles
    fontFamily: theme.fonts.medium.fontFamily,
  },
  cardDescription: {
    fontSize: 14,
    color: theme.colors.text, // Use theme text color for descriptions
    marginTop: 5,
    fontFamily: theme.fonts.regular.fontFamily,
  },
  cardActions: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: theme.colors.primary, // Use theme primary color for buttons
    borderRadius: 8, // Rounded button corners
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary, // Use theme primary color for FAB
    borderRadius: 28, // Circular FAB
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.placeholder, // Use theme placeholder color for empty text
    fontFamily: theme.fonts.light.fontFamily,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.primary, // Use theme primary color for titles
    fontFamily: theme.fonts.medium.fontFamily,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.text, // Use theme text color for subtitles
    marginTop: 5,
    fontFamily: theme.fonts.regular.fontFamily,
  },
});

export default styles;
