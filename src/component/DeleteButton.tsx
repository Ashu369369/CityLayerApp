import React from "react";
import { TouchableOpacity, Image, Alert, StyleSheet } from "react-native";

const DeleteButton: React.FC<{ onDelete: () => void }> = ({ onDelete }) => {
  const handleDelete = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: onDelete },
      ]
    );
  };

  return (
    <TouchableOpacity onPress={handleDelete} style={styles.button}>
      <Image
        source={require("../../assets/bin.png")}
        style={styles.image}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 10,
    right: 50,
    padding: 10,
    backgroundColor: "rgba(255, 0, 0, 1)",
    borderRadius: 20,
  },
  image: {
    position: "relative",
    left: 1,
    width: 10,
    height: 10,
    tintColor: "#fff",
  },
});

export default DeleteButton;
