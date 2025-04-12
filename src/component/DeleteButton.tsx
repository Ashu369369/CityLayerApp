import React from "react";
import { TouchableOpacity, Image, Alert, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { DynamicTheme } from "../theme/theme";

type Props = {
  onDelete: () => void;
};

const DeleteButton: React.FC<Props> = ({ onDelete }) => {
  const theme = useTheme() as DynamicTheme;
  const styles = useStyles(theme);

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

const useStyles = (theme: DynamicTheme) =>
  StyleSheet.create({
    button: {
      position: "absolute",
      top: 4,
      right: 4,
      padding: 8,
      backgroundColor: theme.colors.accent + "33", // semi‑transparent accent
      borderRadius: 16,
    },
    icon: {
      width: 18,
      height: 18,
      tintColor: theme.colors.error, // red icon in both modes
    },
  });

export default DeleteButton;
