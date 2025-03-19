import programs from "../demoData/programs";

export interface Program {
  programid: number;
  name: string;
  description: string;
  startDate: string;
  duration: number;
  endDate: string | null;
  isRepeat: boolean;
  repeatAfter: {
    type: string;
    value?: number;
    day?: number;
    date?: string;
  } | null;
  createdBy: number;
  createdAt: string;
  departmentId: number; // Assuming this field exists
}

// Get programs by department ID
export const getProgramsByDepartmentId = (departmentId: number): Program[] => {
  return programs.filter(
    (program: Program) => program.departmentId == departmentId
  );
};

// Get programs by creator ID
export const getProgramsByCreator = (creatorId: number): Program[] => {
  return programs.filter((program: Program) => program.createdBy === creatorId);
};

// Get a program by its ID
export const getProgramById = (programId: number): Program | undefined => {
  return programs.find((program: Program) => program.programid === programId);
};
