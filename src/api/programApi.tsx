import programs from "../demoData/programs";

export interface Program {
  programid: number;
  name: string;
  description: string;
  startDate: string;
  duration: number;
  endDate: string | null;
  isRepeat: boolean;
  repeatAfter:
    | { type: string; value: number; date?: undefined; day?: undefined }
    | { type: string; day: number; value?: undefined; date?: undefined }
    | { type: string; date: string; value?: undefined; day?: undefined }
    | null;
  createdBy: number;
  createdAt: string;
  departmentId: number;
}

// Create a mutable copy of the original programs
let programStore: Program[] = [...programs];

// Get all programs
export const getAllPrograms = (): Program[] => {
  return programStore;
};

// Get programs by department ID
export const getProgramsByDepartmentId = (departmentId: number): Program[] => {
  return programStore.filter((program) => program.departmentId == departmentId);

};

// Get programs by creator ID
export const getProgramsByCreator = (creatorId: number): Program[] => {
  return programStore.filter((program) => program.createdBy === creatorId);
};

// Get a program by its ID
export const getProgramById = (programId: number): Program | undefined => {
  return programStore.find((program) => program.programid === programId);
};

// Delete a program by its ID
export const deleteProgram = (programId: number): void => {
  const index = programStore.findIndex(
    (program) => program.programid === programId
  );
  if (index !== -1) {
    programStore.splice(index, 1);
  }
};

// Create a new program and add it to the store
export const createProgram = (newProgram: Program): void => {
  const parsedRepeatAfter =
    newProgram.repeatAfter?.value !== undefined
      ? {
          type: newProgram.repeatAfter.type,
          value: newProgram.repeatAfter.value,
        }
      : newProgram.repeatAfter?.day !== undefined
      ? {
          type: newProgram.repeatAfter.type,
          day: newProgram.repeatAfter.day,
        }
      : newProgram.repeatAfter?.date !== undefined
      ? {
          type: newProgram.repeatAfter.type,
          date: newProgram.repeatAfter.date,
        }
      : null;

  programStore.push({
    ...newProgram,
    endDate: newProgram.endDate ?? null,
    repeatAfter: parsedRepeatAfter,
  });
};
