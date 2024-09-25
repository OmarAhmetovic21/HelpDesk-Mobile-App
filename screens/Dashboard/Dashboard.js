import React, { useState, useEffect } from 'react';  
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Button, Pressable, Image, ScrollView } from 'react-native';


const handleLogout = async () => {
  try {
    await sessionStorage.removeItem('token');  
    await sessionStorage.removeItem('userRole');
    await sessionStorage.removeItem('userId');
    await sessionStorage.removeItem('userSector');
    
    navigation.navigate('Login');
  } catch (error) {
    console.error('Greška prilikom odjave:', error);
  }
};

const Dashboard = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);  // State to track current card

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tasks/all-tasks', { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setTasks(data);
      console.log('Dohvaćeni Taskovi:', data);
    } catch (error) {
      console.error('Greška prilikom preuzimanja taskova:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleNext = () => {
    if (currentIndex < tasks.length - 1) {
      setCurrentIndex(currentIndex + 1);  // Increment current index
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);  // Decrement current index
    }
  };

  const handleNextComplaint = () => {
    if (currentIndex < complaints.length - 1) {
      setCurrentIndex(currentIndex + 1);  // Increment current index
    }
  };

  const handlePrevComplaint = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);  // Decrement current index
    }
  };

  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loadingComplaints, setLoadingComplaints] = useState(true);

  const fetchComplaints = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/report-issue/all-complaints', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        setComplaints(data.complaints || []); 
        console.log('Dohvaćene Smetnje:', data);
    } catch (error) {
        console.error('Greška prilikom preuzimanja prijava smetnji:', error);
    } finally {
        setLoadingComplaints(false); // Postavi loading na false nakon preuzimanja podataka
    }
};

useEffect(() => {
  fetchComplaints();
}, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageHeader}>
        <Image style={styles.logoImage} source={require('./SarajevogasLogo2.jpg')} />
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Helpdesk</Text>
      </View>
      <View style={styles.loginHeader}>
        <Text style={styles.welcomeTitle}>Dobro došao, šef sektora</Text>
      </View>
      <View style={styles.taskTitleHeader}>
        <Text style={styles.welcomeTitle}>Taskovi</Text>
      </View>

      {tasks.length > 0 && (
        <View style={styles.navigationButtons}>
          <Button title="⬅️" onPress={handlePrev} disabled={currentIndex === 0} />
          
          {/* Display the current task card */}
          <View style={styles.taskCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{tasks[currentIndex].naziv_taska}</Text>
              <Pressable style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>🗑️</Text>
              </Pressable>
            </View>
            <Text style={styles.cardDescription}>{tasks[currentIndex].tekst_taska}</Text>
            <View style={styles.taskInfoContainer}>
              <Text style={styles.priorityButton}>{tasks[currentIndex].prioritet}</Text>
              {/*<Text style={styles.assignedPerson}>{tasks[currentIndex].assignedPerson}</Text>*/}
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.statusLabel}>Status:</Text>
              <Text style={styles.statusValue}>{tasks[currentIndex].status}</Text>
            </View>
            <Button title="Izmijeni" color="#0056b3" />
          </View>
          
          <Button title="➡️" onPress={handleNext} disabled={currentIndex === tasks.length - 1} />
        </View>
      )}

      <View style={styles.taskTitleHeader}>
        <Text style={styles.welcomeTitle}>Prijave Smetnji</Text>
      </View>

      {complaints.length > 0 && (
        <View style={styles.navigationButtons}>
          <Button title="⬅️" onPress={handlePrevComplaint} disabled={currentIndex === 0} />
          
          {/* Display the current task card */}
          <View style={styles.taskCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{complaints[currentIndex].opis}</Text>
              <Pressable style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>🗑️</Text>
              </Pressable>
            </View>
            <Text style={styles.cardDescription}>{complaints[currentIndex].sektor}</Text>
            <View style={styles.taskInfoContainer}>
              <Text style={styles.priorityButton}>{complaints[currentIndex].ime}</Text>
              {/*<Text style={styles.assignedPerson}>{tasks[currentIndex].assignedPerson}</Text>*/}
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.statusLabel}>Email:</Text>
              <Text style={styles.statusValue}>{complaints[currentIndex].email}</Text>
            </View>
            <Button title="Dodajte task" color="#0056b3" onPress={() => navigation.navigate('AddTask')} />

          </View>
          
          <Button title="➡️" onPress={handleNextComplaint} disabled={currentIndex === complaints.length - 1} />
        </View>
      )}

      <View style={styles.formContainer}>
        <Button title="Prijavite smetnju" color="#0056b3" onPress={() => navigation.navigate('ReportIssue')} />
      </View>
      
      <View style={styles.formContainer}>
        <Button title="Logout" color="#ff0808" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  loginHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 20,
  },
  taskTitleHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  taskCard: {
    backgroundColor: '#D9D9D9',
    width: 300,
    height: 250,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cardDescription: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
  taskInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    height: 50,
  },
  priorityButton: {
    backgroundColor: 'orange',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
    height: 40,
    width: 100,
  },
  assignedPerson: {
    backgroundColor: 'green',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
    height: 25,
    width: 80,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  statusLabel: {
    fontSize: 16,
    color: 'gray',
    marginRight: 10,
  },
  statusValue: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  imageHeader: {
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginTop: '10%',
  },
  logoImage: {
    height: 200,
    width: '100%',
    marginBottom: 10,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007F37',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'white',
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0056b3',
  },
  formContainer: {
    width: '100%',
    marginTop: 50,
  }
});

export default Dashboard;
