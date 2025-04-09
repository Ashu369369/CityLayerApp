import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/Home";
import SearchScreen from "../screens/Search";
import DepartmentScreen from "../screens/Departments";
import ProfileScreen from "../screens/Profile";
import { createStackNavigator } from "@react-navigation/stack";
import Department from "../screens/Department";
import EditScreen from "../screens/Edit";
import CreateNewScreen from "../screens/CreateNew";
import { Text, TouchableOpacity, Image } from "react-native";
import CreateButton from "./CreateButton";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { RootStackParamList } from "../navigation/RootStackParams";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import Project from "../screens/Project";
import ProjectDetails from "../screens/Project";
import ProgramScreen from "../screens/Program";
import NotificationsScreen from "../screens/Notification";
import notificationsData from "../demoData/notifications";
import CreateNotificationScreen from "../screens/CreateNotification";

import Feedback from "../component/Feedback";
import Feedbacks from "../screens/Feedbacks";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  const currentUserId = useSelector((state: RootState) => state.user.id); // Get the current user's ID
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false); // State to track unread notifications

  // Recheck for unread notifications whenever the Home page gains focus
  useFocusEffect(
    React.useCallback(() => {
      const checkUnreadNotifications = notificationsData.some(
        (notification) => !notification.readBy.includes(currentUserId ? currentUserId : 0)
      );
      setHasUnreadNotifications(checkUnreadNotifications); // Update the state
    }, [currentUserId])
  );
  return (

    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications", { type: "Department" })}
            style={{ marginRight: 10 }}
          >
            <Image
              source={
                hasUnreadNotifications
                  ? require("../../assets/bellnoti.png") // Icon for unread notifications
                  : require("../../assets/bell.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        ),
      })} />
      <Stack.Screen name="Notifications" component={NotificationsScreen}

        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateNotification")}
              style={{ margin: 10, padding: 10, backgroundColor: "blue", borderRadius: 5 }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>Create Notification</Text>
            </TouchableOpacity>

          ),
        })} />

      <Stack.Screen name="CreateNotification" component={CreateNotificationScreen} />
    </Stack.Navigator>
  );
}

const SearchStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SearchMain" component={SearchScreen} />
  </Stack.Navigator>
);

const DepartmentStack = () => {
  const role = useSelector((state: RootState) => state.user.role);
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {role === 3 ? (
        //if Admin
        <Stack.Screen
          name="Departments"
          component={DepartmentScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CreateNew", { type: "Department" })
                }
                style={{ marginRight: 10 }}
              >
                <Text style={{ color: "blue" }}>Create Department</Text>
              </TouchableOpacity>
            ),
          })}
        />
      ) : (
        <Stack.Screen name="Departments" component={DepartmentScreen} />
      )}
      {role === 2 || role === 3 ? (
        //if Department Admin or Admin
        <Stack.Screen
          name="Department"
          component={Department}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CreateNew", {
                    type: "Project",
                    id: (route as RouteProp<RootStackParamList, "Department">)
                      .params?.id,
                  })
                }
                style={{ marginRight: 10 }}
              >
                <Text style={{ color: "blue" }}>Create Project</Text>
              </TouchableOpacity>
            ),
          })}
        />
      ) : (
        <Stack.Screen name="Department" component={Department} />
      )}

      <Stack.Screen name="Project" component={ProjectDetails} />
      <Stack.Screen name="Program" component={ProgramScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
      <Stack.Screen name="CreateNew" component={CreateNewScreen} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    <Stack.Screen
      name="Feedback"
      options={{ presentation: "modal", headerShown: false }}
    >
      {() => (
        <Feedback
          onSubmit={(feedback) => {
            console.log("Feedback submitted:", feedback);
            // Add logic here for submitting feedback
          }}
          onCancel={() => console.log("Feedback canceled")}
        />
      )}
    </Stack.Screen>
    <Stack.Screen name="Feedbacks" component={Feedbacks} />
  </Stack.Navigator>
);

const MainNavBar: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: "home" | "search" | "list" | "person" = "home";
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Search") iconName = "search";
          else if (route.name === "Departments") iconName = "list";
          else if (route.name === "Profile") iconName = "person";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" options={{ headerShown: false }} component={HomeStack} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen
        name="Departments"
        options={{ headerShown: false }}
        component={DepartmentStack}
      />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default MainNavBar;
