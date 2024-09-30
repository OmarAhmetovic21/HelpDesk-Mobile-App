import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddTaskScreen  = ({ navigation, route, defaultData, onTaskCreated  }) =>{


  /*const handleSubmit = async (event) => {
    event.preventDefault();

    // Generiši šifru taska (ili možeš tražiti od korisnika da unese)
    const sifra_taska = `TASK-${Math.floor(Math.random() * 100000)}`;

    // Pronađi userId na osnovu emaila radnika (moraš dobiti userId iz baze na osnovu emaila)
    const selectedWorker = workers.find(worker => worker.email === workerEmail);

    if (!selectedWorker) {
        Swal.fire('Greška', 'Nema radnika s ovim emailom', 'error');
        return;
    }

    const userId = selectedWorker.id; // Dobij userId radnika

    // Provjeri da li sektor postoji
    console.log('Sector koji se šalje:', sector);

    try {
        // Priprema tijela zahtjeva
        const body = {
            naziv_taska: title,
            tekst_taska: description,
            prioritet: priority,
            sifra_taska, // Dodaj šifru taska
            userId, // Dodaj ID radnika
            sector, // Dodaj sektor
            status,
        };

        // Ako postoji prijava smetnji, dodaj prijavaSmetnjiId u tijelo zahtjeva
        if (defaultData && defaultData.prijavaId) {
            body.prijavaSmetnjiId = defaultData.prijavaId;
        }

        // Slanje zahtjeva za kreiranje taska
        const response = await fetch('http://localhost:3000/api/tasks/create-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            Swal.fire('Uspjeh!', 'Task je uspješno kreiran!', 'success');
            onTaskCreated(defaultData ? defaultData.prijavaId : null); // Ažuriraj prijave na parent komponenti
            toggle(); // Zatvori modal nakon uspješnog kreiranja taska
        } else {
            Swal.fire('Greška', 'Došlo je do greške prilikom kreiranja taska.', 'error');
        }
    } catch (error) {
        console.error('Greška prilikom slanja taska:', error);
        Swal.fire('Greška', 'Došlo je do greške prilikom slanja taska.', 'error');
    }
};*/

const [workers, setWorkers] = useState([]);
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [sector, setSector] = useState('');
const [priority, setPriority] = useState('');
const [workerEmail, setWorkerEmail] = useState('');
const [status, setStatus] = useState('U toku');

useEffect(() => {
  if (defaultData) {
    setSector(defaultData.sektor || '');
    setDescription(defaultData.opis || '');
  }
}, [defaultData]);

console.log('Pohranjeni podaci o smetnji:', [defaultData]);

const { complaint } = route.params;

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
          value={title}
          onChangeText={setTitle}
        />
 
        <TextInput
          placeholder='Počnite pisati...'
          style={styles.inputMessage}
          multiline={true}
          numberOfLines={4} // Minimalni broj linija
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />
                <Picker
          selectedValue={priority}
          onValueChange={(itemValue) => setPriority(itemValue)}
          style={styles.pickerPriority}
        >
          <Picker.Item label="Prioritet" value="" />
          <Picker.Item label="Urgentno" value="Urgentno" />
          <Picker.Item label="Visoki" value="Visoki" />
          <Picker.Item label="Srednji" value="Srednji" />
          <Picker.Item label="Niski" value="Niski" />
        </Picker>

        <Picker
          selectedValue={workerEmail}
          onValueChange={(itemValue) => setWorkerEmail(itemValue)}
          style={styles.pickerWorker}
        >
          <Picker.Item label="Dodijeljite task" value="" />
          <Picker.Item label="Radnik" value="urgent" />

        </Picker>

        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          style={styles.pickerStatus}
        >
          <Picker.Item label="Status" value="" />
          <Picker.Item label="U toku" value="progress" />
          <Picker.Item label="Završeno" value="done" />

        </Picker>
        <View style={styles.buttonWrapper}>
          <Button title="Spasi" color="#0056b3" onPress={() => navigation.navigate('Dashboard')} style={styles.buttonSave} />
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="Zatvori"
            color="#ff0808"
            onPress={() => navigation.goBack()}
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