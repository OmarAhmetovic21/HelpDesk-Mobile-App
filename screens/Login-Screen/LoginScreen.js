import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Server odgovor:', data);

      if (response.ok) {
        // Sačuvaj token, ulogu i korisnički ID koristeći AsyncStorage
        await sessionStorage.setItem('token', data.token);
        await sessionStorage.setItem('userRole', data.user.role);
        await sessionStorage.setItem('userId', data.user.id);

        console.log('Sačuvan korisnički ID:', data.user.id);

        // Pohrani sektor u AsyncStorage (ako postoji)
        const userSector = data.user.sector || 'Sektor 1'; // Primjer ručnog postavljanja
        await sessionStorage.setItem('userSector', userSector);
        console.log('Sačuvan sektor:', userSector);

        // Navigiraj prema dashboard-u ili redirekciji
        if (data.user.role === 'Sector Manager') {
          navigation.navigate('/dashboard');
        } else if (data.user.role === 'User') {
          navigation.navigate('/worker-dashboard');
        } else {
          Alert.alert('Greška', 'Nepoznata uloga korisnika');
        }
        
      } else {
        setErrorMessage(data.message);
        Alert.alert('Greška', data.message);
      }
    } catch (error) {
      console.error('Greška prilikom prijave:', error);
      Alert.alert('Greška', 'Došlo je do greške. Pokušajte ponovo.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageHeader}>
        <Image style={styles.logoImage} source={require('./logo_samo.png')} />
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Sarajevogas Helpdesk</Text>
      </View>
      <View style={styles.loginHeader}>
        <Text style={styles.loginTitle}>Login</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="ime.prezime@sarajevogas.ba"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Unesi svoj password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      <View style={styles.formContainer}>
        <Button title="Login" color="#0056b3" onPress={handleLogin} style={styles.button} />
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
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007F37',
    width: '100%',
  },
  imageHeader: {
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 5,
    marginTop: '10%',
  },
  logoImage: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '30%',
    marginBottom: 10,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'white',
  },
  loginHeader: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 20,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0056b3',
  },
  formContainer: {
    height: 200,
    width: '100%',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#0056b3',
    textAlign: 'center',
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
    borderWidth: 2,
  },
  button: {
    color: 'white',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 100,
  },
});

export default LoginScreen;
