import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ReportIssueScreen  = ({ navigation }) =>{

  return (
    <View style={styles.container}>
      {/*<View style={styles.imageHeader}>
      <Image style={styles.logoImage} source={require('./logo_samo.png')} />

      </View>*/}
      <View style={styles.header}>
        <Text style={styles.title}>Sarajevogas Helpdesk</Text>
      </View>
      <View style={styles.loginHeader}>
        <Text style={styles.loginTitle}>Prijavite Smetnju</Text>
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
        <Button title="Login" color="#0056b3" onPress={() => navigation.navigate('Dashboard')} style={styles.button} />
        <Button title="Login Admin" color="#0056b3" onPress={() => navigation.navigate('AdminDashboard')} style={styles.button} />
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
    fontSize: 21,
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
  loginTitle: {
    fontSize: 20,
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
    marginTop: 100,
  },
});

export default ReportIssueScreen;