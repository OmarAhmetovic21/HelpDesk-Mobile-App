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
      <View style={styles.cardContainer}>
        <View style={styles.taskCard}>
          <Text style={styles.cardTitle}>Zadatak 1</Text>
          <Text style={styles.cardTitle}>Opis zadatka</Text>
        </View>
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
    alignContent: 'center',
  },
  cardContainer: {
    marginTop: 20,
    height: 100, // Adjust the flex value as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 5,
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007F37',
    width: '100%',
    marginBottom: 10,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0056b3',
  },
  formContainer: {
    height: 20,
    width: '100%',
    marginTop: 100,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#0056b3',
    textAlign: 'center',
  },
  button: {
    color: 'white',
    marginBottom: 100
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  loginHeader: {
    height: 50, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 10,  // smanjen sa 20 na 10
  },
  taskCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    width: '80%',
    height: 150,  // smanjen sa 20 na 10
    borderRadius: 10,
  },
});

export default DashboardScreen;