import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootStackParams';
import { getProjectById, Project } from '../api/projectApi';

type ProjectDetailsRouteProp = RouteProp<RootStackParamList, 'Project'>;

const ProjectDetails: React.FC = () => {
  const route = useRoute<ProjectDetailsRouteProp>();
  const { projectid } = route.params;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const fetchedProject = await getProjectById(projectid);
        setProject(fetchedProject || null);
      } catch (error) {
        console.error('Error fetching project:', error);
        setError('Error fetching project');
      } finally {
        setLoading(false);
        console.log('Project:', project);
      }
    };

    fetchProject();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!project) {
    return (
      <View style={styles.container}>
        <Text>Project not found</Text>
      </View>
    );
  }
  console.log(project);
  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.description}>{project.description}</Text>
      <Text style={styles.detail}>Start Date: {project.startdate}</Text>
      <Text style={styles.detail}>Due Date: {project.duedate}</Text>
      <Text style={styles.detail}>Status: {project.status}</Text>
      <Text style={styles.detail}>Assigned To: {project.assignedto}</Text>
      <Text style={styles.detail}>Workforce: {project.workforce.team.join(', ')}</Text>
      <Text style={styles.detail}>Budget: ${project.budget}</Text>
      <Text style={styles.detail}>Timeline: {project.timeline}</Text>
      <Text style={styles.detail}>Department ID: {project.departmentid}</Text>
      <Text style={styles.detail}>Created At: {project.createdat}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  detail: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default ProjectDetails;