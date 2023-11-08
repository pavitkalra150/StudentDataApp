import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import StudentListScreen from './src/screens/StudentListScreen';
import { updateStudentData } from './src/components/DataHandler';


// Replace this with your actual student data
const studentsData = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    major: 'TS101',
    gpa: 3.8,
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    major: 'CS101',
    gpa: 3.6,
  },
  // Add more student objects as needed
];

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="StudentList" component={StudentListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
