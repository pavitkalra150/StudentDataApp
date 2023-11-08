import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

const StudentListScreen = ({ route }) => {
  // Get the students data from the route parameter
  const { students } = route.params;

  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('none'); // Sorting option: 'none', 'lastNameAtoZ', 'lastNameZtoA', 'gpaLowToHigh', 'gpaHighToLow'
  const sortingOptions = ['Sort by Last Name (A to Z)', 'Sort by Last Name (Z to A)', 'Sort by GPA (Low to High)', 'Sort by GPA (High to Low)'];

  const sortStudents = (students) => {
    if (sortBy === 'lastNameAtoZ') {
      return [...students].sort((a, b) => a.lastName.localeCompare(b.lastName));
    } else if (sortBy === 'lastNameZtoA') {
      return [...students].sort((a, b) => b.lastName.localeCompare(a.lastName));
    } else if (sortBy === 'gpaLowToHigh') {
      return [...students].sort((a, b) => a.gpa - b.gpa);
    } else if (sortBy === 'gpaHighToLow') {
      return [...students].sort((a, b) => b.gpa - a.gpa);
    } else {
      return students;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student List</Text>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by Student ID, Major, First Name, or Last Name"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <ModalDropdown
          options={sortingOptions}
          style={styles.sortIcon}
          dropdownStyle={styles.dropdownStyle}
          dropdownTextStyle={styles.dropdownTextStyle}
          onSelect={(index, value) => {
            switch (index) {
              case 0:
                setSortBy('lastNameAtoZ');
                break;
              case 1:
                setSortBy('lastNameZtoA');
                break;
              case 2:
                setSortBy('gpaLowToHigh');
                break;
              case 3:
                setSortBy('gpaHighToLow');
                break;
              default:
                setSortBy('none');
                break;
            }
          }}
        >
          <Text style={styles.sortText}>Sort</Text>
        </ModalDropdown>
      </View>
      <FlatList
        data={sortStudents(
          students.filter(
            (student) =>
              student.id.toString().includes(searchText) ||
              student.major.includes(searchText) ||
              student.firstName.includes(searchText) ||
              student.lastName.includes(searchText)
          )
        )}
        keyExtractor={(student) => student.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.studentCard}>
            <View style={styles.studentInfo}>
              <Text style={styles.studentInfoLabel}>First Name:</Text>
              <Text style={styles.studentInfoValue}>{item.firstName}</Text>
            </View>
            <View style={styles.studentInfo}>
              <Text style={styles.studentInfoLabel}>Last Name:</Text>
              <Text style={styles.studentInfoValue}>{item.lastName}</Text>
            </View>
            <View style={styles.studentInfo}>
              <Text style={styles.studentInfoLabel}>Major:</Text>
              <Text style={styles.studentInfoValue}>{item.major}</Text>
            </View>
            <View style={styles.studentInfo}>
              <Text style={styles.studentInfoLabel}>GPA:</Text>
              <Text style={styles.studentInfoValue}>{item.gpa}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
  },
  sortIcon: {
    paddingLeft: 8,
    justifyContent: 'center',
  },
  sortText: {
    color: 'blue',
  },
  dropdownStyle: {
    width: 200,
  },
  dropdownTextStyle: {
    fontSize: 16,
  },
  studentCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  studentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  studentInfoLabel: {
    fontWeight: 'bold',
  },
  studentInfoValue: {
    flex: 1,
  },
});

export default StudentListScreen;
