// import { Video } from "expo-av"; // Import Video from expo-av
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, FlatList, Image } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootStackParams";
import { getProgramById, Program } from "../api/programApi";
import { Text, useTheme, Card, Button } from "react-native-paper";
import useStyles from "../styles/ProgramStyles";
import programPosts from "../demoData/programPosts"; // Import demo data
import { DynamicTheme } from "../theme/theme";
import { StackNavigationProp } from "@react-navigation/stack";
import WebView from "react-native-webview";

type ProgramScreenRouteProp = RouteProp<RootStackParamList, "Program">;

const ProgramScreen: React.FC = () => {
  const navigate = useNavigation<StackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const styles = useStyles(theme as DynamicTheme);
  const route = useRoute<ProgramScreenRouteProp>();
  const { programId } = route.params;
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  // Filter posts related to the current program
  const filteredPosts = programPosts.filter((post) => post.programId === programId);

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
          {/* Render media files */}
          {item.mediaFiles.map((media, index) => {
            if (media.type === "image") {
              return (
                <Image
                  key={index}
                  source={{ uri: media.url }}
                  style={styles.mediaImage}
                  resizeMode="cover"
                />
              );
            } else if (media.type === "video") {
              return (
                <WebView
                  key={index}
                  source={{ uri: media.url }}
                  style={{ width: "100%", height: 200 }}
                />
              );
            } else if (media.type === "document") {
              return (
                <WebView
                  key={index}
                  source={{ uri: media.url }}
                  style={{ width: "100%", height: 200 }}
                />
              )
            }
            return null;
          })}

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
          <View style={styles.rowContainer}>
            <Text variant="headlineSmall" style={styles.postsTitle}>
              Posts
            </Text>
            <Button
              mode="contained"
              onPress={() => navigate.navigate("CreatePost", { id: programId, type: "program" })}
              style={styles.createPostButton}
              labelStyle={styles.createPostButtonLabel}
            >
              Create Post
            </Button>
          </View>
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