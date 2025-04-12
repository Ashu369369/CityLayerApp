import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { getAllDepartments } from "../api/deptApi";
import { getAllProjects } from "../api/projectApi";
import { getAllPrograms } from "../api/programApi";
import { Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootStackParams";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import getDynamicTheme, { DynamicTheme } from "../theme/theme";
import { RootState } from "../state/store";

const SearchScreen: React.FC = () => {
  const fontSize = useSelector(
    (state: RootState) => state.preferences.fontSize
  );
  const highContrast = useSelector(
    (state: RootState) => state.preferences.highContrast
  );
  const theme: DynamicTheme = getDynamicTheme(fontSize, highContrast);
  const styles = useStyles(theme);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [searchQuery, setSearchQuery] = useState("");
  const [departments, setDepartments] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [filterOption, setFilterOption] = useState<string>("All");

  useEffect(() => {
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
        style={styles.searchBar}
        inputStyle={{ color: "#000" }}
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

      <FlatList
        data={filteredResults}
        keyExtractor={(item) => `${item.type}-${item.id}`}
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

const useStyles = (theme: DynamicTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 16,
    },
    searchBar: {
      color: theme.colors.text,
      marginBottom: 16,
      backgroundColor: theme.colors.white,
      borderWidth: 1,
      borderColor: theme.colors.placeholder,
    },
    filterContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 16,
    },
    filterButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      // borderWidth: 1,
      // borderColor: theme.colors.accent,
      backgroundColor: theme.colors.white,
      // color: theme.colors.text,
    },
    activeFilterButton: {
      backgroundColor: theme.colors.primary,
      // borderColor: theme.colors.primary,
    },
    filterButtonText: {
      fontSize: theme.fonts.regular.fontSize,
      color: "#000",
    },
    activeFilterButtonText: {
      color: theme.colors.oppositeText,
    },
    resultItem: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.placeholder,
      // backgroundColor: theme.colors.surface,
    },
    resultText: {
      fontSize: theme.fonts.medium.fontSize,
      color: theme.colors.text,
      fontWeight: "bold",
      marginBottom: 4,
    },
    resultSubText: {
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.text,
    },
    noResults: {
      marginTop: 16,
      textAlign: "center",
      fontSize: theme.fonts.regular.fontSize,
      color: theme.colors.disabled,
    },
  });

export default SearchScreen;
