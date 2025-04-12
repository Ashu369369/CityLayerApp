import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Alert } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import notificationsData, { markNotificationAsRead } from "../demoData/notifications";
import useStyles from "../styles/Notifications";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useFocusEffect } from "@react-navigation/native";
import { DynamicTheme } from "../theme/theme";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { formatDate } from "../Tools/formatDate";

const NotificationsScreen: React.FC = () => {
  const theme = useTheme();
  const dateFormat = useSelector((state : RootState) => state.preferences.dateFormat);
  const styles = useStyles(theme as DynamicTheme);
  const currentUserId = useSelector((state: RootState) => state.user.id);
  const currentUserRole = useSelector((state: RootState) => state.user.role);

  const [notifications, setNotifications] = useState(
    [...notificationsData].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  );

  const [severityFilter, setSeverityFilter] = useState("");

  const filteredNotifications = notifications.filter((notification) => {
    if (severityFilter === "") return true; // Show all notifications if no filter is selected
    return notification.severity === severityFilter.toLowerCase(); // Match severity
  });

  const handleDeleteNotification = (notificationId: number) => {
    Alert.alert(
      "Delete Notification",
      "Are you sure you want to delete this notification?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedNotifications = notifications.filter(
              (notification) => notification.notificationId !== notificationId
            );
            setNotifications(updatedNotifications);
          },
        },
      ]
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        notificationsData.forEach((notification) => {
          if (!notification.readBy.includes(currentUserId ? currentUserId : 0)) {
            markNotificationAsRead(notification.notificationId, currentUserId ? currentUserId : 0);
          }
        });
        setNotifications(
          [...notificationsData].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        );
      };
    }, [currentUserId])
  );

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case "important":
        return styles.severityImportant;
      case "warning":
        return styles.severityWarning;
      case "general":
        return styles.severityGeneral;
      default:
        return styles.severityDefault;
    }
  };
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "important":
        return theme.colors.error || "red"; // Use theme color or fallback
      case "warning":
        return "#FFA500";
      case "general":
        return theme.colors.primary || "blue"; // Use theme color or fallback
      default:
        return "gray";
    }
  };

  const renderNotification = ({ item }: { item: typeof notificationsData[0] }) => {
    const isRead = item.readBy.includes(currentUserId ? currentUserId : 0);
    const severityStyle = getSeverityStyle(item.severity);

    return (
      <Card
        style={[
          styles.notificationCard,
          severityStyle,
          !isRead && styles.unreadNotification,
        ]}
      >
        <Card.Content>
          <Text variant="headlineSmall" style={styles.notificationTitle}>
            {item.title}
          </Text>
          <Text variant="bodyMedium" style={styles.notificationDescription}>
            {item.description}
          </Text>
          <Text variant="bodySmall" style={styles.notificationMeta}>
            Created At: {formatDate(item.createdAt, dateFormat)}
          </Text>
          {currentUserRole === 3 && (
            <TouchableOpacity
              onPress={() => handleDeleteNotification(item.notificationId)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          )}
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {["Important", "Warning", "General"].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.filterButton,
              severityFilter === level && styles.activeFilterButton,
            ]}
            onPress={() =>
              setSeverityFilter(severityFilter === level ? "" : level) // Toggle filter
            }
          >
            <View style={styles.filterItem}>
              <View
                style={[
                  styles.severityDot,
                  { backgroundColor: getSeverityColor(level) },
                ]}
              />
              <Text
                style={[
                  styles.filterButtonText,
                  severityFilter === level && styles.activeFilterButtonText,
                ]}
              >
                {level}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.notificationId.toString()}
        renderItem={renderNotification}
        ListEmptyComponent={
          <Text variant="bodyLarge" style={styles.noNotifications}>
            No notifications available.
          </Text>
        }
      />
    </View>
  );
};

export default NotificationsScreen;