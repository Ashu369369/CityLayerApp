import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Department, getAllDepartments } from "../api/deptApi";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/RootStackParams";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import EditButton from "../component/EditButton";

type DepartmentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Department"
>;

const DepartmentScreen: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const navigation = useNavigation<DepartmentScreenNavigationProp>();

  const role = useSelector((state: RootState) => state.user.role);

  useEffect(() => {
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
    fetchDepartments();
  }, []);

  const handleDepartmentPress = (department: Department) => {
    navigation.navigate("Department", {
      id: department.departmentid,
      title: department.title,
      description: department.description,
      imageUrl: department.imageUrl,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={departments}
        keyExtractor={(item) => item.departmentid.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleDepartmentPress(item)}
          >
            <Image
              source={{
                uri:
                  item.imageUrl ||
                  "https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg",
              }}
              style={styles.image}
            />
            <Text style={styles.itemText}>{item.title}</Text>
            {role === 3 ? <EditButton type={"department"} id={item.departmentid} /> : ""}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  item: {
    flex: 1,
    margin: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 100,
  },
  itemText: {
    fontSize: 18,
    padding: 10,
    textAlign: "center",
  },
});

export default DepartmentScreen;
