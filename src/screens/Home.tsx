import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Switch, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import theme, { DynamicTheme } from "../theme/theme";
import { getAllDepartments } from "../api/deptApi";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/RootStackParams";
import { countPendingProjects, countOngoingProjects, countActiveProjects } from "../api/projectApi";
import { Card, ProgressBar, List, useTheme } from "react-native-paper";



const PollutionHotspotsWidget = () => {
  const theme = useTheme() as DynamicTheme; // Access the theme

  const styles = useStyles(theme as DynamicTheme);
  // Pollution Hotspots data
  const pollutionData = [
    { zone: "Downtown", aqi: 180 },
    { zone: "Industrial Area", aqi: 250 },
    { zone: "Residential Zone", aqi: 90 },
  ];
  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return theme.colors.primary;
    if (aqi <= 100) return theme.colors.accent;
    if (aqi <= 200) return "orange";
    return "red";
  };
  return (
    <Card style={styles.card}>
      <Card.Title title="Pollution Hotspots" titleStyle={styles.cardTitle} />
      <Card.Content>
        {pollutionData.map((zone, index) => (
          <View key={index} style={styles.pollutionItem}>
            <Text style={styles.pollutionText}>{zone.zone} — AQI: {zone.aqi}</Text>
            <ProgressBar
              progress={Math.min(zone.aqi / 300, 1)}
              color={getAQIColor(zone.aqi)}
              style={styles.progressBar}
            />
          </View>
        ))}
      </Card.Content>
    </Card>
  );
};

const UpcomingMaintenanceWidget = () => {
  // Upcoming Maintenance data
  const theme = useTheme() as DynamicTheme;
  const styles = useStyles(theme as DynamicTheme);

  const maintenanceEvents = [
    { id: 1, area: "Sector 5", task: "Water Pipeline Inspection", date: "Apr 4, 2025" },
    { id: 2, area: "Old Town", task: "Street Repaving", date: "Apr 6, 2025" },
    { id: 3, area: "River District", task: "Electrical Grid Testing", date: "Apr 8, 2025" },
  ];
  return (
    <Card style={styles.card}>
      <Card.Title title="Upcoming Maintenance" titleStyle={styles.cardTitle} />
      <Card.Content>
        {maintenanceEvents.map((item) => (
          <List.Item
            key={item.id}
            title={`${item.task} — ${item.area}`}
            description={`Scheduled on ${item.date}`}
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDescription}
            left={(props) => <List.Icon {...props} icon="wrench" color={theme.colors.primary} />}
          />
        ))}
      </Card.Content>
    </Card>
  );
};

