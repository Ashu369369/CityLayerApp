import { Project } from "../api/projectApi";

export const demoProjects: Project[] = [
  {
    projectid: 1,
    title: "Project Alpha",
    description: "Description for Project Alpha",
    startdate: "2023-01-01",
    duedate: "2023-06-01",
    status: "Active",
    assignedto: 101,
    workforce: { team: ["Alice", "Bob"] },
    budget: 10000.0,
    timeline: "Q1 2023",
    departmentid: 1,
    createdat: "2023-01-01T00:00:00Z",
    updatedat: "2024-04-10T00:00:00Z",
  },
  {
    projectid: 2,
    title: "Project Beta",
    description: "Description for Project Beta",
    startdate: "2023-02-01",
    duedate: "2023-07-01",
    status: "Active",
    assignedto: 102,
    workforce: { team: ["Charlie", "Dave"] },
    budget: 15000.0,
    timeline: "Q2 2023",
    departmentid: 2,
    createdat: "2023-02-01T00:00:00Z",
    updatedat: "2024-04-10T00:00:00Z",
  },
  {
    projectid: 3,
    title: "Project Gamma",
    description: "Develop a mobile application for tracking expenses.",
    startdate: "2023-03-01",
    duedate: "2023-09-01",
    status: "Pending",
    assignedto: 103,
    workforce: { team: ["Eve", "Frank"] },
    budget: 20000.0,
    timeline: "Q3 2023",
    departmentid: 3,
    createdat: "2023-03-01T00:00:00Z",
    updatedat: "2024-04-10T00:00:00Z",
  },
  {
    projectid: 4,
    title: "Project Omega",
    description: "Develop an AI-powered virtual assistant.",
    startdate: "2023-05-01",
    duedate: "2023-10-01",
    status: "Active",
    assignedto: 111,
    workforce: { team: ["Uma", "Victor"] },
    budget: 25000.0,
    timeline: "Q4 2023",
    departmentid: 1,
    createdat: "2023-05-01T00:00:00Z",
    updatedat: "2024-04-10T00:00:00Z",
  },
  {
    projectid: 5,
    title: "Project Sigma",
    description: "Optimize cloud storage infrastructure.",
    startdate: "2023-06-15",
    duedate: "2023-12-15",
    status: "Active",
    assignedto: 112,
    workforce: { team: ["Walter", "Xena"] },
    budget: 27000.0,
    timeline: "Q1 2024",
    departmentid: 2,
    createdat: "2023-06-15T00:00:00Z",
    updatedat: "2024-04-10T00:00:00Z",
  },
  {
    projectid: 6,
    title: "Project Delta",
    description: "Enhance cybersecurity measures.",
    startdate: "2023-07-01",
    duedate: "2024-01-01",
    status: "Active",
    assignedto: 113,
    workforce: { team: ["Yuki", "Zane"] },
    budget: 30000.0,
    timeline: "Q2 2024",
    departmentid: 3,
    createdat: "2023-07-01T00:00:00Z",
    updatedat: "2024-04-10T00:00:00Z",
  },
  {
    projectid: 7,
    title: "Project Kappa",
    description: "Deploy a blockchain-based transaction system.",
    startdate: "2023-08-10",
    duedate: "2024-02-10",
    status: "Pending",
    assignedto: 114,
    workforce: { team: ["Alice", "Charlie"] },
    budget: 32000.0,
    timeline: "Q3 2024",
    departmentid: 1,
    createdat: "2023-08-10T00:00:00Z",
    updatedat: "2024-04-10T00:00:00Z",
  },
  {
    projectid: 8,
    title: "Project Theta",
    description: "Develop a real-time collaboration tool.",
    startdate: "2023-09-05",
    duedate: "2024-03-05",
    status: "Ongoing",
    assignedto: 115,
    workforce: { team: ["Bob", "Eve"] },
    budget: 28000.0,
    timeline: "Q4 2024",
    departmentid: 2,
    createdat: "2023-09-05T00:00:00Z",
    updatedat: "2024-04-10T00:00:00Z",
  },
  {
    projectid: 9,
    title: "Project Iota",
    description: "Upgrade company-wide analytics platform.",
    startdate: "2023-10-01",
    duedate: "2024-04-01",
    status: "Active",
    assignedto: 116,
    workforce: { team: ["Frank", "Grace"] },
    budget: 35000.0,
    timeline: "Q1 2025",
    departmentid: 3,
    createdat: "2023-10-01T00:00:00Z",
    updatedat: "2024-04-10T00:00:00Z",
  },
  {
    projectid: 10,
    title: "Project Lambda",
    description: "Implement an IoT monitoring system.",
    startdate: "2023-11-15",
    duedate: "2024-05-15",
    status: "Pending",
    assignedto: 117,
    workforce: { team: ["Heidi", "Ivan"] },
    budget: 40000.0,
    timeline: "Q2 2025",
    departmentid: 1,
    createdat: "2023-11-15T00:00:00Z",
    updatedat: "2024-04-10T00:00:00Z",
  },
  {
    projectid: 11,
    title: "Project Nu",
    description: "Develop a 5G network optimization tool.",
    startdate: "2023-12-01",
    duedate: "2024-06-01",
    status: "Ongoing",
    assignedto: 118,
    workforce: { team: ["Judy", "Ken"] },
    budget: 45000.0,
    timeline: "Q3 2025",
    departmentid: 2,
    createdat: "2023-12-01T00:00:00Z",
    updatedat: "2024-04-10T00:00:00Z",
  },
  {
    projectid: 12,
    title: "Project Xi",
    description: "Design a VR-based educational platform.",
    startdate: "2024-01-10",
    duedate: "2024-07-10",
    status: "Active",
    assignedto: 119,
    workforce: { team: ["Lara", "Mike"] },
    budget: 50000.0,
    timeline: "Q4 2025",
    departmentid: 3,
    createdat: "2024-01-10T00:00:00Z",
    updatedat: "2024-04-10T00:00:00Z",
  },
  {
    projectid: 13,
    title: "Project Omicron",
    description: "Develop an AI-powered recommendation engine.",
    startdate: "2024-02-15",
    duedate: "2024-08-15",
    status: "Pending",
    assignedto: 120,
    workforce: { team: ["Nina", "Oscar"] },
    budget: 55000.0,
    timeline: "Q1 2026",
    departmentid: 1,
    createdat: "2024-02-15T00:00:00Z",
    updatedat: "2024-04-10T00:00:00Z",
  },
  {
    projectid: 14,
    title: "Project Rho",
    description: "Enhance logistics and supply chain automation.",
    startdate: "2024-03-01",
    duedate: "2024-09-01",
    status: "Ongoing",
    assignedto: 121,
    workforce: { team: ["Pam", "Quinn"] },
    budget: 60000.0,
    timeline: "Q2 2026",
    departmentid: 2,
    createdat: "2024-03-01T00:00:00Z",
    updatedat: "2024-04-10T00:00:00Z",
  },
  {
    projectid: 15,
    title: "Project Sigma-2",
    description: "Develop a next-gen AI chatbot.",
    startdate: "2024-04-10",
    duedate: "2024-10-10",
    status: "Active",
    assignedto: 122,
    workforce: { team: ["Rachel", "Sam"] },
    budget: 65000.0,
    timeline: "Q3 2026",
    departmentid: 3,
    createdat: "2024-04-10T00:00:00Z",
    updatedat: "2024-04-10T00:00:00Z",
  },
];
