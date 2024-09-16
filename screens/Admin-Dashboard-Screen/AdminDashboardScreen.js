import React from 'react';
import { View, Text, StyleSheet, Button, Pressable, Image } from 'react-native';

const AdminDashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageHeader}>
        <Image style={styles.logoImage} source={require('./SarajevogasLogo2.jpg')} />
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Helpdesk</Text>
      </View>
      <View style={styles.loginHeader}>
        <Text style={styles.welcomeTitle}>Dobro došao, admin</Text>
      </View>
      <View style={styles.loginHeader}>
        <Text style={styles.welcomeTitle}>Taskovi</Text>
        <Button title="Dodajte task" color="#0056b3" onPress={() => navigation.navigate('Login')} />
      </View>

      
      <View style={styles.cardContainer}>
      <View style={styles.taskCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Zadatak 1</Text>
            <Pressable style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </Pressable>
          </View>
          <Text style={styles.cardDescription}>Odnijeti računare i popraviti ŠTO PRIJE I HITNO</Text>
          <View style={styles.taskInfoContainer}>
            <Text style={styles.priorityButton}>Urgentno</Text>
            <Text style={styles.assignedPerson}>Enver</Text>
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Status:</Text>
            <Text style={styles.statusValue}>U toku</Text>
          </View>
          <Button title="Izmijeni" color="#0056b3" /*onPress={() => navigation.navigate('Dashboard')}*/ />
        </View>
      </View>

      <View style={styles.formContainer}>
        <Button title="Prijavite smetnju" color="#0056b3" onPress={() => navigation.navigate('Login')} />
      </View>
      
      <View style={styles.formContainer}>
        <Button title="Logout" color="#ff0808" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
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
    marginBottom: 20,
  },
  cardContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
  },
  taskCard: {
    backgroundColor: '#D9D9D9',
    width: '70%',
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
  },
  priorityButton: {
    backgroundColor: 'orange',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
  },
  assignedPerson: {
    backgroundColor: 'green',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
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
  editButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imageHeader: {
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 5,
  },
  logoImage: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 200,
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
    marginBottom: 10,
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

export default AdminDashboardScreen;