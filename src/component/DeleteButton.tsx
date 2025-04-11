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
    top: -1,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(150, 150, 150, 0.19)",
    borderRadius: 20,
  },
  image: {
    width: 17,
    height: 17,
    tintColor: "#fff",
    position: "relative",
    left: 1.5,
    // color: "black",
  },
});

export default DeleteButton;
