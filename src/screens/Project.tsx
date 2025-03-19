import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootStackParams";
import { getProjectById, Project } from "../api/projectApi";

type ProjectScreenRouteProp = RouteProp<RootStackParamList, "Project">;

const Project: React.FC = () => {
  const route = useRoute<ProjectScreenRouteProp>();
  const { projectId } = route.params;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const fetchedProject = await getProjectById(projectId);

      setLoading(false);
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!project) {
    return (
      <View style={styles.container}>
        <Text>Project not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageBackground}>
        <View style={styles.overlay}>
          <Text style={styles.title}>{project.title}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.description}>{project.description}</Text>
        <Text style={styles.date}>
          Created at: {new Date(project.createdat).toLocaleDateString()}
        </Text>
        <Text style={styles.date}>
          Updated at: {new Date(project.updatedat).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageBackground: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 20,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
});

export default Project;
