import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, Pressable, Image } from 'react-native';


const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageHeader}>
      <Image style={styles.logoImage} source={require('./SarajevogasLogo2.jpg')} />

      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Helpdesk</Text>
      </View>
      <View style={styles.loginHeader}>
        <Text style={styles.welcomeTitle}>Dobro došao, korisnik</Text>
      </View>
      <View style={styles.loginHeader}>
        <Text style={styles.welcomeTitle}>Taskovi</Text>
      </View>
      <View style={styles.taskCard}>
        <Text style={styles.cardTitle}>Zadatak 1</Text>
        <Text style={styles.cardTitle}>Opis zadatka</Text>
      </View>
      <View style={styles.formContainer}>
        <Button title="Logout" color="#ff0808" onPress={() => navigation.navigate('Login')} style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 50, // Adjust the flex value as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007F37',
    width: '100%',
    marginBottom: 10,
  },
  imageHeader: {
    height: 75, // Adjust the flex value as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 5,
  },
   logoImage: {
   height: 100, // Adjust the flex value as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '30%',
    marginBottom: 10,
    aspectRatio: 1, 
    resizeMode: 'contain' 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  loginHeader: {
    height: 50, // Adjust the flex value as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0056b3',
  },
  formContainer: {
    height: 200, // Adjust the flex value as needed
    width: '100%',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#0056b3',
    textAlign: 'center'
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderColor: '#007F37',
    borderWidth: 2
  },
  button: {
    color: 'white',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  taskCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    width: '60%', // širina je 80% od širine ekrana
    height: 150,  // visina u pikselima, prilagodi po potrebi
    marginBottom: 20,
    borderRadius: 10, 
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default DashboardScreen;