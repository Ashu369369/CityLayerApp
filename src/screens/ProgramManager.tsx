import React, { useState } from "react";
import programsData from "../demoData/programs"; // path to your demo data
import { useTheme } from "react-native-paper";
import { DynamicTheme } from "../theme/theme";
// import useStyles from "../styles/ProgramManagerStyles"; // path to your styles


const ProgramManager = () => {
  
  // const theme = useTheme();
  // const styles = useStyles(theme as DynamicTheme);
  const [programs, setPrograms] = useState(programsData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updated = [...programs];
    updated[index] = { ...updated[index], [name]: value };
    setPrograms(updated);
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
  };

  const handleSave = () => {
    setEditingIndex(null);
    console.log("Updated Programs:", programs); // Replace with API call if needed
  };

  return (
    <div className="p-4 space-y-4">
      {programs.map((program, index) => (
        <div key={program.programid} className="border p-4 rounded shadow">
          {editingIndex === index ? (
            <>
              <input
                type="text"
                name="name"
                value={program.name}
                onChange={(e) => handleChange(e, index)}
                className="border p-2 w-full mb-2"
              />
              <textarea
                name="description"
                value={program.description}
                onChange={(e) => handleChange(e, index)}
                className="border p-2 w-full mb-2"
              />
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold">{program.name}</h2>
              <p>{program.description}</p>
              <button
                onClick={() => handleEditClick(index)}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              >
                Edit
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgramManager;
