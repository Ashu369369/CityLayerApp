const notifications: {
  notificationId: number;
  departmentId: number;
  roleId: number;
  title: string;
  description: string;
  severity: string;
  taggedFor: number;
  createdBy: number;
  createdAt: string;
  readBy: number[];
}[] = [
  {
    notificationId: 1,
    departmentId: 1,
    roleId: 1, // Admin
    title: "Scheduled System Update",
    description: "The system will undergo maintenance on April 5, 2025, from 2 AM to 4 AM.",
    severity: "important",
    taggedFor: 2, // Manager
    createdBy: 1,
    createdAt: "2025-01-01T10:00:00Z", // Specific date
    readBy: [7],
  },
  {
    notificationId: 2,
    departmentId: 2,
    roleId: 1, // HR
    title: "Policy Changes",
    description: "New HR policies will take effect on April 15, 2025. Please review them in the portal.",
    severity: "general",
    taggedFor: 4, // Employee
    createdBy: 3,
    createdAt: "2025-02-28T14:30:00Z", // Specific date
    readBy: [6],
  },
  {
    notificationId: 3,
    departmentId: 3,
    roleId: 3, // Finance
    title: "Budget Submission Reminder",
    description: "All departments must submit Q2 budgets by April 10, 2025.",
    severity: "warning",
    taggedFor: 1, // Admin
    createdBy: 6,
    createdAt: "2025-03-25T09:15:00Z", // Specific date
    readBy: [6],
  },
  {
    notificationId: 4,
    departmentId: 1,
    roleId: 2, // IT
    title: "VPN Access Issue",
    description: "Some users are experiencing issues accessing VPN. A fix is being deployed.",
    severity: "important",
    taggedFor: 4, // Employee
    createdBy: 5,
    createdAt: "2025-03-30T16:45:00Z", // Specific date
    readBy: [6],
  },
  {
    notificationId: 5,
    departmentId: 4,
    roleId: 3, // Employee
    title: "Team Outing Scheduled",
    description: "A team outing is scheduled for April 20th. RSVP by April 10th.",
    severity: "general",
    taggedFor: 4,
    createdBy: 4,
    createdAt: "2025-03-27T12:00:00Z", // Specific date
    readBy: [6, 8],
  },
  {
    notificationId: 6,
    departmentId: 2,
    roleId: 2,
    title: "Mandatory Compliance Training",
    description: "All staff must complete the compliance training by April 25, 2025.",
    severity: "warning",
    taggedFor: 4,
    createdBy: 3,
    createdAt: "2025-03-29T08:30:00Z", // Specific date
    readBy: [6, 7, 8],
  },
  {
    notificationId: 7,
    departmentId: 1,
    roleId: 1,
    title: "Network Downtime",
    description: "There will be intermittent network issues between 1 PM and 3 PM today.",
    severity: "important",
    taggedFor: 5,
    createdBy: 2,
    createdAt: "2025-03-31T11:00:00Z", // Specific date
    readBy: [6, 7, 8],
  },
  {
    notificationId: 8,
    departmentId: 3,
    roleId: 1,
    title: "New Expense Policy",
    description: "Expense reports must now be submitted via the new portal only.",
    severity: "general",
    taggedFor: 2,
    createdBy: 6,
    createdAt: "2025-03-26T13:45:00Z", // Specific date
    readBy: [6, 7, 8],
  },
  {
    notificationId: 9,
    departmentId: 4,
    roleId: 4,
    title: "Weekly Stand-up Moved",
    description: "This week’s stand-up will be held at 10 AM instead of 9 AM.",
    severity: "general",
    taggedFor: 4,
    createdBy: 4,
    createdAt: "2025-03-29T15:00:00Z", // Specific date
    readBy: [6, 7, 8],
  },
  {
    notificationId: 10,
    departmentId: 2,
    roleId: 3,
    title: "New Onboarding Procedure",
    description: "HR has updated the onboarding flow for new employees. Check the handbook.",
    severity: "important",
    taggedFor: 4,
    createdBy: 3,
    createdAt: "2025-03-28T10:30:00Z", // Specific date
    readBy: [6, 7, 8],
  },
];

export const markNotificationAsRead = (notificationId: number, userId: number) => {
  const notification = notifications.find((n) => n.notificationId === notificationId);
  if (notification && !notification.readBy.includes(userId)) {
    notification.readBy.push(userId);
  }
};

export default notifications;
