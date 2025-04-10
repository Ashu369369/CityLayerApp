import React, { useEffect, useState } from "react";
import { View, FlatList, RefreshControl, Text, Alert } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Button,
  FAB,
  Dialog,
  Portal,
  Provider,
  TextInput,
} from "react-native-paper";
import {
  deleteDepartment,
  Department,
  getAllDepartments,
} from "../api/deptApi";
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from "../navigation/RootStackParams";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import styles from "../styles/Departments";

// 1. Define the correct type for your route params
type DepartmentScreenRouteProp = RouteProp<RootStackParamList, 'Departments'>;

type DepartmentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Department'>;

const DepartmentScreen: React.FC = () => {
  const navigation = useNavigation<DepartmentScreenNavigationProp>();

  const [departments, setDepartments] = useState<Department[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(null);
  const [isFabOpen, setIsFabOpen] = useState(false); // State to control FAB group visibility
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [departmentIdInput, setDepartmentIdInput] = useState<string>("");

  const route = useRoute<DepartmentScreenRouteProp>();

  const role = useSelector((state: RootState) => state.user.role);

  const fetchDepartments = async () => {
    try {
      const response = await getAllDepartments();
      if (response.data) {
        setDepartments(response.data.getAllDepartments);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchDepartments();
    }, []) // Only fetch on focus, no dependencies here
  );
  const handleDelete = async () => {
    if (selectedDepartmentId !== null) {
      try {
        await deleteDepartment(selectedDepartmentId);
        fetchDepartments();
        setDialogVisible(false); // Close the dialog after deletion
      } catch (error) {
        console.error("Error deleting department:", error);
      }
    }
  };

  const handleFabAction = (actionType: string) => {
    if (actionType === "program" || actionType === "project" || actionType === "announcement") {
      setSelectedAction(actionType); // Store the selected action
      setDialogVisible(true); // Show the dialog
    } else {
      navigation.navigate("CreateNew", { type: actionType });
    }
  };

  const handleDialogSubmit = () => {
    try {

      if (departmentIdInput.trim() === "") {
        Alert.alert("Error", "Please enter a valid department ID.");
        return;
      }

      if (selectedAction) {
        navigation.navigate("CreateNew", {
          type: selectedAction,
          id: parseInt(departmentIdInput, 10),
        });
      } else {
        Alert.alert("Error", "No action selected.");
      }
    } catch (error) {
      console.error("Error handling dialog submit:", error);
    }

    // Reset dialog state
    setDialogVisible(false);
    setDepartmentIdInput("");
    setSelectedAction(null);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDepartments();
    setRefreshing(false);
  };

  const handleDepartmentPress = (department: Department) => {
    navigation.navigate("Department", {
      id: department.departmentid,
      title: department.title,
      description: department.description,
      imageUrl: department.imageUrl,
    });
  };

  const showDialog = (departmentId: number) => {
    setSelectedDepartmentId(departmentId);
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
    setSelectedDepartmentId(null);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <FlatList
          data={departments}
          keyExtractor={(item) => item.departmentid.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          renderItem={({ item }) => (
            <Card style={styles.card} onPress={() => handleDepartmentPress(item)}>
              <Card.Cover
                source={{
                  uri:
                    item.imageUrl ||
                    "https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg",
                }}
                style={styles.cardImage}
              />
              <Card.Content style={styles.cardContent}>
                <Title style={styles.title}>{item.title}</Title>
                <Paragraph style={styles.subtitle}>
                  {item.description || "No description available"}
                </Paragraph>
              </Card.Content>
              {role === 3 && (
                <Card.Actions style={styles.cardActions}>
                  <Button
                    mode="outlined"
                    style={styles.editButton}
                    labelStyle={styles.editButtonText}
                    onPress={() =>
                      navigation.navigate("Edit", {
                        type: "department",
                        id: item.departmentid,
                      })
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    mode="contained"
                    style={styles.deleteButton}
                    onPress={() => showDialog(item.departmentid)}
                  >
                    Delete
                  </Button>
                </Card.Actions>
              )}
            </Card>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No departments available.</Text>
            </View>
          }
        />
        {/* FAB Group */}
        <FAB.Group
          visible={true} // Ensure the FAB.Group is visible
          open={isFabOpen}
          icon={isFabOpen ? "close" : "plus"} // Change icon based on state
          actions={[
            {
              icon: "office-building",
              label: "Create Department",
              onPress: () => handleFabAction("department"),
            },
            {
              icon: "briefcase",
              label: "Create Project",
              onPress: () => handleFabAction("project"),
            },
            {
              icon: "calendar",
              label: "Create Program",
              onPress: () => handleFabAction("program"),
            },
            {
              icon: "alert",
              label: "Create Announcement",
              onPress: () => handleFabAction("announcement"),
            },
            {
              icon: "bell",
              label: "Create Notification",
              onPress: () => navigation.navigate("CreateNotification"),
            },
          ]}
          onStateChange={({ open }) => setIsFabOpen(open)} // Toggle FAB group visibility
          style={styles.fabGroup}
        />

        {/* Dialog for creating program/project/announcement */}
        <Portal>
          <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
            <Dialog.Title>Enter Department ID</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Department ID"
                value={departmentIdInput}
                onChangeText={(text) => setDepartmentIdInput(text)}
                style={styles.textInput}
                keyboardType="numeric"
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
              <Button onPress={handleDialogSubmit}>Submit</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {/* Confirmation Dialog */}
        <Portal>
          <Dialog visible={dialogVisible} onDismiss={hideDialog}>
            <Dialog.Title>Confirm Deletion</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                Are you sure you want to delete this department?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={handleDelete}>Delete</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default DepartmentScreen;
