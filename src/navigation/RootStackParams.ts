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
  Project: {
    projectId: number;
  };
  MainNavBar: undefined;
  Program: { programId: number };
  Programs: undefined;
};
