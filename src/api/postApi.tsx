import Constants from "expo-constants";
import projectUpdates from "../demoData/programPosts";

const baseUrl = `http://${Constants.expoConfig?.extra?.config}:4000/graphql`; // Replace with your GraphQL backend URL

// Function to create a new post
export const createPost = (newPost: {
  programId: number;
  leaderId: number;
  textContent: string;
  location: string;
  mediaFiles: { type: string; url: string }[];
  createdBy: number;
}) => {
  const newPostWithId = {
    ...newPost,
    updateId: projectUpdates.length + 1, // Generate a new unique ID
    createdAt: new Date().toISOString(),
  };

  projectUpdates.push(newPostWithId); 
  return newPostWithId; // Return the newly created post
};

// Function to get posts by projectId
export const getPostsByProjectId = (programId: number) => {
  return projectUpdates.filter((post) => post.programId === programId);
};