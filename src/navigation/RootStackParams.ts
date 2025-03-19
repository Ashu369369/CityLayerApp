export type RootStackParamList = {
  Home: undefined;
  Signup: undefined;
  Search: undefined;
  Login: undefined;
  Departments: undefined;
  Profile: undefined;
  Department: {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
  };
  ProjectDetails: {
    projectid: number;
    title: string;
    description: string;
    startdate: string;
    duedate: string;
    status: string;
    assignedto: number;
    workforce: { team: string[] };
    budget: number;
    timeline: string;
    departmentid: number;
    createdat: string;
  };
  MainNavBar: undefined;
};
