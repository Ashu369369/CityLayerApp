import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootStackParams';
import { getProjectsByDepartmentId, Project } from '../api/projectApi';

type DepartmentScreenRouteProp = RouteProp<RootStackParamList, 'Department'>;

const Department: React.FC = () => {
  const route = useRoute<DepartmentScreenRouteProp>();
  const { title, description, imageUrl } = route.params;
  const [selectedTab, setSelectedTab] = useState<'announcements' | 'projects'>('announcements');
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (selectedTab === 'projects') {
      const departmentId = route.params.id; // Assuming you have the department ID in the route params
      const fetchedProjects = getProjectsByDepartmentId(departmentId);
      console.log(fetchedProjects);
      setProjects(fetchedProjects);
    }
  }, [selectedTab]);

  const renderHeader = () => (
    <>
      <ImageBackground
        source={{ uri: imageUrl || 'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg' }}
        style={styles.imageBackground}
        imageStyle={styles.image}
        blurRadius={10}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, selectedTab === 'announcements' && styles.selectedButton]}
            onPress={() => setSelectedTab('announcements')}
          >
            <Text style={styles.buttonText}>Announcements</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, selectedTab === 'projects' && styles.selectedButton]}
            onPress={() => setSelectedTab('projects')}
          >
            <Text style={styles.buttonText}>Projects</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <FlatList
      data={selectedTab === 'announcements' ? [] : projects}
      keyExtractor={(item) => item.projectid.toString()}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <View style={styles.projectItem}>
          <Text style={styles.projectTitle}>{item.title}</Text>
          <Text style={styles.projectDescription}>{item.description}</Text>
        </View>
      )}
      ListEmptyComponent={
        selectedTab === 'announcements' ? (
          <View style={styles.announcements}>
            <Text style={styles.announcementText}>No announcements available.</Text>
          </View>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  imageBackground: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  content: {
    padding: 0,
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginTop: -20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
    padding: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#C0C0C0',
  },
  button: {
    backgroundColor: '#C0C0C0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2,
  },
  selectedButton: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  announcements: {
    padding: 20,
  },
  announcementText: {
    fontSize: 16,
    color: '#666',
  },
  projectItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  projectDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default Department;