import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootStackParams";
import { getProgramById, Program } from "../api/programApi";

type ProgramScreenRouteProp = RouteProp<RootStackParamList, "Program">;

const ProgramScreen: React.FC = () => {
  const route = useRoute<ProgramScreenRouteProp>();
  const { programId } = route.params;
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
      const fetchedProgram = getProgramById(programId);
      setProgram(fetchedProgram || null);
      setLoading(false);
    };

    fetchProgram();
  }, [programId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!program) {
    return (
      <View style={styles.container}>
        <Text>Program not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{program.name}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.description}>{program.description}</Text>
        <Text style={styles.date}>
          Start Date: {new Date(program.startDate).toLocaleDateString()}
        </Text>
        <Text style={styles.date}>Duration: {program.duration} months</Text>
        {program.endDate && (
          <Text style={styles.date}>
            End Date: {new Date(program.endDate).toLocaleDateString()}
          </Text>
        )}
        <Text style={styles.date}>
          Repeat:{" "}
          {program.isRepeat ? `Yes (${program.repeatAfter?.type})` : "No"}
        </Text>
        <Text style={styles.date}>Created by: User {program.createdBy}</Text>
        <Text style={styles.date}>
          Created at: {new Date(program.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 20,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
});

export default ProgramScreen;
