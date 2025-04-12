import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Menu, Divider, useTheme } from "react-native-paper";
import { DynamicTheme } from "../theme/theme";

type DropdownProps = {
  label: string;
  options: string[];
  value: string;
  onValueChange: (val: string) => void;
};

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onValueChange,
}) => {
  const paperTheme = useTheme() as DynamicTheme;
  const styles = makeStyles(paperTheme);
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <TouchableOpacity
            style={styles.anchor}
            onPress={() => setVisible(true)}
          >
            <Text style={styles.anchorText}>{value}</Text>
          </TouchableOpacity>
        }
      >
        {options.map((opt) => (
          <Menu.Item
            key={opt}
            onPress={() => {
              onValueChange(opt);
              setVisible(false);
            }}
            title={opt}
            titleStyle={styles.menuItemText}
          />
        ))}
      </Menu>
    </View>
  );
};
const makeStyles = (theme: DynamicTheme) =>
  StyleSheet.create({
    container: {
      marginBottom: 12, // reduced bottom margin
    },
    label: {
      fontSize: theme.fonts.medium.fontSize - 2, // slightly smaller label
      fontWeight: "500",
      color: theme.colors.text,
      marginBottom: 4,
    },
    anchor: {
      borderWidth: 1,
      borderColor: theme.colors.placeholder,
      borderRadius: 6, // slightly tighter corners
      paddingVertical: 8, // reduced vertical padding
      paddingHorizontal: 12, // reduced horizontal padding
      backgroundColor: theme.colors.white,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    anchorText: {
      fontSize: theme.fonts.regular.fontSize - 2, // slightly smaller text
      color: theme.colors.text,
    },
    menuItemText: {
      fontSize: theme.fonts.regular.fontSize - 2,
      color: theme.colors.text,
      paddingVertical: 6, // tighter menu items
    },
  });
