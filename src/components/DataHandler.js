// DataHandler.js

import AsyncStorage from '@react-native-async-storage/async-storage';

const updateStudentData = async (students) => {
  // Update the data in AsyncStorage
  await AsyncStorage.setItem('students', JSON.stringify(students));
};

export { updateStudentData };
