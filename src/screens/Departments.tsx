import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
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
              />
              <Card.Content>
                <Title>{item.title}</Title>
                <Paragraph>
                  {item.description || "No description available"}
                </Paragraph>
              </Card.Content>
              {role === 3 && (
                <Card.Actions style={styles.cardActions}>
                  <Button
                    mode="contained"
                    style={styles.actionButton}
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
                    style={styles.actionButton}
                    onPress={() => showDialog(item.departmentid)}
                  >
                    Delete
                  </Button>
                </Card.Actions>
              )}
            </Card>
          )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  card: {
    marginVertical: 10, // Add vertical spacing between cards
    borderRadius: 10,
    elevation: 3,
    overflow: "hidden", // Ensures child components stay within the card
  },
  cardActions: {
    justifyContent: "space-between", // Align buttons properly
    paddingHorizontal: 10, // Add padding for better spacing
  },
  actionButton: {
    flex: 1, // Ensure buttons take equal space
    marginHorizontal: 5, // Add spacing between buttons
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#007BFF",
  },
});

export default DepartmentScreen;
