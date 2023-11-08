import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StudentCard = ({ student }) => {
  if (!student || typeof student !== 'object' || !student.id) {
    // Handle the case where student data is missing or doesn't contain the 'id' property.
    return (
      <View style={styles.card}>
        <Text style={styles.noDataText}>Student information not available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Student Information</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Student ID:</Text>
          <Text style={styles.value}>{student.id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>First Name:</Text>
          <Text style={styles.value}>{student.firstName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Last Name:</Text>
          <Text style={styles.value}>{student.lastName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Major:</Text>
          <Text style={styles.value}>{student.major}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>GPA:</Text>
          <Text style={styles.value}>{student.gpa}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    width: 300, // Increase the width to make the card wider
    height: 400, // Increase the height to make the card taller
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'column',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default StudentCard;
