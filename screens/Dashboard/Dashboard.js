import React, { useState, useEffect } from 'react';  
import { useFocusEffect } from '@react-navigation/native';
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

const Dashboard = ({ navigation, route }) => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loadingComplaints, setLoadingComplaints] = useState(true);
  
  const [tasks, setTasks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0); // State to track current card
  var [workers, setWorkers] = useState([]);

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

/*useFocusEffect(
  React.useCallback(() => {
    // Proveri da li postoji potreba za osvežavanjem podataka
    if (route.params?.refresh) {
      fetchComplaints();
    }
  }, [route.params?.refresh])
);*/

const handleNextComplaint = () => {
  if (currentIndex2 < complaints.length - 1) {
    setCurrentIndex2(currentIndex2 + 1);  // Increment current index
  }
};

const handlePrevComplaint = () => {
  if (currentIndex2 > 0) {
    setCurrentIndex2(currentIndex2 - 1);  // Decrement current index
  }
};

const [user, setUser] = useState({ firstname: '', lastname: '', sector: '' });
const [role, setRole] = useState('');  // Dodano za setRole

useEffect(() => {
  const userRole = localStorage.getItem('userRole');
  setRole(userRole);

  /*if (userRole !== 'User') {
      navigation.navigate('Login'); // Ako korisnik nije radnik, preusmjeri ga
  }*/

  const userData = JSON.parse(localStorage.getItem('userData')); // Pretpostavimo da je ulogovani korisnik sačuvan
  console.log("Korisnički podaci iz localStorage:", userData);
  if (userData) {
      setUser(userData); // Postavi ime, prezime i sektor
  }
}, [navigation]);

const defaultData = complaints[currentIndex2] ? {
  sektor: complaints[currentIndex2].sektor || '', // Ako sektor nije definisan, koristi praznu vrijednost
  opis: complaints[currentIndex2].opis || '', // Ako opis nije definisan, koristi praznu vrijednost
  prijavaId: complaints[currentIndex2].id || null // Ako prijavaId nije definisan, koristi null
} : {
  sektor: user.sector || '',  // Koristi sektor ulogovanog korisnika, ali provjeri da user postoji
  opis: '',  // Prazan opis kada nema prijave
  prijavaId: null  // Nema prijave smetnje
};

workers={workers} 

const handleCreateTask = () => {
  navigation.navigate('AddTask', {
    defaultData,
    workers, 
    onTaskCreated: () => {
      // Ažuriranje prijava, samo ako postoji selectedComplaint
      if (selectedComplaint) {
        setComplaints(complaints => complaints.map(c => 
          c.id === selectedComplaint.id ? { ...c, hasTask: true } : c
        ));
      }
    },
    
    
  });
  console.log(defaultData.sektor,',', defaultData.opis)
};

const onTaskCreated = async (complaintId) => {
  try {
      const response = await fetch(`http://localhost:3000/api/report-issue/create-task/${complaintId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (response.ok) {
          setComplaints(complaints.filter(c => c.id !== complaintId));
          alert('Task je uspješno kreiran i prijava smetnji je ažurirana!');
      } else {
          alert('Došlo je do greške prilikom kreiranja taska.');
      }
  } catch (error) {
      console.error('Greška prilikom kreiranja taska:', error);
      alert('Došlo je do greške prilikom slanja taska.');
  }
};


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
      <View style={styles.taskTitleHeader}>
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
            <Text style={styles.cardDescription}><b>Radnik:</b> {tasks[currentIndex].User.firstname} {tasks[currentIndex].User.lastname}</Text>
            </View>

            <View style={styles.cardHeader}>
            <Text style={styles.cardDescription}><b>Prioritet:</b> {tasks[currentIndex].prioritet}</Text>
            </View>

            <View style={styles.cardHeader}>
              <Text style={styles.cardDescription}><b>Status:</b> {tasks[currentIndex].status}</Text>
            </View>
            <View style={styles.cardHeader}>
              <Text style={styles.cardDescription}><b>Verifikacija:</b> {tasks[currentIndex].verifikacija ? 'Ovjereno' : 'Nije ovjereno'}</Text>
            </View>
            {/*{tasks[currentIndex].status === 'Završeno' && !tasks[currentIndex].verifikacija && (*/}
            <Button title="Ovjeri" color="#0056b3" onPress={async () => {
                                                const response = await fetch(`http://localhost:3000/api/tasks/verify-task/${tasks[currentIndex].id}`, {
                                                    method: 'PUT',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                });

                                                if (response.ok) {
                                                    alert('Task je uspješno ovjeren!');
                                                    setTasks(tasks.map(t => t.id === tasks[currentIndex].id ? { ...t, verifikacija: true } : t)); // Ažuriraj task u stanju
                                                } else {
                                                    alert('Došlo je do greške prilikom verifikacije taska.');
                                                }
                                            }} />
     {/*}       )}    */}

          </View>
          
          <Button title="➡️" onPress={handleNext} disabled={currentIndex === tasks.length - 1} />
        </View>
      )}

      <View style={styles.taskTitleHeader}>
        <Text style={styles.welcomeTitle}>Prijave Smetnji</Text>
      </View>

      {complaints.length > 0 && (
        <View style={styles.navigationButtons}>
          <Button title="⬅️" onPress={handlePrevComplaint} disabled={currentIndex2 === 0} />
          
          {/* Display the current task card */}
          <View style={styles.complaintsCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitleComplaint}>{complaints[currentIndex2].opis}</Text>
              {/*<Pressable style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>🗑️</Text>
              </Pressable>*/}
            </View>
            <View style={styles.cardHeader}>
            <Text style={styles.cardDescription}><b>Sektor:</b> {complaints[currentIndex2].sektor}</Text>
            </View>
            <View style={styles.cardHeader}>
            <Text style={styles.cardDescription}><b>Ime:</b> {complaints[currentIndex2].ime}</Text>
            </View>
            <View style={styles.cardHeader}>
            <Text style={styles.cardDescription}><b>Email:</b> {complaints[currentIndex2].email}</Text>
            </View> 
            
            <Button title="Kreiraj Task" color="#0056b3" /*onPress={() => navigation.navigate('AddTask')}*/ onPress={() => handleCreateTask(complaints[currentIndex2])}/>

          
           
          </View>
          
          <Button title="➡️" onPress={handleNextComplaint} disabled={currentIndex2 === complaints.length - 1} />
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
  complaintsCard:{
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
  taskCard: {
    backgroundColor: '#D9D9D9',
    width: 300,
    height: 350,
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
  taskInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    height: 30,
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
    textAlign: 'center'
  },
  formContainer: {
    width: '100%',
    marginTop: 50,
  },
  cardTitleComplaint: {
    fontSize: 18,
    color: '#0056b3',
    fontWeight: 'bold'
  },
  
  cardDescription: {
    marginTop: 10,
    marginBottom: 10, // Dodajemo donji margin da se tekst odmakne od dugmeta
    fontSize: 16,
    color: 'black',
  },
  
});

export default Dashboard;
