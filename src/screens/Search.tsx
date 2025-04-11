import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { getAllDepartments } from "../api/deptApi"; // Import API for departments
import { getAllProjects } from "../api/projectApi"; // Import API for projects
import { getAllPrograms } from "../api/programApi"; // Import API for programs
import { Searchbar, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootStackParams";
import { StackNavigationProp } from "@react-navigation/stack";
import { DynamicTheme } from "../theme/theme";

const SearchScreen: React.FC = () => {
  
  const theme = useTheme();
  const styles = useStyles(theme as DynamicTheme);
  const [searchQuery, setSearchQuery] = useState("");
  const [departments, setDepartments] = useState<
    { id: number; title: string; description?: string }[]
  >([]);
  const [projects, setProjects] = useState<
    { id: number; title: string; description: string }[]
  >([]);
  const [programs, setPrograms] = useState<
    { id: number; title: string; description: string }[]
  >([]);
  const [filteredResults, setFilteredResults] = useState<
    { id: number; type: string; title: string; description: string }[]
  >([]);
  const [filterOption, setFilterOption] = useState<string>("All"); // Add filterOption state
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); // Access navigation with typed routes

  useEffect(() => {
    // Fetch all departments, projects, and programs when the component mounts
    const fetchData = async () => {
      try {
        const departmentsData = await getAllDepartments();
        const projectsData = await getAllProjects();
        const programsData = await getAllPrograms();

        if (departmentsData?.data) {
          setDepartments(
            departmentsData.data.getAllDepartments.map((item: any) => ({
              id: item.departmentid,
              title: item.title || "",
              description: item.description || "",
              imageUrl: item.imageUrl || "",
            }))
          );
        }
        if (projectsData) {
          setProjects(
            projectsData.map((item: any) => ({
              id: item.projectid,
              title: item.title || "",
              description: item.description || "",
            }))
          );
        }
        if (programsData) {
          setPrograms(
            programsData.map((item: any) => ({
              id: item.programid,
              title: item.name || "",
              description: item.description || "",
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter results based on the search query and filter option
    const query = searchQuery.toLowerCase();

    let results: Array<{
      id: number;
      type: string;
      title: string;
      description: string;
    }> = [];
    if (filterOption === "All" || filterOption === "Departments") {
      results = results.concat(
        departments
          .map((item) => ({
            ...item,
            type: "Department",
            description: item.description || "",
          }))
          .filter((item) => item.title.toLowerCase().includes(query))
      );
    }
    if (filterOption === "All" || filterOption === "Projects") {
      results = results.concat(
        projects
          .map((item) => ({ ...item, type: "Project" }))
          .filter((item) => item.title.toLowerCase().includes(query))
      );
    }
    if (filterOption === "All" || filterOption === "Programs") {
      results = results.concat(
        programs
          .map((item) => ({ ...item, type: "Program" }))
          .filter((item) => item.title.toLowerCase().includes(query))
      );
    }

    setFilteredResults(results);
  }, [searchQuery, filterOption, departments, projects, programs]);

  const handleItemPress = (item: {
    id: number;
    type: string;
    title: string;
    description: string;
  }) => {
    // Navigate to the appropriate screen based on the item's type
    if (item.type === "Department") {
      navigation.navigate("Department", {
        id: item.id,
        title: item.title,
        description: item.description,
        imageUrl: "",
      });
    } else if (item.type === "Project") {
      navigation.navigate("Project", { projectid: item.id });
    } else if (item.type === "Program") {
      navigation.navigate("Program", { programId: item.id });
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

      {/* Filter Options */}
      <View style={styles.filterContainer}>
        {["All", "Departments", "Projects", "Programs"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.filterButton,
              filterOption === option && styles.activeFilterButton,
            ]}
            onPress={() => setFilterOption(option)}
          >
            <Text
              style={[
                styles.filterButtonText,
                filterOption === option && styles.activeFilterButtonText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Results */}
      <FlatList
        data={filteredResults}
        keyExtractor={(item) => `${item.type}-${item.id}`} // Combine type and id for unique keys
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.resultItem}
            onPress={() => handleItemPress(item)}
          >
            <Text style={styles.resultText}>{item.title}</Text>
            <Text style={styles.resultSubText}>{item.description}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.noResults}>No results found.</Text>
        }
      />
    </View>
  );
};

const useStyles = (theme: DynamicTheme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  activeFilterButton: {
    backgroundColor: "#6FBBB1",
    borderColor: "#6FBBB1",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#555",
  },
  activeFilterButtonText: {
    color: "#fff",
  },
  resultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  resultText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  resultSubText: {
    fontSize: 14,
    color: "#555",
  },
  noResults: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
    color: "#888",
  },
});

export default SearchScreen;
