import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { feedbacks } from "../demoData/feedbacks"; // Assuming you have a feedbacks data file}
import {useStyles} from "../styles/Feedbacks"; // Assuming you have a Feedback type defined
import { useTheme } from "react-native-paper";
import { DynamicTheme } from "../theme/theme";

const Feedbacks: React.FC = () => {
  
  const theme = useTheme();
  const styles = useStyles(theme as DynamicTheme);
  
  const renderFeedback = ({ item }: { item: Feedback }) => (
    <View style={styles.feedbackItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.comment}>{item.comment}</Text>
      <Text style={styles.user}>~{item.user}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedbacks</Text>
      <FlatList
        data={feedbacks}
        keyExtractor={(item) => item.id}
        renderItem={renderFeedback}
      />
    </View>
  );
};

export default Feedbacks;
