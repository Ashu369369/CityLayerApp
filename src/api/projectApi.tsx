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
}

export const getProjectsByDepartmentId = (departmentId: number): Project[] => {
  return demoProjects.filter(project => project.departmentid == departmentId);
};