const RecentCitizenReportsWidget = () => {
  
  const theme = useTheme() as DynamicTheme; // Access the theme
  const styles = useStyles(theme as DynamicTheme);
  // Recent Citizen Reports data
  const citizenReports = [
    { id: 1, title: "Pothole on Main Street", date: "2025-04-02" },
    { id: 2, title: "Broken Streetlight in Elmwood", date: "2025-04-01" },
    { id: 3, title: "Water Leakage near Park", date: "2025-03-31" },
  ];
  return (
    <Card style={styles.card}>
      <Card.Title title="Recent Citizen Reports" titleStyle={styles.cardTitle} />
      <Card.Content>
        <ScrollView style={styles.scrollView}>
          {citizenReports.map((report) => (
            <List.Item
              key={report.id}
              title={report.title}
              description={`Reported on ${report.date}`}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              left={(props) => <List.Icon {...props} icon="alert-circle" color={theme.colors.primary} />}
            />
          ))}
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

const DepartmentOverviewWidget = () => {
  const theme = useTheme() as DynamicTheme; 
  const styles = useStyles(theme as DynamicTheme);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [totalDepartments, setTotalDepartments] = useState<number | null>(null);

  useEffect(() => {
    getTotalDepartmentsCount();
  }, []);

  const getTotalDepartmentsCount = async () => {
    try {
      const departments = await getAllDepartments();
      setTotalDepartments(departments.data?.getAllDepartments.length || 0);
    } catch (error) {
      console.error("Error fetching departments count:", error);
    }
  };

  return (
    <View style={styles.dashboardBox}>
      <Text style={styles.dashboardTitle}>Department Overview</Text>
      <View style={styles.flexRow}>
        <View>
          <Text style={styles.dashboardText}>
            Total Departments operating at this point:
          </Text>
          <Text style={styles.dashboardDescription}>
            This is the total number of departments active.
          </Text>
        </View>
        <Text style={styles.dashboardCount}>
          {totalDepartments !== null ? totalDepartments : "Loading..."}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.viewAllButton}
        onPress={() => navigation.navigate("Departments")}
      >
        <Text style={styles.viewAllButtonText}>View All Departments</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProjectStatusOverviewWidget = () => {
  const theme = useTheme() as DynamicTheme; 
  const styles = useStyles(theme as DynamicTheme);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [pendingCount, setPendingCount] = useState<number>(0);
  const [ongoingCount, setOngoingCount] = useState<number>(0);
  const [activeCount, setActiveCount] = useState<number>(0);

  const fetchProjectCounts = () => {
    setPendingCount(countPendingProjects());
    setOngoingCount(countOngoingProjects());
    setActiveCount(countActiveProjects());
  };

  useEffect(() => {
    fetchProjectCounts();
  }, []);

  return (
    <View style={styles.dashboardBox}>
      <Text style={styles.dashboardTitle}>Project Status Overview</Text>
      <View style={styles.statusRow}>
        <Text style={styles.statusText}>
          Pending Projects: <Text style={styles.statusValue}>{pendingCount}</Text>
        </Text>
        <Text style={styles.statusText}>
          Ongoing Projects: <Text style={styles.statusValue}>{ongoingCount}</Text>
        </Text>
        <Text style={styles.statusText}>
          Active Projects: <Text style={styles.statusValue}>{activeCount}</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.viewAllButton}
        onPress={() => navigation.navigate("Search")}
      >
        <Text style={styles.viewAllButtonText}>View All Projects</Text>
      </TouchableOpacity>
    </View>
  );
};

const RealtimeDashboardWidget = () => {
  const theme = useTheme() as DynamicTheme;
  const styles = useStyles(theme as DynamicTheme);
  // Define all available dashboard items
  const allDashboardItems = [
    { id: 1, label: "🚨 Water Leak Detected at Zone : ", value: " 4", visible: true },
    { id: 2, label: "🌡 Temperature Sensor : ", value: " 34.5°C", visible: true },
    { id: 3, label: "📶 Network Status : ", value: " Stable", visible: true },
    { id: 4, label: "💧 Reservoir Level : ", value: " 73%", visible: true },
    { id: 5, label: "⚡ Power Outage in : ", value: " Sector 3", visible: false },
    { id: 6, label: "🛑 Roadblock at ", value: " Main Street", visible: false },
    { id: 7, label: "📊 Air Quality Index: ", value: " Moderate", visible: false },
    { id: 8, label: "🚦 Traffic Light Malfunction at ", value: " Junction 5", visible: false },
    { id: 9, label: "🌧 Rainfall Detected: ", value: " 12mm", visible: false },
    { id: 10, label: "🔥 Fire Alarm Triggered in ", value: " Building A", visible: false },
  ];

  // State to manage visible dashboard items
  const [dashboardItems, setDashboardItems] = useState(allDashboardItems);
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode




  // Toggle visibility of a dashboard item
  const toggleItemVisibility = (id: number) => {
    setDashboardItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  };

  return (
    <>
      {/* Realtime Dashboard */}
      <View style={styles.dashboardBox}>
        <View style={styles.dashboardHeader}>
          <Text style={styles.dashboardTitle}>Realtime Dashboard</Text>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Image
              source={require("../../assets/pencil.png")}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>
        {dashboardItems
          .filter((item) => item.visible) // Always show the first 4 visible items
          .map((item) => (
            <Text key={item.id} style={styles.dashboardText}>
              {item.label}
              <Text key={item.id} style={styles.dashboardTextValue}>
                {item.value}
              </Text>
            </Text>
          ))}
      </View>

      {/* Customization Section */}
      {isEditing && (
        <View style={styles.customizationBox}>
          <Text style={styles.customizationTitle}>All updates</Text>
          {dashboardItems.map((item) => (
            <View key={item.id} style={styles.customizationItem}>
              <Text style={styles.customizationLabel}>{item.label}{item.value}</Text>
              <Switch
                value={item.visible}
                onValueChange={() => toggleItemVisibility(item.id)}
              />
            </View>
          ))}
        </View>
      )}</>
  );
};

export const HomeScreen: React.FC = () => {
  const theme = useTheme();

  const styles = useStyles(theme as DynamicTheme);

  const userState = useSelector((state: RootState) => state.user);
  const [activeWidgets, setActiveWidgets] = useState(["RealtimeDashboard", "DepartmentOverview", "ProjectStatusOverview", "PollutionHotspotsWidget", "UpcomingMaintenanceWidget", "RecentCitizenReportsWidget"]);
  const [isEditing, setIsEditing] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

  useEffect(() => {
    // Hide the welcome message after 3 seconds
    const timer = setTimeout(() => setShowWelcomeMessage(false), 5000);
    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  const widgetComponents: { [key: string]: JSX.Element } = {
    RealtimeDashboard: <RealtimeDashboardWidget />,
    DepartmentOverview: <DepartmentOverviewWidget />,
    ProjectStatusOverview: <ProjectStatusOverviewWidget />,
    PollutionHotspotsWidget: <PollutionHotspotsWidget />,
    UpcomingMaintenanceWidget: <UpcomingMaintenanceWidget />,
    RecentCitizenReportsWidget: <RecentCitizenReportsWidget />,
  };

  const toggleWidget = (widget: string) => {
    setActiveWidgets((prev) =>
      prev.includes(widget)
        ? prev.filter((w) => w !== widget)
        : [...prev, widget]
    );
  };

  return (
    <>
      {/* Welcome Message Widget */}
      {showWelcomeMessage && (
        <View style={styles.welcomeWidget}>
          <Text style={styles.welcomeWidgetText}>
            Login successful, welcome back!
          </Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>CityLayer Dashboard</Text>
        <View style={styles.flexRow}>
          <Text style={styles.welcomeMessage}>Welcome, {userState.firstName} 👋</Text>

          {/* Edit Button */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Text style={styles.editButtonText}>
              {isEditing ? "Done" : "Widgets "}
            </Text>
            <Image
              source={require("../../assets/pencil.png")}
              style={styles.editIcontTwo}
            />
          </TouchableOpacity>
        </View>

        {/* Display Widgets */}
        {!isEditing &&
          activeWidgets.map((widget) => (
            <View key={widget}>{widgetComponents[widget]}</View>
          ))}

        {/* Edit Mode */}
        {isEditing && (
          <View style={styles.editModeContainer}>
            <Text style={styles.editModeTitle}>Customize Widgets</Text>
            {Object.keys(widgetComponents).map((widget) => (
              <View key={widget} style={styles.widgetToggle}>
                <Text style={styles.widgetLabel}>{widget}</Text>
                <Switch
                  value={activeWidgets.includes(widget)}
                  onValueChange={() => toggleWidget(widget)}
                />
              </View>
            ))}
          </View>
        )}

      </ScrollView>
    </>
  );
};

const useStyles = (theme: DynamicTheme) => StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    padding: 20,
    backgroundColor: theme.colors.white,
  },
  welcomeWidget: {
    backgroundColor: theme.colors.surface,
    padding: 10,
    borderRadius: 0,
    alignItems: "center",
  },
  welcomeWidgetText: {
    color: theme.colors.backdrop,
    fontSize: 14,
    fontWeight: "bold",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: theme.colors.text,
  },
  welcomeMessage: {
    fontSize: 16,
    marginBottom: 20,
    color: theme.colors.text,
  },
  dashboardBox: {
    backgroundColor: theme.colors.backdrop,
    padding: 20,
    paddingVertical: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  dashboardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  editIcon: {
    width: 20,
    height: 20,
    tintColor: theme.colors.primary,
  },
  editIcontTwo: {
    width: 15,
    height: 15,
    tintColor: theme.colors.backdrop,
  },
  dashboardText: {
    fontSize: 14,
    color: theme.colors.grey,
    marginBottom: 5,
  },
  dashboardTextValue: {
    color: theme.colors.surface,
    fontWeight: "bold",
    marginBottom: 5,
  },
  customizationBox: {
    width: "100%",
    backgroundColor: "#2e2e2e",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  customizationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 10,
  },
  customizationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  customizationLabel: {
    fontSize: 14,
    color: theme.colors.white,
  },
  dashboardCount: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginVertical: 0,
    paddingRight: 10,
    textAlign: "right",
  },
  dashboardDescription: {
    fontSize: 12,
    width: "80%",
    color: theme.colors.text,
    marginBottom: 15,
    textAlign: "left",
  },
  viewAllButton: {
    backgroundColor: theme.colors.grey,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    textAlign: "center",
  },
  viewAllButtonText: {
    color: theme.colors.backdrop,
    fontSize: 16,
    fontWeight: "bold",
  },
  statusRow: {
    marginBottom: 15,
  },
  statusText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  statusValue: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  card: {
    backgroundColor: theme.colors.backdrop,
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  cardTitle: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  pollutionItem: {
    marginVertical: 8,
  },
  pollutionText: {
    color: theme.colors.grey,
    marginBottom: 5,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  listTitle: {
    color: theme.colors.grey,
  },
  listDescription: {
    color: theme.colors.placeholder,
  },
  scrollView: {
    maxHeight: 200,
  },
  editButton: {
    flexDirection: "row",
    // backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  editButtonText: {
    color: theme.colors.backdrop,
    fontSize: 16,
    fontWeight: "bold",
  },
  editModeContainer: {
    backgroundColor: theme.colors.backdrop,
    padding: 20,
    borderRadius: 8,
  },
  editModeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 10,
  },
  widgetToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  widgetLabel: {
    fontSize: 16,
    color: theme.colors.surface,
  },
});

export default HomeScreen;