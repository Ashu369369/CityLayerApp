import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/RootStackParams";

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ErrorBox from "../component/ErrorBox"; // Import the ErrorBox component
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../state/slices/userSlice";
import { setToken } from "../state/slices/authSlice";
import { loginUser, LoginUserResponse, GraphQLResponse } from "../api/userApi";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

type FormData = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Handle input changes
  const handleChange = (name: keyof FormData, value: string) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error when the user starts typing
  };

  // Validation logic
  const validateField = (name: keyof FormData, value: string) => {
    let error = "";
    switch (name) {
      case "username":
        if (!value.trim()) error = "Username is required.";
        break;
      case "password":
        if (!value.trim()) error = "Password is required.";
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleLogin = async () => {
    let allValid = true;
    const newErrors: Partial<FormData> = {};

    // Check each field for validity
    Object.keys(formData).forEach((key) => {
      const field = key as keyof FormData;
      const value = formData[field];
      if (!value.trim()) {
        newErrors[field] = `${field} is required.`; // Add error if empty
        allValid = false;
      } else {
        validateField(field, value); // Validate each field
      }
    });

    setErrors(newErrors); // Display all errors if any

    if (allValid) {
      // Proceed only if all fields are valid
      try {
        const response: GraphQLResponse<LoginUserResponse> = await loginUser(formData);

        if (response?.errors) {
          // If errors exist, handle them
          console.log("GraphQL errors:", response.errors);
          alert("Error: " + response.errors[0]?.message || "An unknown error occurred");
          return;
        }
        let message = response?.data?.login?.message;
        let token = response?.data?.login?.token;
        let user = {
          id: response?.data?.login?.id,
          username: response?.data?.login?.username,
          firstName: response?.data?.login?.firstName,
          lastName: response?.data?.login?.lastName,
          email: response?.data?.login?.email,
          dob: response?.data?.login?.dob,
          role: response?.data?.login?.role,
        };
        alert(message);

        // Navigate to Home screen after successful login
        // navigation.navigate("Home");

        // Dispatch the action to store the token and user information
        dispatch(setUser(user));
        dispatch(setToken(token));

      } catch (error: any) {
        console.log("Error logging in:");
        console.log(error.response);
        if (error.response && error.response.status) {
          switch (error.response.status) {
            case 400:
              alert("Invalid input: " + error.response.data.message);
              break;
            case 401:
              alert("Invalid credentials: " + error.response.data.message);
              break;
            default:
              alert("An unknown error occurred: " + error.response.data.message);
          }
        } else {
          console.log("Network or server error:", error.message);
        }
      }
    } else {
      console.log("Form has errors:", newErrors);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formData.username}
        onChangeText={(value) => handleChange("username", value)}
        onBlur={() => validateField("username", formData.username)}
      />
      <ErrorBox errorMessage={errors.username} />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(value) => handleChange("password", value)}
        onBlur={() => validateField("password", formData.password)}
      />
      <ErrorBox errorMessage={errors.password} />

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexGrow: 1,
    padding: "20%",
    justifyContent: "center",
    backgroundColor: "#ffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "var(--darkBlue)",
  },
  input: {
    height: 40,
    borderColor: "var(--grey)",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: "var(--white)",
  },
  button: {
    backgroundColor: "var(--lightBlue)",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "var(--white)",
    fontWeight: "bold",
    fontSize: 16,
  },
  signupText: {
    marginTop: 0,
    marginBottom: 10,
    fontSize: 12,
    textAlign: "right",
    color: "blue",
    textDecorationLine: "none",
  },
});

export default LoginPage;