import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddTaskScreen  = ({ navigation }) =>{
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedWorker, setSelectedWorker] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  return (
    <View style={styles.container}>

      <View style={styles.loginHeader}>
        <Text style={styles.loginTitle}>Dodajte Task:</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Naziv zadatka"
          style={styles.input}
          autoCapitalize="none"
        />
 
        <TextInput
          placeholder='Počnite pisati...'
          style={styles.inputMessage}
          multiline={true}
          numberOfLines={4} // Minimalni broj linija
          textAlignVertical="top"
        />
                <Picker
          selectedValue={selectedPriority}
          onValueChange={(itemValue) => setSelectedPriority(itemValue)}
          style={styles.pickerPriority}
        >
          <Picker.Item label="Prioritet" value="" />
          <Picker.Item label="Urgentno" value="urgent" />
          <Picker.Item label="Visoki" value="high" />
          <Picker.Item label="Srednji" value="medium" />
          <Picker.Item label="Niski" value="low" />
        </Picker>

        <Picker
          selectedValue={selectedWorker}
          onValueChange={(itemValue) => setSelectedWorker(itemValue)}
          style={styles.pickerWorker}
        >
          <Picker.Item label="Dodijeljite task" value="" />
          <Picker.Item label="Radnik" value="urgent" />

        </Picker>

        <Picker
          selectedValue={selectedStatus}
          onValueChange={(itemValue) => setSelectedStatus(itemValue)}
          style={styles.pickerStatus}
        >
          <Picker.Item label="Status" value="" />
          <Picker.Item label="U toku" value="progress" />
          <Picker.Item label="Završeno" value="done" />

        </Picker>
        <View style={styles.buttonWrapper}>
          <Button title="Spasi" color="#0056b3" onPress={() => navigation.navigate('AdminDashboard')} style={styles.buttonSave} />
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="Zatvori"
            color="#ff0808"
            onPress={() => navigation.navigate('AdminDashboard')}
          />
        </View>
         
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

  loginHeader: {
    height: 50,
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
    borderColor: 'white',
    backgroundColor: '#D9D9D9',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 9,
    borderWidth: 2,
    textAlign: 'center',
  },
  inputMessage: {
    width: '100%',
    height: 90,
    borderColor: 'white',
    marginBottom: 10,
    borderRadius: 9,
    borderWidth: 2,
    padding: 5,
    backgroundColor: '#D9D9D9',
  },
  buttonClose: {
    color: 'white',
    marginTop: '5%',
  },
  buttonSave: {
    color: 'white',
  },
  buttonWrapper: {
    marginBottom: 10, // Razmak između dugmadi
  },
  pickerPriority: {
    backgroundColor: '#E39806',
    borderRadius: 3,
    color: 'white',
    marginBottom: 10,
  },
  pickerWorker: {
    backgroundColor: '#007F37',
    borderRadius: 3,
    color: 'white',
    marginBottom: 10,
  },
  pickerStatus: {
    backgroundColor: '#6E6E6E',
    borderRadius: 3,
    color: 'white',
    marginBottom: 10,
  },
});

export default AddTaskScreen;