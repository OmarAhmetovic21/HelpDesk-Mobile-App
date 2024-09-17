import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddTaskScreen  = ({ navigation }) =>{

  return (
    <View style={styles.container}>
      {/*<View style={styles.imageHeader}>
      <Image style={styles.logoImage} source={require('./logo_samo.png')} />

      </View>*/}
      <View style={styles.loginHeader}>
        <Text style={styles.loginTitle}>Dodajte Task</Text>
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
         <Button title="Spasi" color="#0056b3" onPress={() => navigation.navigate('AdminDashboard')} style={styles.buttonSave} />
      </View>
      <Button title="Zatvori" color="#ff0808" onPress={() => navigation.navigate('AdminDashboard')} style={styles.buttonClose} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
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
    marginTop: '10%',
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0056b3',
  },
  formContainer: {
    height: '30%', // Adjust the flex value as needed
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
  buttonClose: {
    color: 'white',
    marginTop: '5%',
  },
  buttonSave: {
    color: 'white',
  },
});

export default AddTaskScreen;