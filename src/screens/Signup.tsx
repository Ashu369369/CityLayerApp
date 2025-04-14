import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/RootStackParams";

import React, { useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Pressable
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  Dialog,
  Portal,
  Icon,
  IconButton,
} from "react-native-paper";
import ErrorBox from "../component/ErrorBox"; // Import the ErrorBox component\
import {
  createUser,
  CreateUserResponse,
  GraphQLResponse,
} from "../api/userApi";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { setUser } from "../state/slices/userSlice";
import { setToken } from "../state/slices/authSlice";
import { DynamicTheme } from "../theme/theme";
import { useTheme } from "react-native-paper";

type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Signup"
>;

type FormData = {
  firstName: string;
  lastName: string;
  username: string;
  dob: string;
  code: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupPage: React.FC = () => {

  const theme = useTheme();
  const styles = useStyles(theme as DynamicTheme);
  const navigation = useNavigation<SignupScreenNavigationProp>();

  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);
  const userToken = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    username: "",
    dob: "",
    code: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false); // State to toggle DateTimePicker
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // State to store selected date
  const [errors, setErrors] = useState<Partial<FormData>>({});

  //all the refs 
  const lastNameref = useRef<any>(null);
  const usernameref = useRef<any>(null);
  const dobref = useRef<any>(null);
  const emailref = useRef<any>(null);
  const passwordref = useRef<any>(null);
  const confirmPasswordref = useRef<any>(null);

  // Handle input changes
  const handleChange = (name: keyof FormData, value: string) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error when the user starts typing
  };

  // Validation logic
  const validateField = (name: keyof FormData, value: string) => {
    let error = "";
    switch (name) {
      case "firstName":
        if (!value.trim()) error = `${name} is required.`;
        break;
      case "lastName":
        if (!value.trim()) error = `${name} is required.`;
        break;
      case "username":
        if (!value.trim()) error = "Username is required.";
        else if (value.length < 5)
          error = "Username must be at least 5 characters.";
        break;

      case "dob":
        if (!value.trim() || value.trim() == "")
          error = "Date of Birth is required.";
        else if (!/^\d{4}-\d{2}-\d{2}$/.test(value))
          error = "Date of Birth must be in YYYY-MM-DD format.";
        break;
      case "email":
        if (!value.trim() || value.trim() == "") error = "Email is required.";
        // else if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) error = 'Email must be in YYYY-MM-DD format.';

        break;
      case "password":
        if (!value.trim()) error = "Password is required.";
        else if (value.length < 6)
          error = "Password must be at least 6 characters.";
        break;
      case "confirmPassword":
        if (value !== formData.password) error = "Passwords do not match.";
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false); // Hide DateTimePicker on Android after selection
    }
    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      setFormData({ ...formData, dob: formattedDate }); // Update the formData
    }
  };

  const handleConfirmDate = () => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setFormData({ ...formData, dob: formattedDate });
    }
    setShowDatePicker(false); // Close the modal
  };


  const handleSignup = async () => {
    let allValid = true;
    const newErrors: Partial<FormData> = {};
    console.log("shuru");

    // Check each field for validity
    Object.keys(formData).forEach((key) => {
      const field = key as keyof FormData;
      const value = formData[field];
      if (!value.trim()) {
        if (key === "code") return;

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
        const response = await createUser(formData);


        if (response.errors && response.errors.length > 0) {
          // If errors exist, handle them
          console.log("GraphQL errors:", response.errors);
          alert("Error: " + response.errors[0]?.message || "An unknown error occurred");
          return;
        }
        let message = response?.data?.createUser?.message;

        let token = response?.data?.createUser?.token;
        let user = {
          id: response?.data?.createUser?.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          dob: formData.dob,
          role: response?.data?.createUser?.role,
        };
        if (!user)
          alert(message);

        // Dispatch the action to store the token and user information
        dispatch(setUser(user));
        dispatch(setToken(token));
        console.log(userState);
        console.log(userToken);
      } catch (error: any) {
        console.log("here ya ga: ");
        console.log(error);
        if (error.response && error.response.status) {
          switch (error.response.status) {
            case 400:
              alert("Invalid input: " + error.response.data.message);
              break;
            case 409:
              alert("User already exists: " + error.response);
              break;
            default:
              alert(
                "An unknown error occurred: " + error.response.data.message
              );
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
      <Text style={styles.title}>Signup</Text>
      <TextInput
        label="First Name"
        mode="outlined"
        value={formData.firstName}
        onChangeText={(value) => handleChange("firstName", value)}
        onBlur={() => validateField("firstName", formData.firstName)}
        style={styles.input}
        returnKeyType="next"
        onSubmitEditing={() => lastNameref.current?.focus()}
      />
      <ErrorBox errorMessage={errors.firstName} />

      <TextInput
        label="Last Name"
        mode="outlined"
        value={formData.lastName}
        onChangeText={(value) => handleChange("lastName", value)}
        onBlur={() => validateField("lastName", formData.lastName)}
        ref={lastNameref}
        returnKeyType="next"
        onSubmitEditing={() => usernameref.current?.focus()}
        style={styles.input}
      />
      <ErrorBox errorMessage={errors.lastName} />

      <TextInput
        label="Username"
        mode="outlined"
        value={formData.username}
        onChangeText={(value) => handleChange("username", value)}
        onBlur={() => validateField("username", formData.username)}
        style={styles.input}
        ref={usernameref}
        returnKeyType="next"
        onSubmitEditing={() => setShowDatePicker(true)}
      />
      <ErrorBox errorMessage={errors.username} />

      {/* <TextInput
        style={styles.input}
        placeholder="Date of Birth (YYYY-MM-DD)"
        value={formData.dob}
        onChangeText={(value) => handleChange("dob", value)}
        onBlur={() => validateField("dob", formData.dob)}
      /> */}
      <ErrorBox errorMessage={errors.dob} />

      {/* Date of Birth Field */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <View pointerEvents="none" style={{ flexDirection: "row",alignItems:"center" }}>
          <IconButton icon="calendar-range" size={20} iconColor={theme.colors.backdrop} />
          <Text style={styles.input}>
            {formData.dob ? formData.dob : 'Date of Birth (YYYY-MM-DD)'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* DateTimePicker for iOS */}
      {Platform.OS === "ios" && showDatePicker && (
        <Portal>
          <Dialog visible={showDatePicker} onDismiss={() => setShowDatePicker(false)} style={styles.dateTimePortal}>
            <Dialog.Content>
              <DateTimePicker
                value={selectedDate || new Date()}
                mode="date"
                display="inline"
                onChange={handleDateChange}
                maximumDate={new Date()} // Prevent selecting future dates
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleConfirmDate}>Confirm</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}

      {/* DateTimePicker for Android */}
      {Platform.OS === "android" && showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()} // Prevent selecting future dates
        />
      )}
      <ErrorBox errorMessage={errors.dob} />

      {showDatePicker && (
        <DateTimePicker
          value={formData.dob ? new Date(formData.dob) : new Date()} // Default to current date
          mode="date"
          display="default"
          onChange={handleDateChange} // Handle date selection
          maximumDate={new Date()} // Prevent selecting future dates
        />
      )}

      <TextInput
        label="Code (if any)"
        mode="outlined"
        style={styles.input}
        value={formData.code}
        onChangeText={(value) => handleChange("code", value)}
        returnKeyType="next"
        onSubmitEditing={() => emailref.current?.focus()}
      />

      <TextInput
        label="Email"
        mode="outlined"
        value={formData.email}
        onChangeText={(value) => handleChange("email", value)}
        onBlur={() => validateField("email", formData.email)}
        style={styles.input}
        ref={emailref}
        returnKeyType="next"
        onSubmitEditing={() => passwordref.current?.focus()}
      />
      <ErrorBox errorMessage={errors.email} />

      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        value={formData.password}
        onChangeText={(value) => handleChange("password", value)}
        onBlur={() => validateField("password", formData.password)}
        style={styles.input}
        ref={passwordref}
        returnKeyType="next"
        onSubmitEditing={() => confirmPasswordref.current?.focus()}
      />
      <ErrorBox errorMessage={errors.password} />

      <TextInput
        label="Confirm Password"
        mode="outlined"
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={(value) => handleChange("confirmPassword", value)}
        onBlur={() =>
          validateField("confirmPassword", formData.confirmPassword)
        }
        style={styles.input}
        ref={confirmPasswordref}
        returnKeyType="done"
      />
      <ErrorBox errorMessage={errors.confirmPassword} />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.LoginText}>Already have an account? Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const useStyles = (theme: DynamicTheme) => StyleSheet.create({
  container: {
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
  dateTimePortal: {
    backgroundColor: theme.colors.surface,
  },
  input: {
    borderColor: theme.colors.backdrop,
    marginBottom: 5,
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
  LoginText: {
    marginTop: 0,
    marginBottom: 10,
    fontSize: 12,
    textAlign: "right",
    color: "blue",
    textDecorationLine: "none",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    backgroundColor: "#000",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  confirmButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  }, textPlaceholder: {
    color: "#aaa",
  },
  textSelected: {
    color: "#000",
  },
});

export default SignupPage;
