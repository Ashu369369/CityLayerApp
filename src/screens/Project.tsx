import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootStackParams';

type ProjectDetailsRouteProp = RouteProp<RootStackParamList, 'ProjectDetails'>;

const ProjectDetails: React.FC = () => {
  const route = useRoute<ProjectDetailsRouteProp>();
  const { projectid, title, description, startdate, duedate, status, assignedto, workforce, budget, timeline, departmentid, createdat } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.detail}>Start Date: {startdate}</Text>
      <Text style={styles.detail}>Due Date: {duedate}</Text>
      <Text style={styles.detail}>Status: {status}</Text>
      <Text style={styles.detail}>Assigned To: {assignedto}</Text>
      <Text style={styles.detail}>Workforce: {workforce.team.join(', ')}</Text>
      <Text style={styles.detail}>Budget: ${budget}</Text>
      <Text style={styles.detail}>Timeline: {timeline}</Text>
      <Text style={styles.detail}>Department ID: {departmentid}</Text>
      <Text style={styles.detail}>Created At: {createdat}</Text>
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