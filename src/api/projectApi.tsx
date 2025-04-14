import { ProjectPrivacy } from "expo/config";
import { demoProjects } from "../demoData/projects";
import { customfieldproject } from "../demoData/customFields";

export interface CustomField {
  customId: number;
  projectId: number;
  fieldName: string;
  fieldValue: string;
}
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

  customFields?: CustomField[];
}

export const getAllProjects = (): Project[] => {
  return demoProjects;
};

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

export const createProject = (newProject: Project): void => {
    if (newProject.customFields && newProject.customFields.length > 0) {
      newProject.customFields.forEach((cf) => {
        customfieldproject.push({
          customId: (customfieldproject.length+1),
          projectId: newProject.projectid,
          fieldName: cf.fieldName,
          fieldValue: cf.fieldValue,
        });
      })
  }
  delete newProject.customFields;
  demoProjects.push(newProject);
};

export const getCustomFieldsByProjectId = (projectId: number): CustomField[] => {
  return customfieldproject.filter((field) => field.projectId === projectId);
};