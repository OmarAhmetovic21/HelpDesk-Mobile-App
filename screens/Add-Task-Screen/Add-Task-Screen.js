import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';

const AddTaskScreen = ({ navigation, onTaskCreated }) => {
  const route = useRoute(); // Primanje podataka iz navigacije
  const { defaultData } = route.params || {}; // Podaci iz navigacije

  const [workers, setWorkers] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(defaultData?.opis || ''); // Postavljanje opisa iz defaultData
  const [sector, setSector] = useState(defaultData?.sektor || ''); // Postavljanje sektora iz defaultData
  const [priority, setPriority] = useState('');
  const [workerEmail, setWorkerEmail] = useState('');
  const [selectedStatus, setStatus] = useState('U toku');


  // Dohvati radnike na osnovu sektora
  const fetchWorkers = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/workers?sector=${encodeURIComponent(sector)}`);
      if (!response.ok) {
        throw new Error(`Greška: ${response.statusText}`);
      }
      const data = await response.json();
      setWorkers(data);
    } catch (error) {
      console.error('Greška prilikom preuzimanja radnika:', error);
    }
  };

  useEffect(() => {
    
    if (defaultData) {
      setSector(defaultData.sektor || '');
      setDescription(defaultData.opis || '');
    }
  }, [defaultData]);


  useEffect(() => {
    if (sector) {
      fetchWorkers(); // Dohvati radnike kada je sektor postavljen
    }
  }, [sector]);

  const handleSubmit = async () => {
    const sifra_taska = `TASK-${Math.floor(Math.random() * 100000)}`;
    const selectedWorker = workers.find(worker => worker.email === workerEmail);

    if (!selectedWorker) {
      alert('Greška Nema radnika s ovim emailom', 'error');
      return;
    }

    const userId = selectedWorker.id;

    try {
      const body = {
        naziv_taska: title,
        tekst_taska: description,
        prioritet: priority,
        sifra_taska,
        userId,
        sector,
        status: selectedStatus,
        //worker: workerEmail
      };

      if (defaultData?.prijavaId) {
        body.prijavaSmetnjiId = defaultData.prijavaId;
      }

      const response = await fetch('http://localhost:3000/api/tasks/create-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert('Uspjeh! Task je uspješno kreiran!', 'success');
        onTaskCreated(defaultData ? defaultData.prijavaId : null);
        navigation.goBack();
      } else {
        alert('Greška Došlo je do greške prilikom kreiranja taska.', 'error');
      }
    } catch (error) {
      /*console.error('Greška prilikom slanja taska:', error);
      alert('Greška Došlo je do greške prilikom slanja taska.', 'error');*/
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginHeader}>
        <Text style={styles.loginTitle}>Dodajte Task:</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Naziv zadatka"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          placeholder="Opis zadatka"
          style={styles.inputMessage}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />

<Picker
  selectedValue={priority}
  onValueChange={(itemValue) => setPriority(itemValue)}
  style={styles.pickerPriority}
>
  <Picker.Item label="Prioritet" value="" enabled={false} />
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
  <Picker.Item label="Dodijelite task" value="" enabled={false} />
  {workers.map((worker, index) => (
    <Picker.Item
      key={worker.id || index}
      label={`${worker.firstname} ${worker.lastname}`} 
      value={worker.email}
    />
  ))}
</Picker>

<Picker
  selectedValue={selectedStatus}
  onValueChange={(itemValue) => setStatus(itemValue)}
  style={styles.pickerStatus}
>
  <Picker.Item label="Status" value="" enabled={false} />
  <Picker.Item label="U toku" value="U toku" />
  <Picker.Item label="Završeno" value="Završeno" />
</Picker>



        <View style={styles.buttonWrapper}>
          <Button title="Spasi" color="#0056b3" onPress={handleSubmit} />
        </View>

        <View style={styles.buttonWrapper}>
          <Button title="Zatvori" color="#ff0808" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 20 },
  loginHeader: { height: 50, justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '10%' },
  loginTitle: { fontSize: 20, fontWeight: 'bold', color: '#0056b3' },
  formContainer: { width: '100%' },
  input: { width: '100%', height: 40, backgroundColor: '#D9D9D9', marginBottom: 10, paddingHorizontal: 10, borderRadius: 9, textAlign: 'center' },
  inputMessage: { width: '100%', height: 90, marginBottom: 10, borderRadius: 9, padding: 5, backgroundColor: '#D9D9D9' },
  pickerPriority: { backgroundColor: '#E39806', borderRadius: 3, color: 'white', marginBottom: 10 },
  pickerWorker: { backgroundColor: '#007F37', borderRadius: 3, color: 'white', marginBottom: 10 },
  pickerStatus: { backgroundColor: '#6E6E6E', borderRadius: 3, color: 'white', marginBottom: 10 },
  buttonWrapper: { marginBottom: 10 },
});

export default AddTaskScreen;
