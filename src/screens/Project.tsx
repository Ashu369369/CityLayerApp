import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  Linking,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootStackParams";
import { getProjectById, Project } from "../api/projectApi";
import styles from "../styles/Project";
import theme from "../theme/theme";
import { Card, Divider, Surface } from "react-native-paper";
import { ProjectUpdate } from "../api/projectUpdatesApi";
import { getProjectUpdatesByProjectId } from "../api/projectUpdatesApi";
import { WebView } from "react-native-webview";

type ProjectDetailsRouteProp = RouteProp<RootStackParamList, "Project">;

const ProjectDetails: React.FC = () => {
  const route = useRoute<ProjectDetailsRouteProp>();
  const { projectid } = route.params;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updates, setUpdates] = useState<ProjectUpdate[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const fetchedProject = await getProjectById(projectid);
        setProject(fetchedProject || null);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("Error fetching project");
      } finally {
        setLoading(false);
      }
    };

    const fetchProjectUpdates = async () => {
      try {
        const fetchedUpdates = await getProjectUpdatesByProjectId(projectid);
        setUpdates(fetchedUpdates);
      } catch (error) {
        console.error("Error fetching project updates:", error);
        setError("Error fetching project updates");
      }
    };

    fetchProject();
    fetchProjectUpdates();
  }, [projectid]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!project) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Project not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardWrapper}>
        <Surface style={styles.projectCard}>
          <View style={{ overflow: "hidden" }}>
            <Card.Content>
              <Text style={styles.title}>{project.title}</Text>
              <Text style={styles.description}>{project.description}</Text>
            </Card.Content>
          </View>
        </Surface>
      </View>

      {/* <Divider style={styles.divider} /> */}

      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Start Date: </Text>
          {project.startdate}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Due Date: </Text>
          {project.duedate}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Status: </Text>
          {project.status}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Assigned To: </Text>
          {project.assignedto}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Workforce: </Text>
          {project.workforce.team.join(", ")}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Budget: </Text>${project.budget}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Timeline: </Text>
          {project.timeline}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Department ID: </Text>
          {project.departmentid}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Created At: </Text>
          {project.createdat}
        </Text>
      </View>

      <Divider style={styles.divider} />
      <Text style={styles.subTitle}>Project Updates</Text>

      {updates.length > 0 ? (
        updates.map((update) => (
          <View key={update.id} style={styles.updateCard}>
            <Text style={styles.updateDescription}>{update.description}</Text>
            <Text style={styles.updateLocation}>
              Location: {update.location}
            </Text>

            <View style={styles.mediaContainer}>
              {update.mediaFiles.map((file, index) => {
                if (file.endsWith(".jpg") || file.endsWith(".png")) {
                  // For images, display the image
                  return (
                    <WebView
                      key={index}
                      source={{ uri: file }} // Display remote image
                      style={{ width: 200, height: 500, marginBottom: 90 }}
                    />
                  );
                } else if (file.endsWith(".pdf")) {
                  // For PDFs, display it inside a WebView
                  return (
                    <WebView
                      key={index}
                      source={{ uri: file }} // Render the PDF inside WebView
                      style={{ width: "100%", height: 200 }}
                    />
                  );
                } else if (file.endsWith(".mp4") || file.endsWith(".mov")) {
                  // For videos, display it using WebView
                  return (
                    <WebView
                      key={index}
                      source={{ uri: file }} // Display the video inside WebView
                      style={{ width: "100%", height: 200 }}
                    />
                  );
                } else {
                  // For other file types, open the file in the browser
                  return (
                    <WebView
                      key={index}
                      source={{ uri: file }} // Display the video inside WebView
                      style={{ width: "100%", height: 200 }}
                    />
                  );
                }
              })}
            </View>
            <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "space-between" }}>
              <Text style={styles.updateBy}>Created By: {update.createdBy}</Text>
              <Text style={styles.updateDate}>
                {new Date(update.dateAndTime).toLocaleString()}
              </Text>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.errorText}>
          No updates available for this project.
        </Text>
      )}
    </ScrollView>
  );
};

export default ProjectDetails;
