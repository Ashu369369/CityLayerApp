import React, { useState } from "react";
import { View, Alert, StyleSheet, Platform, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Card, Text, Avatar, Switch, IconButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

import { RootState } from "../state/store";
import { clearUser } from "../state/slices/userSlice";
import { deleteUser } from "../api/userApi";
import Feedback from "../component/Feedback";
import {
  setFontSize,
  toggleHighContrast,
} from "../state/slices/preferencesSlice";
import getDynamicTheme, { DynamicTheme } from "../theme/theme";
import useStyles from "../styles/Profile";

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Get user's preferences from the state
  const fontSize = useSelector(
    (state: RootState) => state.preferences.fontSize
  );
  const highContrast = useSelector(
    (state: RootState) => state.preferences.highContrast
  );

  // Generate dynamic theme based on preferences
  const dynamicTheme: DynamicTheme = getDynamicTheme(fontSize, highContrast);
  const styles = useStyles(dynamicTheme);

  // User data from state
  const user = useSelector((state: RootState) => state.user) as {
    id: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    role?: number | null;
    username?: string | null;
    dob?: string | null;
  };

  const [isFeedbackVisible, setFeedbackVisible] = useState(false);

  // Handle feedback submission (if needed in the future)
  const handleFeedbackSubmit = (feedback: {
    rating: string;
    title: string;
    description: string;
  }) => {
    console.log("Feedback submitted:", feedback);
    setFeedbackVisible(false);
  };

  // Format the date to a user-friendly format
  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  // Logout handler
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          dispatch(clearUser());
        },
      },
    ]);
  };

  // Delete account handler
  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await deleteUser(Number(user.id));
              if (response.data?.deleteUser.success) {
                Alert.alert("Success", response.data.deleteUser.message);
                dispatch(clearUser());
              } else {
                Alert.alert(
                  "Error",
                  response.data?.deleteUser.message ||
                    "Failed to delete account"
                );
              }
            } catch (error) {
              console.error("Error deleting account:", error);
              Alert.alert(
                "Error",
                "Failed to delete account. Please try again."
              );
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Profile Card */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <Avatar.Text
                  size={80}
                  label={
                    user.firstName
                      ? user.firstName.charAt(0).toUpperCase()
                      : "U"
                  }
                  labelStyle={styles.avatarLabel}
                  style={styles.avatar}
                />
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.name}>
                  {user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : "User Name"}
                </Text>
                <Text style={styles.username}>{user.username || "N/A"}</Text>
                <Text style={styles.email}>
                  {user.email || "user@example.com"}
                </Text>
              </View>
            </View>
            <Text style={styles.dob}>
              Date of Birth: {formatDate(user.dob)}
            </Text>
            <Text style={styles.role}>
              Role:{" "}
              {user.role === 1
                ? "User"
                : user.role === 2
                ? "Employee"
                : "Admin"}
            </Text>
          </Card.Content>
        </Card>

        {/* Font Size & High Contrast Settings */}
        <View style={styles.settingsContainer}>
          <Text style={styles.label}>Font Size</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={fontSize}
              onValueChange={(value) => dispatch(setFontSize(value))}
              style={styles.picker}
            >
              <Picker.Item label="Small" value="small" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="Large" value="large" />
            </Picker>
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>High Contrast Mode</Text>
            <Switch
              value={highContrast}
              onValueChange={(value) => {
                dispatch(toggleHighContrast(value));
              }}
            />
          </View>
        </View>
      </ScrollView>

      {/* Logout and Delete Buttons fixed at bottom */}
      <View style={styles.fixedBottom}>
        <IconButton
          icon="logout"
          iconColor={dynamicTheme.colors.primary}
          size={30}
          onPress={handleLogout}
          style={styles.iconBtn}
        />
        <IconButton
          icon="delete"
          iconColor="#B00020"
          size={30}
          onPress={handleDeleteAccount}
          style={styles.iconBtn}
        />
      </View>
    </View>
  );
};

// const useStyles = (theme: DynamicTheme) =>
//   StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: theme.colors.background,
//     },
//     scrollContent: {
//       padding: 20,
//       paddingBottom: 120, // Reserve space for bottom buttons
//     },
//     card: {
//       backgroundColor: theme.colors.surface,
//       borderRadius: 12,
//       elevation: 3,
//       marginBottom: 20,
//       padding: 10,
//     },
//     profileHeader: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: 15,
//     },
//     avatarContainer: {
//       marginRight: 15,
//     },
//     avatar: {
//       backgroundColor: theme.colors.primary,
//     },
//     avatarLabel: {
//       fontSize: theme.fonts.xlarge.fontSize,
//     },
//     userInfo: {
//       flex: 1,
//     },
//     name: {
//       fontSize: theme.fonts.medium.fontSize,
//       fontWeight: "bold",
//       color: theme.colors.text,
//       marginBottom: 5,
//     },
//     username: {
//       fontSize: theme.fonts.regular.fontSize,
//       color: theme.colors.text,
//       marginBottom: 3,
//     },
//     email: {
//       fontSize: theme.fonts.regular.fontSize,
//       color: theme.colors.text,
//     },
//     dob: {
//       fontSize: theme.fonts.regular.fontSize,
//       color: theme.colors.text,
//       marginBottom: 10,
//     },
//     role: {
//       fontSize: theme.fonts.light.fontSize,
//       color: theme.colors.placeholder,
//       textAlign: "center",
//       marginBottom: 5,
//     },
//     settingsContainer: {
//       paddingVertical: 10,
//     },
//     label: {
//       fontSize: theme.fonts.medium.fontSize,
//       fontWeight: "bold",
//       color: theme.colors.text,
//       marginBottom: 5,
//     },
//     pickerContainer: {
//       borderRadius: 8,
//       borderWidth: 1,
//       borderColor: theme.colors.placeholder,
//       overflow: "hidden",
//       marginBottom: 20,
//     },
//     picker: {
//       backgroundColor: theme.colors.white,
//       ...Platform.select({
//         ios: {
//           height: 180,
//           marginTop: -40, // iOS alignment adjustment
//         },
//         android: {
//           height: 50,
//         },
//       }),
//     },
//     switchContainer: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     fixedBottom: {
//       position: "absolute",
//       bottom: 0,
//       left: 0,
//       right: 0,
//       backgroundColor: theme.colors.background,
//       borderTopWidth: 1,
//       borderTopColor: theme.colors.placeholder,
//       padding: 10,
//       flexDirection: "row",
//       justifyContent: "space-around",
//     },
//     iconBtn: {
//       margin: 5,
//     },
//   });

export default ProfileScreen;
