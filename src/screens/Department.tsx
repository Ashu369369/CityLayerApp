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
import {
  deleteProject,
  getProjectsByDepartmentId,
  Project,
} from "../api/projectApi";
import {
  deleteProgram,
  getProgramsByDepartmentId,
  Program,
} from "../api/programApi";
import { StackNavigationProp } from "@react-navigation/stack";
import EditButton from "../component/EditButton";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import DeleteButton from "../component/DeleteButton";
import { deleteDepartment } from "../api/deptApi";
import {
  Announcement,
  getAnnouncementsByDepartmentId,
} from "../api/announcementsApi";

type DepartmentScreenRouteProp = RouteProp<RootStackParamList, "Department">;
type ProjectScreenRouteProp = StackNavigationProp<RootStackParamList>;

const Department: React.FC = () => {
  const route = useRoute<DepartmentScreenRouteProp>();
  const navigation = useNavigation<ProjectScreenRouteProp>();

  const departmentId = route.params.id;

  const { title, description, imageUrl } = route.params;
  const [selectedTab, setSelectedTab] = useState<
    "announcements" | "projects" | "programs"
  >("announcements");

  const role = useSelector((state: RootState) => state.user.role);

  const [projects, setProjects] = useState<Project[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const fetchAnnouncements = async () => {
    try {
      const fetchedAnnouncements = await getAnnouncementsByDepartmentId(
        departmentId
      );
      console.log(fetchedAnnouncements);
      setAnnouncements(fetchedAnnouncements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };
  const fetchProjects = async () => {
    try {
      const fetchedProjects = await getProjectsByDepartmentId(departmentId);
      // console.log(fetchedProjects);
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  const fetchPrograms = async () => {
    try {
      const fetchedPrograms = await getProgramsByDepartmentId(departmentId);
      setPrograms(fetchedPrograms);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  useEffect(() => {
    if (selectedTab === "announcements") {
      const departmentId = route.params.id;
      fetchAnnouncements();
    }
  }, [selectedTab]);
  useEffect(() => {
    if (selectedTab === "projects") {
      const departmentId = route.params.id;
      fetchProjects();
    }
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTab === "programs") {
      const departmentId = route.params.id;
      fetchPrograms();
    }
  }, [selectedTab]);

  const handleProjectPress = (project: Project) => {
    navigation.navigate("ProjectDetails", {
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

  const handleDelete = async (type: string, id: number) => {
    if (type === "projects") {
      await deleteProject(id);
      fetchProjects();
    } else if (type === "programs") {
      // Add this block
      await deleteProgram(id);
      fetchPrograms();
    }
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
          ? announcements
          : ((selectedTab === "projects" ? projects : programs) as any[])
      } // Display projects or programs based on selectedTab
      keyExtractor={(item) =>
        selectedTab === "announcements"
          ? item.announcementId.toString() // Use announcementId for announcements
          : item.projectid
          ? item.projectid.toString()
          : item.programid.toString()
      } // Dynamic key based on type
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            if (selectedTab === "projects") {
              handleProjectPress(item);
            } else if (selectedTab === "programs") {
              navigation.navigate("Program", { programId: item.programid });
            } else if (selectedTab === "announcements") {
              // Handle announcement press if needed
              console.log("Announcement clicked:", item.messageTitle);
            }
          }}
        >
          <View style={styles.projectItem}>
            {/* Render title based on selected tab */}
            <Text style={styles.projectTitle}>
              {selectedTab === "projects"
                ? item.title
                : selectedTab === "programs"
                ? item.programName
                : item.messageTitle}
            </Text>
            {/* Render description based on selected tab */}
            <Text style={styles.projectDescription}>
              {selectedTab === "projects"
                ? item.description
                : selectedTab === "programs"
                ? item.description
                : item.messageBody}
            </Text>

            {role === 2 || role === 3 ? (
              <>
                <EditButton
                  type={selectedTab}
                  id={item.projectid || item.programid}
                />
                <DeleteButton
                  onDelete={() => {
                    handleDelete(selectedTab, item.projectid || item.programid);
                  }}
                />
              </>
            ) : (
              ""
            )}
          </View>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <View style={styles.announcements}>
          <Text style={styles.announcementText}>
            No {selectedTab} available.
          </Text>
        </View>
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
