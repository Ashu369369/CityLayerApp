export type RootStackParamList = {
  HomeTab: undefined,
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
  CreatePost: {
    id: number;
    type: string;
  };
  MainNavBar: undefined;
  Program: { programId: number };
  Notifications: undefined;
  CreateNotification: undefined;
  Feedback: { onSubmit: () => void; onCancel: () => void };
  Feedbacks: undefined;
};
