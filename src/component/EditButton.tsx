// filepath: src/components/EditButton.tsx
import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "react-native-paper";
import { RootStackParamList } from "../navigation/RootStackParams";
import { DynamicTheme } from "../theme/theme";

type EditButtonNavigationProp = StackNavigationProp<RootStackParamList, "Edit">;

interface EditButtonProps {
  type: string;
  id: number;
}

const EditButton: React.FC<EditButtonProps> = ({ type, id }) => {
  const navigation = useNavigation<EditButtonNavigationProp>();
  const theme = useTheme() as DynamicTheme;
  const styles = useStyles(theme);

  const handlePress = () => {
    navigation.navigate("Edit", { type, id });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Image
        source={require("../../assets/pencil.png")}
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
      right: 48,
      padding: 8,
      backgroundColor: theme.colors.accent + "33", // semi-transparent accent
      borderRadius: 16,
    },
    icon: {
      width: 16,
      height: 16,
      tintColor: theme.colors.primary, // primary color for the pencil icon
    },
  });

export default EditButton;
