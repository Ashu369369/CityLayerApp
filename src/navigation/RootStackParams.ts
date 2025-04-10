export type RootStackParamList = {
  Home: undefined;
  Signup: undefined;
  Search: undefined;
  Login: undefined;
  Departments: { refresh?: boolean };
  Profile: undefined;
  Department: {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
  };
  Project: {
    projectid: number;
  };
  Edit: {
    type: string;
    id: number;
  };
  CreateNew: {
    type: string;
    id?: number;
  };
  MainNavBar: undefined;

  Program: { programId: number };
  Programs: undefined;

  //by Arsh for testing purpose
  EditDepartment: {
    departmentId: number;
  };
  AddDepartment: undefined;
  Feedback: { onSubmit: () => void; onCancel: () => void };
  Feedbacks: undefined;
};
