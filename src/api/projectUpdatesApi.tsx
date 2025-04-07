// projectUpdates.ts
import { projectUpdates } from "../demoData/projectUpdates"; // Assuming you have demo data similar to your previous example

export interface ProjectUpdate {
  id: number;
  description: string;
  dateAndTime: string;
  projectId: number;
  createdBy: string;
  mediaFiles: string[];
  location: string;
}

export const getProjectUpdatesByProjectId = (
  projectId: number
): ProjectUpdate[] => {
  return projectUpdates.filter((update) => update.projectId === projectId);
};

export const getProjectUpdateById = (id: number): ProjectUpdate | undefined => {
  return projectUpdates.find((update) => update.id === id);
};

export const deleteProjectUpdate = (id: number): void => {
  const index = projectUpdates.findIndex((update) => update.id === id);
  if (index !== -1) {
    projectUpdates.splice(index, 1);
  }
};
