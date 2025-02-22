import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ErrorBox from '../component/ErrorBox'; // Import the ErrorBox component\
import { createUser, CreateUserResponse, GraphQLResponse } from '../api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { setUser } from '../state/slices/userSlice';
import { setToken } from '../state/slices/authSlice';


type FormData = {
  firstName: string;
  lastName: string;
  username: string;
  dob: string;
  code: string;
  email: string,
  password: string;
  confirmPassword: string;
};

const SignupPage: React.FC = () => {

  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);
  const userToken = useSelector((state: RootState) => state.auth);



  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    username: '',
    dob: '',
    code: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Handle input changes
  const handleChange = (name: keyof FormData, value: string) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when the user starts typing
  };


  // Validation logic
  const validateField = (name: keyof FormData, value: string) => {
    let error = '';
    switch (name) {
      case 'firstName':
        if (!value.trim()) error = `${name} is required.`;
        break;
      case 'lastName':
        if (!value.trim()) error = `${name} is required.`;
        break;
      case 'username':
        if (!value.trim()) error = 'Username is required.';
        else if (value.length < 5) error = 'Username must be at least 5 characters.';
        break;
      case 'dob':
        if (!value.trim() || value.trim() == '') error = 'Date of Birth is required.';
        else if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) error = 'Date of Birth must be in YYYY-MM-DD format.';
        break;
      case 'email':
        if (!value.trim() || value.trim() == '') error = 'Email is required.';
        // else if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) error = 'Email must be in YYYY-MM-DD format.';
        break;
      case 'password':
        if (!value.trim()) error = 'Password is required.';
        else if (value.length < 6) error = 'Password must be at least 6 characters.';
        break;
      case 'confirmPassword':
        if (value !== formData.password) error = 'Passwords do not match.';
        break;
    }
    setErrors({ ...errors, [name]: error });
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
        if (key === "code")
          return;
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
        const response: GraphQLResponse<CreateUserResponse> = await createUser(formData);
        console.log(response);

        if (response.errors) {
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
        };

        alert(message);
        console.log(message);

        // Dispatch the action to store the token and user information
        dispatch(setUser(user));
        dispatch(setToken(token));
        console.log(userState);
        console.log(userToken);

      } catch (error: any) {
        console.log("here ya ga: ")
        console.log(error.response)
        if (error.response && error.response.status) {
          switch (error.response.status) {
            case 400:
              alert("Invalid input: " + error.response.data.message);
              break;
            case 409:
              alert("User already exists: " + error.response);
              break;
            default:
              alert("An unknown error occurred: " + error.response.data.message);
          }
        } else {
          console.log("Network or server error:", error.message);
        }
      }
    } else {
      console.log('Form has errors:', newErrors);
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Signup</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={(value) => handleChange('firstName', value)}
        onBlur={() => validateField('firstName', formData.firstName)}
      />
      <ErrorBox errorMessage={errors.firstName} />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(value) => handleChange('lastName', value)}
        onBlur={() => validateField('lastName', formData.lastName)}
      />
      <ErrorBox errorMessage={errors.lastName} />

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formData.username}
        onChangeText={(value) => handleChange('username', value)}
        onBlur={() => validateField('username', formData.username)}
      />
      <ErrorBox errorMessage={errors.username} />

      <TextInput
        style={styles.input}
        placeholder="Date of Birth (YYYY-MM-DD)"
        value={formData.dob}
        onChangeText={(value) => handleChange('dob', value)}
        onBlur={() => validateField('dob', formData.dob)}
      />
      <ErrorBox errorMessage={errors.dob} />

      <TextInput
        style={styles.input}
        placeholder="Code (if any)"
        value={formData.code}
        onChangeText={(value) => handleChange('code', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="example@email.com"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(value) => handleChange('password', value)}
        onBlur={() => validateField('password', formData.password)}
      />
      <ErrorBox errorMessage={errors.password} />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={(value) => handleChange('confirmPassword', value)}
        onBlur={() => validateField('confirmPassword', formData.confirmPassword)}
      />
      <ErrorBox errorMessage={errors.confirmPassword} />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexGrow: 1,
    padding: '20%',
    justifyContent: 'center',
    backgroundColor: '#ffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'var(--darkBlue)',
  },
  input: {
    height: 40,
    borderColor: 'var(--grey)',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: 'var(--white)',
  },
  button: {
    backgroundColor: 'var(--lightBlue)',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'var(--white)',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SignupPage;
