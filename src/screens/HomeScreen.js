import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import StudentCard from "../components/StudentCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateStudentData } from "../components/DataHandler";
import { useNavigation } from "@react-navigation/native";

const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalStudentData, setModalStudentData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const studentData = await AsyncStorage.getItem("students");
      if (studentData) {
        setStudents(JSON.parse(studentData));
      } else {
        const staticData = [
          {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            major: "TS101",
            gpa: 3.8,
          },
          {
            id: 2,
            firstName: "John",
            lastName: "Doe1",
            major: "CS101",
            gpa: 3.6,
          },
          {
            id: 3,
            firstName: "John",
            lastName: "Doe2",
            major: "BS301",
            gpa: 3.4,
          },
        ];
        setStudents(staticData);
        await AsyncStorage.setItem("students", JSON.stringify(staticData));
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const nextStudent = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < students.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const prevStudent = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const openAddStudentModal = () => {
    setIsModalVisible(true);
    setModalStudentData({});
  };

  const openEditStudentModal = () => {
    setIsModalVisible(true);
    setModalStudentData(students[currentIndex]);
  };

  const saveStudentData = () => {
    if (!modalStudentData.firstName || !modalStudentData.lastName) {
      Alert.alert("Error", "First Name and Last Name are required.");
      return;
    }

    const updatedStudents = [...students];

    if (modalStudentData.id) {
      const studentIndex = updatedStudents.findIndex(
        (student) => student.id === modalStudentData.id
      );

      if (studentIndex !== -1) {
        updatedStudents[studentIndex] = modalStudentData;
      }
    } else {
      const newStudentId = Date.now().toString();
      modalStudentData.id = newStudentId;
      updatedStudents.push(modalStudentData);
    }

    setStudents(updatedStudents);
    setIsModalVisible(false);

    AsyncStorage.setItem("students", JSON.stringify(updatedStudents));
  };

  const deleteStudent = async () => {
    if (students.length > 0) {
      const studentToDelete = students[currentIndex];
      Alert.alert(
        "Delete Student",
        `Are you sure you want to delete ${studentToDelete.firstName} ${studentToDelete.lastName}?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: () => {
              const updatedStudents = [...students];
              updatedStudents.splice(currentIndex, 1);
              setStudents(updatedStudents);
              setCurrentIndex(0);
              AsyncStorage.setItem("students", JSON.stringify(updatedStudents));
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      {students.length > 0 ? (
        <>
          <CustomButton
            title="Show All Students"
            onPress={() =>
              navigation.navigate("StudentList", { students: students })
            }
          />

          <StudentCard student={students[currentIndex]} />
          <View>
            <CustomButton title="Add Student" onPress={openAddStudentModal} />
            <CustomButton title="Edit Student" onPress={openEditStudentModal} />
            <CustomButton title="Delete Student" onPress={deleteStudent} />
            <CustomButton title="First" onPress={() => setCurrentIndex(0)} />
            <CustomButton title="Previous" onPress={prevStudent} />
            <CustomButton title="Next" onPress={nextStudent} />
            <CustomButton
              title="Last"
              onPress={() => setCurrentIndex(students.length - 1)}
            />
          </View>
        </>
      ) : (
        <Text>No student data available</Text>
      )}

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={modalStudentData.firstName}
              onChangeText={(text) =>
                setModalStudentData({ ...modalStudentData, firstName: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={modalStudentData.lastName}
              onChangeText={(text) =>
                setModalStudentData({ ...modalStudentData, lastName: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Major"
              value={modalStudentData.major}
              onChangeText={(text) =>
                setModalStudentData({ ...modalStudentData, major: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="GPA"
              value={modalStudentData.gpa}
              onChangeText={(text) =>
                setModalStudentData({ ...modalStudentData, gpa: text })
              }
            />
            <Button
              title="Save"
              onPress={saveStudentData}
              style={styles.button}
            />
            <Button
              title="Cancel"
              onPress={() => setIsModalVisible(false)}
              style={styles.button}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "column",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    width: 300, // Increase the width of the modal
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    width: "100%",
    backgroundColor: "blue", // Example background color
    padding: 10, // Example padding
    alignItems: "center", // Center button content horizontally
    marginBottom: 10, // Spacing between buttons
  },
  buttonText: {
    color: "white", // Example text color
  },
});

export default HomeScreen;
