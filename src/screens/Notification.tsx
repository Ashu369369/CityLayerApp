import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Alert } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import notificationsData, { markNotificationAsRead } from "../demoData/notifications"; // Import the function
import useStyles from "../styles/Notifications";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useFocusEffect } from "@react-navigation/native";
import { DynamicTheme } from "../theme/theme";

const NotificationsScreen: React.FC = () => {
  
  const theme = useTheme();
  const styles = useStyles(theme as DynamicTheme);
  const currentUserId = useSelector((state: RootState) => state.user.id); 
  const currentUserRole = useSelector((state: RootState) => state.user.role); // Get the user's role

  // Sort notifications by createdAt in descending order (latest first)
  const [notifications, setNotifications] = useState(
    [...notificationsData].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  );

  // Function to delete a notification
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
            setNotifications(updatedNotifications); // Update the local state
          },
        },
      ]
    );
  };

  // Mark notifications as read on unmount
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        notificationsData.forEach((notification) => {
          if (!notification.readBy.includes(currentUserId ? currentUserId : 0)) {
            markNotificationAsRead(notification.notificationId, currentUserId ? currentUserId : 0); // Mark as read if not already
          }
        });
        setNotifications(
          [...notificationsData].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        ); // Update the local state and sort by latest first
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

  const renderNotification = ({ item }: { item: typeof notificationsData[0] }) => {
    const isRead = item.readBy.includes(currentUserId ? currentUserId : 0); // Check if the notification is read by the current user
    const severityStyle = getSeverityStyle(item.severity);

    return (
      <Card
        style={[
          styles.notificationCard,
          severityStyle,
          !isRead && styles.unreadNotification, // Apply background color for unread notifications
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
            Created At: {new Date(item.createdAt).toLocaleDateString()}
          </Text>
          {/* Conditionally render the delete button for admins */}
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
      <FlatList
        data={notifications}
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