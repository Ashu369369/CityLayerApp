import React, { useEffect, useState } from "react";
import { View, FlatList, RefreshControl, Text } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Button,
  FAB,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import {
  deleteDepartment,
  Department,
  getAllDepartments,
} from "../api/deptApi";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/RootStackParams";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import styles from "../styles/Departments"; // Import styles from the styles file

type DepartmentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Department"
>;

const DepartmentScreen: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    number | null
  >(null);
  const navigation = useNavigation<DepartmentScreenNavigationProp>();

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

  useEffect(() => {
    fetchDepartments();
  }, []);

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
            <Card
              style={styles.card}
              onPress={() => handleDepartmentPress(item)}
            >
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
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate("AddDepartment")}
        />

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
