import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, Button, Pressable, Image, ScrollView } from 'react-native';
import { format } from 'date-fns';

const handleLogout = async () => {
  try {
    // Briše sve podatke iz sessionStorage (ili specificirane ključeve)
    /*await sessionStorage.removeItem('token');  
    await sessionStorage.removeItem('userRole');
    await sessionStorage.removeItem('userId');
    await sessionStorage.removeItem('userSector');
    await sessionStorage.removeItem('userData');*/
    await sessionStorage.clear();
    
    // Možeš dodati navigaciju ka login ekranu nakon logout-a
    navigation.navigate('Login');  // Pretpostavljam da koristiš 'LoginScreen' kao login rutu
  } catch (error) {
    console.error('Greška prilikom odjave:', error);
  }
};

const WorkerDashboard = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0); 
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
  const [tasks, setTasks] = useState([]); 

const fetchTasks = async () => {
  try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/tasks/worker-tasks', { 
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
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

const [user, setUser] = useState({ firstname: '', lastname: '', sector: '' });
const [role, setRole] = useState('');  // Dodano za setRole

useEffect(() => {
  const userRole = sessionStorage.getItem('userRole');
  setRole(userRole);

  /*if (userRole !== 'User') {
      navigation.navigate('Login'); // Ako korisnik nije radnik, preusmjeri ga
  }*/

  const userData = JSON.parse(sessionStorage.getItem('userData')); // Pretpostavimo da je ulogovani korisnik sačuvan
  console.log("Korisnički podaci iz localStorage:", userData);
  if (userData) {
      setUser(userData); // Postavi ime, prezime i sektor
  }
}, [navigation]);



  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageHeader}>
        <Image style={styles.logoImage} source={require('./SarajevogasLogo2.jpg')} />
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Helpdesk</Text>
      </View>
      <View style={styles.loginHeader}>
        <Text style={styles.welcomeTitle}>Dobro došao, {user.firstname} {user.lastname} ({user.sector})</Text>
      </View>
      <View style={styles.loginHeader}>
        <Text style={styles.welcomeTitle}>Taskovi</Text>
      </View>
      
      {tasks.length > 0 && (
        <View style={styles.navigationButtons}>
          <Button title="⬅️" onPress={handlePrev} disabled={currentIndex === 0} />
          
          {/* Display the current task card */}
          <View style={styles.taskCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitleComplaint}>{tasks[currentIndex].naziv_taska}</Text>
              {/*<Pressable style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>🗑️</Text>
              </Pressable>*/}
            </View>
            <View>
            <Text style={styles.cardDescription}>{tasks[currentIndex].tekst_taska}</Text>
            </View>

            <View style={styles.cardHeader}>
            <Text style={styles.cardDescription}><b>Prioritet:</b> {tasks[currentIndex].prioritet}</Text>
            </View>

            <View style={styles.cardHeader}>
              <Text style={styles.cardDescription}><b>Status:</b> {tasks[currentIndex].status}</Text>
            </View>

            <View style={styles.cardHeader}>
  <Text style={styles.cardDescription}>
    <b>Datum kreiranja:</b> {format(new Date(tasks[currentIndex].createdAt), 'dd.MM.yyyy. HH:mm')}
  </Text>
</View>

            <Button title="Završi Task" color="#0056b3" onPress={async () => {
                                                    console.log(`Pokušaj završavanja taska sa ID: ${tasks[currentIndex].id}`); // Provjeri ID taska prije slanja

                                                    const response = await fetch(`http://localhost:3000/api/tasks/complete-task/${tasks[currentIndex].id}`, {
                                                        method: 'PUT',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                        },
                                                    });

                                                    if (response.ok) {
                                                        alert('Task je uspješno završen!');
                                                        setTasks(tasks.map(t => t.id === tasks[currentIndex].id ? { ...t, status: 'Završeno' } : t));
                                                    } else {
                                                        const errorMessage = await response.json(); // Očitaj grešku sa servera
                                                        console.log('Greška sa servera:', errorMessage);
                                                        alert('Došlo je do greške prilikom završavanja taska.');
                                                    }
                                                }}/>
            

          </View>
          
          <Button title="➡️" onPress={handleNext} disabled={currentIndex === tasks.length - 1} />
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
  loginHeader:{
    height: 30, // Adjust the flex value as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  imageHeader: {
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginTop: '10%'
  },
  logoImage: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginTop: 50,
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
    height: 300,
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
    marginBottom: 10, // Dodajemo donji margin da se tekst odmakne od dugmeta
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
  cardTitleComplaint: {
    fontSize: 18,
    color: '#0056b3',
    fontWeight: 'bold'
  },
});

export default WorkerDashboard;