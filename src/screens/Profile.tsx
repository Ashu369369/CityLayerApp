import React, { useEffect, useState } from "react";
import { View, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Text, Avatar } from "react-native-paper";
import { RootState } from "../state/store";
import theme from "../theme/theme";
import { clearUser } from "../state/slices/userSlice";
import { deleteUser } from "../api/userApi";
import { useNavigation } from "@react-navigation/native";
import Feedback from "../component/Feedback";

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [isFeedbackVisible, setFeedbackVisible] = useState(false);
  const navigation = useNavigation();

  let user = useSelector((state: RootState) => state.user) as {
    id: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    role?: number | null;
    username?: string | null;
    dob?: string | null;
  };

  const handleFeedbackSubmit = (feedback: {
    rating: string;
    title: string;
    description: string;
  }) => {
    console.log("Feedback submitted:", feedback);
    setFeedbackVisible(false); // Close the feedback modal after submission
  };

  const role = useSelector((state: RootState) => state.user.role);
  const navigateToFeedbacks = () => {
    navigation.navigate("Feedbacks" as never);
  };
  // Handle logout
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          dispatch(clearUser()); // Dispatch logout action
        },
      },
    ]);
  };

  //delete account
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
                dispatch(clearUser()); // Clear user state after deletion
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
      {/* User Profile Card */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.avatarContainer}>
            <Avatar.Text
              size={80}
              label={user.firstName ? user.firstName.charAt(0) : "U"}
              style={styles.avatar}
            />
          </View>
          <Text variant="headlineMedium" style={styles.name}>
            {user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : "User Name"}
          </Text>
          <Text variant="bodyMedium" style={styles.email}>
            {user.email || "user@example.com"}
          </Text>
          <Text variant="bodyMedium" style={styles.username}>
            Username: {user.username || "N/A"}
          </Text>
          <Text variant="bodyMedium" style={styles.dob}>
            Date of Birth: {user.dob || "N/A"}
          </Text>
          <Text variant="bodySmall" style={styles.role}>
            Role:{" "}
            {user.role === 1
              ? "Admin"
              : user.role === 2
              ? "Manager"
              : "Employee"}
          </Text>
        </Card.Content>
      </Card>
      {/* Logout and Delete Account Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleLogout}
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
        >
          Logout
        </Button>
        <Button
          mode="contained"
          onPress={handleDeleteAccount}
          style={[styles.button, { backgroundColor: theme.colors.accent }]}
        >
          Delete Account
        </Button>
      </View>
      {/* Conditionally render the button based on the user's role */}
      {role !== 3 && (
        <Button
          style={[styles.button, { backgroundColor: theme.colors.accent }]}
          onPress={() => setFeedbackVisible(true)}
        >
          <Text style={styles.buttonText}>Give Feedback</Text>
        </Button>
      )}
      ;
      {isFeedbackVisible && (
        <Feedback
          onSubmit={handleFeedbackSubmit}
          onCancel={() => setFeedbackVisible(false)}
        />
      )}
      {role === 3 && (
        <Button
          style={[styles.button, { backgroundColor: theme.colors.accent }]}
          onPress={navigateToFeedbacks}
        >
          View Feedbacks
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  card: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    elevation: 2,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 10,
  },
  email: {
    textAlign: "center",
    color: theme.colors.text,
    marginBottom: 10,
  },
  username: {
    textAlign: "center",
    color: theme.colors.text,
    marginBottom: 10,
  },
  dob: {
    textAlign: "center",
    color: theme.colors.text,
    marginBottom: 10,
  },
  role: {
    textAlign: "center",
    color: theme.colors.placeholder,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    color: "red",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonText: {
    color: "red",
    fontSize: 16,
  },
});

export default ProfileScreen;
