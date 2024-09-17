import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ReportIssueScreen  = ({ navigation }) =>{

  return (
    <View style={styles.container}>

      <View style={styles.loginHeader}>
        <Text style={styles.loginTitle}>Prijavite Smetnju:</Text>
      </View>
      <View style={styles.formContainer}>
      <TextInput
          placeholder="Ime i Prezime"
          style={styles.inputName}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="ime.prezime@sarajevogas.ba"
          style={styles.inputEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Poruka:</Text>
        <TextInput
          style={styles.inputMessage}
        />
        <Button title="Spasi" color="#007F37" onPress={() => navigation.navigate('AdminDashboard')} style={styles.buttonSave} />
        <Button title="Zatvori" color="#ff0808" onPress={() => navigation.navigate('AdminDashboard')} style={styles.buttonClose} />
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
    color: '#007F37',
  },
  formContainer: {
    height: '30%', // Adjust the flex value as needed
    width: '100%',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color:'#AFAFAF',
  },
  inputEmail: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: '#AFAFAF',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
  },
  inputName: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 0,
    borderColor: '#007F37',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
  },
  inputMessage: {
    width: '100%',
    height: 80,
    borderColor: 'AFAFAF',
    marginBottom: 10,
    borderRadius: 9,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
  },
  buttonClose: {
    color: 'white',
    
  },
  buttonSave: {
    color: 'white',
    marginBottom: 10,
  },

});

export default ReportIssueScreen;