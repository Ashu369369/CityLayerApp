import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { feedbacks } from "../demoData/feedbacks";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

type FeedbackProps = {
  onSubmit: (feedback: {
    rating: string;
    title: string;
    description: string;
  }) => void;
  onCancel: () => void;
};

const Feedback: React.FC<FeedbackProps> = ({ onSubmit, onCancel }) => {
  //   const navigation = useNavigation();
  const [rating, setRating] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { firstName, lastName } = useSelector((state: RootState) => state.user);

  const handleSubmit = () => {
    if (!rating || !description || !title) {
      // Show an alert if rating or description is empty
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    const feedbackData = { rating, title, description };
    onSubmit(feedbackData);
    const newFeedback = {
      id: (feedbacks.length + 1).toString(),
      user: `${firstName} ${lastName}`, // Assuming user is the full name
      comment: feedbackData.description, // Assuming comment maps to description
      rating: Number(feedbackData.rating), // Convert rating to number
      title: feedbackData.title,
      description: feedbackData.description,
    };
    feedbacks.push(newFeedback as Feedback);
    // navigation.goBack();
  };

  const handleRatingChange = (value: string) => {
    // Only allow numeric values between 1 and 5
    if (/^[1-5]$/.test(value) || value === "") {
      setRating(value);
    }
  };

  return (
    <Modal
      visible={true}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            style={styles.modalContainer}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={styles.modalContent}>
              <Text style={styles.heading}>Submit Feedback</Text>

              <TextInput
                style={styles.input}
                placeholder="Rating (1-5)"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={rating}
                onChangeText={handleRatingChange} // Limit input to 1-5
              />

              <TextInput
                style={styles.input}
                placeholder="Title"
                placeholderTextColor="#999"
                value={title}
                onChangeText={setTitle}
              />

              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description"
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
              />

              <View style={styles.buttonContainer}>
                <Button title="Submit" onPress={handleSubmit} />
                <Button title="Cancel" onPress={onCancel} color="red" />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default Feedback;
