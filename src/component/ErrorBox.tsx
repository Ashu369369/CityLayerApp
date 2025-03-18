import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ErrorBoxProps = {
  errorMessage?: string;
};

const ErrorBox: React.FC<ErrorBoxProps> = ({ errorMessage }) => {
  if (!errorMessage) return null;

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#ffe6e6',
    borderColor: '#ffcccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 14,
  },
});

export default ErrorBox;
