import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, FlatList } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootStackParams";
import { getProgramById, Program } from "../api/programApi";
import { Text, useTheme, Card } from "react-native-paper";
import useStyles from "../styles/ProgramStyles";
import programPosts from "../demoData/programPosts"; // Import demo data
import { DynamicTheme } from "../theme/theme";

type ProgramScreenRouteProp = RouteProp<RootStackParamList, "Program">;

const ProgramScreen: React.FC = () => {
  
  const theme = useTheme();
  const styles = useStyles(theme as DynamicTheme);
  const route = useRoute<ProgramScreenRouteProp>();
  const { programId } = route.params;
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  // Filter posts related to the current program
  const filteredPosts = programPosts.filter((post) => post.projectId === programId);

  useEffect(() => {
    const fetchProgram = async () => {
      const fetchedProgram = getProgramById(programId);
      setProgram(fetchedProgram || null);
      setLoading(false);
    };

    fetchProgram();
  }, [programId]);

  if (loading) {
    return <ActivityIndicator size="large" color={theme.colors.primary} />;
  }

  if (!program) {
    return (
      <View style={styles.container}>
        <Text variant="bodyLarge" style={{ color: theme.colors.error }}>
          Program not found
        </Text>
      </View>
    );
  }

  const renderPost = ({ item }: { item: typeof programPosts[0] }) => (
    <Card style={styles.postCard}>
      <Card.Content>
        <Text variant="bodyMedium" style={styles.postText}>
          {item.textContent}
        </Text>
        <View style={styles.PostmediaContainer}>

        <Text variant="bodySmall" style={styles.postDate}>
          Posted on: {new Date(item.createdAt).toLocaleDateString()}
        </Text>
        {item.location && (
          <Text variant="bodySmall" style={styles.postLocation}>
            Location: {item.location}
          </Text>
        )}
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <View style={styles.header}>
            <Text variant="headlineMedium" style={styles.title}>
              {program.name}
            </Text>
          </View>
          <View style={styles.content}>
            {/* Time container */}
            <View style={styles.durationContainer}>
              <View>
                <Text variant="bodySmall" style={styles.date}>
                  Start Date: {new Date(program.startDate).toLocaleDateString()}
                </Text>
                {program.endDate && (
                  <Text variant="bodySmall" style={styles.date}>
                    End Date: {new Date(program.endDate).toLocaleDateString()}
                  </Text>
                )}
              </View>
              <View>
                <Text variant="bodyMedium" style={styles.duration}>
                  Duration: {program.duration} months
                </Text>
                <Text variant="bodySmall" style={styles.date}>
                  Repeat: {program.isRepeat ? `Yes (${program.repeatAfter?.type})` : "No"}
                </Text>
              </View>
            </View>
            <Text variant="bodyMedium" style={styles.description}>
              {program.description}
            </Text>
          </View>
          <Text variant="headlineSmall" style={styles.postsTitle}>
            Posts
          </Text>
        </>
      }
      data={filteredPosts}
      keyExtractor={(item) => item.updateId.toString()}
      renderItem={renderPost}
      ListEmptyComponent={
        <Text variant="bodyMedium" style={styles.noPosts}>
          No posts available for this program.
        </Text>
      }
      ListFooterComponent={
        <View style={styles.footer}>
          <View style={styles.footerDetails}>
            <Text variant="bodySmall" style={styles.date}>
              Created by: User {program.createdBy}
            </Text>
            <Text variant="bodySmall" style={styles.date}>
              Created at: {new Date(program.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
      }
      keyboardShouldPersistTaps="handled"
    />
  );
};

export default ProgramScreen;
