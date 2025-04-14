import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  TouchableOpacity,
  Image,
  Text, // Still used for a couple places
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";

import HomeScreen from "../screens/Home";
import SearchScreen from "../screens/Search";
import DepartmentScreen from "../screens/Departments";
import ProfileScreen from "../screens/Profile";
import Department from "../screens/Department";
import EditScreen from "../screens/Edit";
import CreateNewScreen from "../screens/CreateNew";
import ProjectDetails from "../screens/Project";
import ProgramScreen from "../screens/Program";
import NotificationsScreen from "../screens/Notification";
import CreateNotificationScreen from "../screens/CreateNotification";
import Feedback from "../component/Feedback";
import Feedbacks from "../screens/Feedbacks";
import CreatePostScreen from "../screens/CreatePost";

import { RootState } from "../state/store";
import { RootStackParamList } from "../navigation/RootStackParams";
import notificationsData from "../demoData/notifications";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  const currentUserId = useSelector((state: RootState) => state.user.id);
  const role = useSelector((state: RootState) => state.user.role);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  // Recheck for unread notifications whenever the Home page gains focus
  useFocusEffect(
    React.useCallback(() => {
      const checkUnread = notificationsData.some(
        (notification) =>
          !notification.readBy.includes(currentUserId ? currentUserId : 0)
      );
      setHasUnreadNotifications(checkUnread);
    }, [currentUserId])
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Notifications", { type: "Department" })
              }
              style={{ marginRight: 10 }}
            >
              <Image
                source={
                  hasUnreadNotifications
                    ? require("../../assets/bellnoti.png")
                    : require("../../assets/bell.png")
                }
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      {role === 3 ? (
        // If admin, show "Create Notification" button
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("CreateNotification")}
                style={{
                  margin: 10,
                  padding: 10,
                  backgroundColor: "blue",
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Create Notification
                </Text>
              </TouchableOpacity>
            ),
          })}
        />
      ) : (
        // If not admin, just show the Notifications screen
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
      )}
      <Stack.Screen
        name="CreateNotification"
        component={CreateNotificationScreen}
      />
    </Stack.Navigator>
  );
};

const SearchStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SearchMain" component={SearchScreen} />
    <Stack.Screen name="Department" component={Department} />
    <Stack.Screen name="Project" component={ProjectDetails} />
    <Stack.Screen name="Program" component={ProgramScreen} />
  </Stack.Navigator>
);

const DepartmentStack = () => {
  const role = useSelector((state: RootState) => state.user.role);

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Departments" component={DepartmentScreen} />
      {role === 2 || role === 3 ? (
        // If Department Admin or Admin
        <>
          <Stack.Screen
            name="Department"
            component={Department}
          />
          <Stack.Screen name="CreateNew" component={CreateNewScreen} />
          <Stack.Screen
            name="CreateNotification"
            component={CreateNotificationScreen}
          />
        </>
      ) : (
        <Stack.Screen name="Department" component={Department} />
      )}
      <Stack.Screen name="Project" component={ProjectDetails} />
      <Stack.Screen name="Program" component={ProgramScreen} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  const role = useSelector((state: RootState) => state.user.role);

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerRight: () => {
            // Decide which screen to navigate to
            const targetScreen =
              role === 3 || role === 2 ? "Feedbacks" : "Feedback";
            // Decide which icon to show
            // (chatbubbles for multiple feedback, chatbubble for single)
            const iconName =
              role === 3 || role === 2
                ? "chatbubbles-outline"
                : "chatbubble-outline";

            return (
              <TouchableOpacity
                onPress={() => navigation.navigate(targetScreen)}
                style={{ marginRight: 15 }}
              >
                <Ionicons name={iconName} size={24} color="blue" />
              </TouchableOpacity>
            );
          },
        })}
      />
      <Stack.Screen name="Feedback">
        {() => (
          <Feedback
            onSubmit={() => console.log("Feedback submitted")}
            onCancel={() => console.log("Feedback canceled")}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Feedbacks" component={Feedbacks} />
    </Stack.Navigator>
  );
};

const MainNavBar: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        let iconName: keyof typeof Ionicons.glyphMap = "home";
        return {
          tabBarIcon: ({ color, size }) => {
            if (route.name === "Home") iconName = "home";
            else if (route.name === "Search") iconName = "search";
            else if (route.name === "Departments") iconName = "business-outline";
            else if (route.name === "Profile") iconName = "person";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        };
      }}
    >
      <Tab.Screen
        name="HomeTab"
        options={{ headerShown: false }}
        component={HomeStack}
      />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen
        name="DepartmentsTab"
        options={{ headerShown: false }}
        component={DepartmentStack}
      />
      <Tab.Screen
        name="ProfileTab"
        options={{ headerShown: false }}
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

export default MainNavBar;
