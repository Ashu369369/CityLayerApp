import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Feedback from "../component/Feedback";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen: React.FC = () => {
  const [isFeedbackVisible, setFeedbackVisible] = useState(false);

  const handleFeedbackSubmit = (feedback: {
    rating: string;
    title: string;
    description: string;
  }) => {
    console.log("Feedback submitted:", feedback);
    setFeedbackVisible(false); // Close the feedback modal after submission
  };

  const role = useSelector((state: RootState) => state.user.role);
  const navigation = useNavigation();
  const navigateToFeedbacks = () => {
    navigation.navigate("Feedbacks" as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>

      {/* Conditionally render the button based on the user's role */}
      {role === 3 && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setFeedbackVisible(true)}
        >
          <Text style={styles.buttonText}>Give Feedback</Text>
        </TouchableOpacity>
      )}

      {isFeedbackVisible && (
        <Feedback
          onSubmit={handleFeedbackSubmit}
          onCancel={() => setFeedbackVisible(false)}
        />
      )}

      {role === 3 && (
        <Text style={styles.text}>
          <TouchableOpacity style={styles.button} onPress={navigateToFeedbacks}>
            <Text style={styles.buttonText}>View Feedbacks</Text>
          </TouchableOpacity>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6FBBB1",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProfileScreen;
