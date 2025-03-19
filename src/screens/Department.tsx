import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootStackParams";
import { getProjectsByDepartmentId, Project } from "../api/projectApi";
import { getProgramsByDepartmentId, Program } from "../api/programApi";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons
import { StackNavigationProp } from "@react-navigation/stack";

type DepartmentScreenRouteProp = RouteProp<RootStackParamList, "Department">;
type ProjectScreenRouteProp = StackNavigationProp<RootStackParamList>;

const Department: React.FC = () => {

  const route = useRoute<DepartmentScreenRouteProp>();
  const navigation = useNavigation<ProjectScreenRouteProp>();
  
  const { title, description, imageUrl } = route.params;
  const [selectedTab, setSelectedTab] = useState<
    "announcements" | "projects" | "programs"
  >("announcements");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (selectedTab === "projects") {
      const departmentId = route.params.id;
      const fetchProjects = async () => {
        try {
          const fetchedProjects = await getProjectsByDepartmentId(departmentId);
          console.log(fetchedProjects);
          setProjects(fetchedProjects);
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      };
      fetchProjects();
    }
  }, [selectedTab]);

  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    if (selectedTab === "programs") {
      const departmentId = route.params.id;
      const fetchPrograms = async () => {
        try {
          const fetchedPrograms = await getProgramsByDepartmentId(departmentId);
          setPrograms(fetchedPrograms);
        } catch (error) {
          console.error("Error fetching programs:", error);
        }
      };
      fetchPrograms();
    }
  }, [selectedTab]);

  const handleProjectPress = (project: Project) => {
    navigation.navigate('ProjectDetails', {
      projectid: project.projectid,
      title: project.title,
      description: project.description,
      startdate: project.startdate,
      duedate: project.duedate,
      status: project.status,
      assignedto: project.assignedto,
      workforce: project.workforce,
      budget: project.budget,
      timeline: project.timeline,
      departmentid: project.departmentid,
      createdat: project.createdat,
    });
  };

  const renderHeader = () => (
    <>
      <ImageBackground
        source={{
          uri:
            imageUrl ||
            "https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg",
        }}
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
          {/* Announcements Button */}
          <TouchableOpacity
            style={[
              styles.button,
              selectedTab === "announcements" && styles.selectedButton,
            ]}
            onPress={() => setSelectedTab("announcements")}
          >
            <Text style={styles.buttonText}>Announcements</Text>
          </TouchableOpacity>

          {/* Projects Button */}
          <TouchableOpacity
            style={[
              styles.button,
              selectedTab === "projects" && styles.selectedButton,
            ]}
            onPress={() => setSelectedTab("projects")}
          >
            <Text style={styles.buttonText}>Projects</Text>
          </TouchableOpacity>

          {/* Programs Button */}
          <TouchableOpacity
            style={[
              styles.button,
              selectedTab === "programs" && styles.selectedButton,
            ]}
            onPress={() => setSelectedTab("programs")}
          >
            <Text style={styles.buttonText}>Programs</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <FlatList
      data={
        selectedTab === "announcements"
          ? []
          : ((selectedTab === "projects" ? projects : programs) as any[])
      } // Display projects or programs based on selectedTab
      keyExtractor={(item) =>
        item.projectid ? item.projectid.toString() : item.programid.toString()
      } // Dynamic key based on type
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (

        <TouchableOpacity
          onPress={() => {
            if (selectedTab === "projects") {
              handleProjectPress(item)}
            } else if (selectedTab === "programs") {
              navigation.navigate("Program", { programId: item.programid });
            }
          }}
        >
          <View style={styles.projectItem}>
            {/* Render title based on selected tab */}
            <Text style={styles.projectTitle}>
              {selectedTab === "projects" ? item.title : item.programName}
            </Text>

            {/* Render description based on selected tab */}
            <Text style={styles.projectDescription}>
              {selectedTab === "projects" ? item.description : item.description}
            </Text>

            <View style={styles.iconRow}>
              <TouchableOpacity>
                <Icon
                  name="thumbs-up"
                  size={20}
                  color="#007BFF"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name="comment"
                  size={20}
                  color="#007BFF"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        selectedTab === "announcements" ? (
          <View style={styles.announcements}>
            <Text style={styles.announcementText}>
              No announcements available.
            </Text>
          </View>
        ) :
          (
            <View style={styles.announcements}>
              <Text style={styles.announcementText}>No Projects available.</Text>
            </View>
          )
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    padding: 0,
    backgroundColor: "#f9f9f9",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginTop: -20,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 20,
    padding: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#C0C0C0",
  },
  button: {
    backgroundColor: "#C0C0C0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2,
  },
  selectedButton: {
    backgroundColor: "#007BFF",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  announcements: {
    padding: 20,
  },
  announcementText: {
    fontSize: 16,
    color: "#666",
  },
  projectItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  projectDescription: {
    fontSize: 14,
    color: "#666",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  icon: {
    marginLeft: 15,
  },
});

export default Department;
