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
        <Text style={styles.loginTitle}>Dobro došao, korisnik</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="ime.prezime@sarajevogas.ba"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text color='#0056b3' style={styles.label}>Password</Text>
        <TextInput
          placeholder="Unesi svoj password"
          style={styles.input}
          secureTextEntry
          autoCapitalize="none"
        />
        <Button title="Logout" color="#0056b3" onPress={() => navigation.navigate('Login')} style={styles.button} />
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
  header: {
    flex: 0.05, // Adjust the flex value as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007F37',
    width: '100%',
    marginBottom: 10,
  },
  imageHeader: {
    flex: 0.1, // Adjust the flex value as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 10,
  },
   logoImage: {
    flex: 2, // Adjust the flex value as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '30%',
    height: '30%',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  loginHeader: {
    flex: 0.1, // Adjust the flex value as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 20,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0056b3',
  },
  formContainer: {
    flex: 0.8, // Adjust the flex value as needed
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
});

export default DashboardScreen;