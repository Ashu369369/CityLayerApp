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
        style={styles.icon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default DeleteButton;
