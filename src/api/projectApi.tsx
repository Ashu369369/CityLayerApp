import { ProjectPrivacy } from "expo/config";
import { demoProjects } from "../demoData/projects";

export interface Project {
  projectid: number;
  title: string;
  description: string;
  startdate: string;
  duedate: string;
  status: string;
  assignedto: number;
  workforce: any;
  budget: number;
  timeline: string;
  departmentid: number;
  createdat: string;
  updatedat: string;
}

export const getProjectsByDepartmentId = (departmentId: number): Project[] => {
  return demoProjects.filter((project) => project.departmentid == departmentId);
};

export const getProjectById = (projectId: number): Project | undefined => {
  return demoProjects.find((project) => project.projectid == projectId);
};

export const deleteProject = (projectId: number): void => {
  const index = demoProjects.findIndex(
    (project) => project.projectid == projectId
  );
  demoProjects.splice(index, 1);
};

export const countPendingProjects = (): number => {
return demoProjects.filter((project) => project.status === "Pending").length;
};

export const countOngoingProjects = (): number => {
  return demoProjects.filter((project) => project.status === "Ongoing").length;
};

export const countActiveProjects = (): number => {
  return demoProjects.filter((project) => project.status === "Active").length;
};