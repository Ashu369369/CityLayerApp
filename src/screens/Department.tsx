import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, FlatList } from "react-native";
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
import {
  Announcement,
  getAnnouncementsByDepartmentId,
} from "../api/announcementsApi";
import { sortItems } from "../Tools/sortFunction";
import {
  Button,
  Menu,
  Divider,
  Provider,
  Card,
  TouchableRipple,
  Paragraph,
  Title,
  useTheme,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import useStyles from "../styles/Department";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { getDepartment } from "../api/deptApi";

import { DynamicTheme } from "../theme/theme";

type DepartmentScreenRouteProp = RouteProp<RootStackParamList, "Department">;
type ProjectScreenRouteProp = StackNavigationProp<RootStackParamList>;

const Department: React.FC = () => {
  const theme = useTheme();
  const styles = useStyles(theme as DynamicTheme);
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

  const [sortMenuVisible, setSortMenuVisible] = useState(false);

  const fetchAnnouncements = async () => {
    try {
      const fetchedAnnouncements = await getAnnouncementsByDepartmentId(
        departmentId
      );
      setAnnouncements(fetchedAnnouncements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };
  const fetchProjects = async () => {
    try {
      const fetchedProjects = await getProjectsByDepartmentId(departmentId);
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
      fetchAnnouncements();
    }
  }, [selectedTab]);
  useEffect(() => {
    if (selectedTab === "projects") {
      fetchProjects();
    }
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTab === "programs") {
      fetchPrograms();
    }
  }, [selectedTab]);

  const handleCreateNew = (selectedTab: string) => {
    if (selectedTab === "projects") {
      navigation.navigate("CreateNew", { type: "Project", id: departmentId });
    } else if (selectedTab === "programs") {
      navigation.navigate("CreateNew", { type: "Program", id: departmentId });
    } else if (selectedTab === "announcements") {
      navigation.navigate("CreateNew", {
        type: "Announcement",
        id: departmentId,
      });
    }
  };

  const handleDelete = async (type: string, id: number) => {
    if (type === "projects") {
      await deleteProject(id);
      fetchProjects();
    } else if (type === "programs") {
      await deleteProgram(id);
      fetchPrograms();
    }
  };

  const handleSort = (value: string) => {
    const [criteria, order] = value.split("-");
    if (selectedTab === "announcements") {
      const sortedAnnouncements = sortItems(
        announcements,
        criteria === "title"
          ? "messageTitle"
          : ("createdat" as keyof Announcement),
        order as "asc" | "desc"
      );
      setAnnouncements([...sortedAnnouncements]);
    } else if (selectedTab === "projects") {
      const sortedProjects = sortItems(
        projects,
        criteria === "title" ? "title" : ("createdat" as keyof Project),
        order as "asc" | "desc"
      );
      setProjects([...sortedProjects]);
    } else if (selectedTab === "programs") {
      const sortedPrograms = sortItems(
        programs,
        criteria === "title" ? "name" : ("createdAt" as keyof Program),
        order as "asc" | "desc"
      );
      setPrograms([...sortedPrograms]);
    }
    setSortMenuVisible(false);
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
        // imageStyle={styles.image}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,1)"]}
          style={styles.overlay}
        >
          <Text style={styles.title}>{title}</Text>
          <View style={styles.descContainer}>
            <Text style={styles.description}>{description}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.content}>
        {/* button row */}
        <View style={styles.buttonRow}>
          {/* Announcements Button */}
          <Button
            mode={
              selectedTab === "announcements" ? "contained" : "contained-tonal"
            }
            onPress={() => setSelectedTab("announcements")}
            style={[
              styles.button,
              selectedTab === "announcements" ? styles.focusedButton : null, // Apply when focused
            ]}
          >
            Announcements
          </Button>
          {/* Projects Button */}
          <Button
            mode={selectedTab === "projects" ? "contained" : "contained-tonal"}
            onPress={() => setSelectedTab("projects")}
            style={[
              styles.button,
              selectedTab === "projects" ? styles.focusedButton : null, // Apply when focused
            ]}
          >
            Projects
          </Button>
          {/* Programs Button */}
          <Button
            mode={selectedTab === "programs" ? "contained" : "contained-tonal"}
            onPress={() => setSelectedTab("programs")}
            style={[
              styles.button,
              selectedTab === "programs" ? styles.focusedButton : null, // Apply when focused
            ]}
          >
            Programs
          </Button>
        </View>
        {/* Sort and Filter Bar */}
        <View style={styles.sortFilterBar}>
          <Menu
            visible={sortMenuVisible}
            onDismiss={() => setSortMenuVisible(false)}
            anchor={
              <Button onPress={() => setSortMenuVisible(true)}>Sort by</Button>
            }
          >
            <Menu.Item
              onPress={() => handleSort("title-asc")}
              title="Name (Asc)"
            />
            <Menu.Item
              onPress={() => handleSort("title-desc")}
              title="Name (Desc)"
            />
            <Divider />
            <Menu.Item
              onPress={() => handleSort("createdAt-asc")}
              title="Date (Asc)"
            />
            <Menu.Item
              onPress={() => handleSort("createdAt-desc")}
              title="Date (Desc)"
            />
          </Menu>
          {role >= 2 && (
            <Button onPress={() => handleCreateNew(selectedTab)}>
              {"Create "}
              {selectedTab === "projects"
                ? "Project"
                : selectedTab === "programs"
                ? "Program"
                : "Announcement"}
            </Button>
          )}
        </View>
      </View>
    </>
  );

  return (
    <Provider>
      <FlatList
        style={styles.CardsContainer}
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
          <TouchableRipple
            onPress={() => {
              if (selectedTab === "projects") {
                navigation.navigate("Project", { projectid: item.projectid });
              } else if (selectedTab === "programs") {
                navigation.navigate("Program", { programId: item.programid });
              } else if (selectedTab === "announcements") {
                // Handle announcement press if needed
                console.log("Announcement clicked:", item.messageTitle);
              }
            }}
          >
            <Card style={styles.projectItem}>
              <Card.Content>
                {/* Render title based on selected tab */}
                <Title style={styles.projectTitle}>
                  {selectedTab === "projects"
                    ? item.title
                    : selectedTab === "programs"
                    ? item.name
                    : item.messageTitle}
                </Title>
                {/* Render description based on selected tab */}

                {selectedTab == "projects" && (
                  <Paragraph style={styles.statusLabel}>
                    Status:{" "}
                    <Text
                      style={
                        item.status === "Active"
                          ? { color: "green", fontWeight: "bold" }
                          : item.status === "Pending"
                          ? { color: "orange", fontWeight: "bold" }
                          : { color: "red", fontWeight: "bold" }
                      }
                    >
                      {item.status}
                    </Text>
                  </Paragraph>
                )}
                <Paragraph style={styles.projectDescription}>
                  {selectedTab === "projects"
                    ? item.description
                    : selectedTab === "programs"
                    ? item.description
                    : item.messageBody}
                </Paragraph>
              </Card.Content>
              {role === 2 || role === 3 ? (
                <Card.Actions>
                  {selectedTab !== "announcements" && (
                    <EditButton
                      type={selectedTab}
                      id={item.projectid || item.programid}
                    />
                  )}
                  <DeleteButton
                    onDelete={() => {
                      handleDelete(
                        selectedTab,
                        item.projectid || item.programid
                      );
                    }}
                  />
                </Card.Actions>
              ) : null}
            </Card>
          </TouchableRipple>
        )}
        ListEmptyComponent={
          <View style={styles.announcements}>
            <Text style={styles.announcementText}>
              No {selectedTab} available.
            </Text>
          </View>
        }
      />
    </Provider>
  );
};

export default Department;
