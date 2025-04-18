import announcements from "../demoData/announcements";

export interface Announcement {
  announcementId: number;
  departmentId?: number;
  messageTitle: string;
  messageBody: string;
  targetroles?: any;
  targetarea?: string;
  createdby?: number;
  createdat?: string;
}

export const getAnnouncementsByDepartmentId = (
  departmentId: number
): Announcement[] => {
  return announcements.filter(
    (announcement) => announcement?.departmentId == departmentId
  );
};

export const getAnnouncementById = (
  announcementId: number
): Announcement | undefined => {
  return announcements.find(
    (announcement) => announcement.announcementId === announcementId
  );
};

export const deleteAnnouncement = (announcementId: number): void => {
  const index = announcements.findIndex(
    (announcement) => announcement.announcementId === announcementId
  );
  if (index !== -1) {
    announcements.splice(index, 1);
  }
};
export const createAnnouncement = (newAnnouncement: Announcement): void => {
  const nextId = announcements.length + 1;
  announcements.push({
    ...newAnnouncement,
    announcementId: nextId,
    departmentId: newAnnouncement.departmentId ?? 0,
    targetRoles: newAnnouncement.targetroles || { roles: [] },
    targetArea: newAnnouncement.targetarea || "",
    createdBy: newAnnouncement.createdby || 0,
    createdAt: newAnnouncement.createdat || new Date().toISOString(),
  });
};
