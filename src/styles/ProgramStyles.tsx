import { StyleSheet } from "react-native";
import { DynamicTheme } from "../theme/theme";

const useStyles = (theme: DynamicTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    width: "100%",
    paddingTop: 50,
    padding: 10,
    fontSize: theme.fonts.large.fontSize,
    fontFamily: theme.fonts.medium.fontFamily,
    color: theme.colors.white,
    borderWidth: 0,

  },
  title: {
    padding: 20,
    fontSize: theme.fonts.xlarge.fontSize,
    fontWeight: "bold",
    color: theme.colors.primary,
    fontFamily: theme.fonts.medium.fontFamily,
  },
  content: {
    padding: 20,
    marginTop: 10,
    fontSize: theme.fonts.regular.fontSize,
    // backgroundColor: theme.colors.white,
  },
  description: {
    fontSize: theme.fonts.regular.fontSize,
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: 20,
    fontFamily: theme.fonts.regular.fontFamily,
  },
  date: {
    // fontSize: theme.fonts.small.fontSize,
    color: theme.colors.text,
    fontFamily: theme.fonts.light.fontFamily,
    marginBottom: 10,
  },
  duration: {
    fontSize: theme.fonts.light.fontSize,
    color: theme.colors.text,
    fontFamily: theme.fonts.medium.fontFamily,

    marginBottom: 10,
  },
  durationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 20,
  },
  postsSection: {
    padding: 20,
    marginTop: 20,
    backgroundColor: theme.colors.white,
    flex: 1,
  },
  postsTitle: {
    fontSize: theme.fonts.large.fontSize,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 25,
    color: theme.colors.backdrop,
    textAlign: "left",
  },
  postCard: {
    margin: 20,
    marginBottom: 15,
    padding: 15,
    backgroundColor: theme.colors.surface,
    elevation: 0,
    shadowColor: theme.colors.backdrop,
    shadowOpacity: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 0,
    opacity: 0.9,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: theme.colors.grey,
  },
  postText: {
    fontSize: theme.fonts.regular.fontSize,
    color: theme.colors.text,
    marginBottom: 10,
    fontFamily: theme.fonts.medium.fontFamily,
  },
  postDate: {
    // fontSize: theme.fonts.small.fontSize,
    color: theme.colors.text,
    fontFamily: theme.fonts.light.fontFamily,
    marginTop: 5,
  },
  postLocation: {
    // fontSize: theme.fonts.small.fontSize,
    color: theme.colors.primary,
    fontFamily: theme.fonts.large.fontFamily,
  },
  PostmediaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noPosts: {
    fontSize: theme.fonts.regular.fontSize,
    color: theme.colors.text,
    textAlign: "center",
    marginTop: 20,
    fontFamily: theme.fonts.medium.fontFamily,
  },
  footer: {
    marginTop: 20,
    padding: 10,
  },
  footerDetails: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-around",
  },
});

export default useStyles;