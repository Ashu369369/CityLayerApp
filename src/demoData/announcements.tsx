const announcements = [
  {
    announcementId: 1,
    departmentId: 1,
    messageTitle: "System Maintenance Scheduled",
    messageBody:
      "The system will be down for maintenance on March 25, 2025, from 2 AM to 4 AM.",
    targetRoles: { roles: ["Admin", "Manager"] },
    targetArea: "IT Department",
    createdBy: 5,
    createdAt: new Date().toISOString(),
  },
  {
    announcementId: 2,
    departmentId: 1,
    messageTitle: "New HR Policies Update",
    messageBody:
      "Please review the updated HR policies effective from April 1, 2025.",
    targetRoles: { roles: ["Employee", "HR"] },
    targetArea: "Human Resources",
    createdBy: 3,
    createdAt: new Date().toISOString(),
  },
  {
    announcementId: 3,
    departmentId: 1,
    messageTitle: "Office Relocation Notice",
    messageBody:
      "The finance department will be relocating to the 5th floor on March 30, 2025.",
    targetRoles: { roles: ["Finance", "Admin"] },
    targetArea: "Finance Department",
    createdBy: 7,
    createdAt: new Date().toISOString(),
  },
];

export default announcements;
