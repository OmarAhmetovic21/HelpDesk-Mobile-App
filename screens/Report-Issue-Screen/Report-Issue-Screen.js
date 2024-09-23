import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ReportIssueScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sectors, setSectors] = useState([]);

  // Funkcija za dohvaćanje sektora
  const fetchSectors = async () => {
    try {
      const token = localStorage.getItem('token'); // Preuzimanje tokena iz localStorage
      const response = await fetch('http://localhost:3000/api/report-issue/sectors', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await response.json();
      console.log('Dohvaćeni sektori:', data);
      setSectors(data || []); // Postavljanje dobijenih sektora u state
    } catch (error) {
      console.error('Greška prilikom dohvata sektora:', error);
      Alert.alert('Greška', 'Nije moguće dohvatiti sektore. Pokušajte ponovo.');
    }
  };

  // Učitavanje sektora kada se komponenta učita
  useEffect(() => {
    fetchSectors();
  }, []);

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
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="ime.prezime@sarajevogas.ba"
          style={styles.inputEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Poruka:</Text>
        <TextInput
          style={styles.inputMessage}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          value={message}
          onChangeText={setMessage}
        />

<Picker
  selectedValue={selectedOption}
  onValueChange={(itemValue, itemIndex) => setSelectedOption(itemValue)}
  style={[
    styles.picker,
    selectedOption === '' ? styles.pickerDefault : styles.pickerSelected,
  ]}
>
  <Picker.Item label="Izaberite Sektor" value="" />
  {sectors.length > 0 ?
    sectors.map((sector, index) => (
      <Picker.Item key={index} label={sector.name} value={sector.id} />
    )) : <Picker.Item label="Nema dostupnih sektora" value="0" />
  }
</Picker>

        <View style={styles.buttonWrapper}>
          <Button
            title="Spasi"
            color="#007F37"
            onPress={() => navigation.navigate('AdminDashboard')}
          />
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

// Stilovi za komponentu
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
    color: '#007F37',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#AFAFAF',
  },
  inputEmail: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: '#AFAFAF',
    borderBottomWidth: 2,
  },
  inputName: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: '#007F37',
    borderBottomWidth: 2,
  },
  inputMessage: {
    width: '100%',
    height: 90,
    borderColor: '#AFAFAF',
    marginBottom: 10,
    borderRadius: 9,
    borderWidth: 2,
    padding: 5,
  },
  picker: {
    height: 50,  // Kontroliši visinu picker-a
    backgroundColor: '#f0f0f0', // Lagano siva pozadina
    borderRadius: 5, // Lagano zaobljeni uglovi
    marginVertical: 10, // Prostor iznad i ispod picker-a
    color: '#224798', // Dodaj boju za prikazani tekst
  },
  pickerDefault: {
    backgroundColor: '#f0f0f0',
    color: '#AFAFAF', // Siva boja teksta kada ništa nije izabrano
  },
  pickerSelected: {
    color: '#000000', // Crna boja teksta kada je nešto izabrano
  },
  buttonWrapper: {
    marginBottom: 15,
  },
});

export default ReportIssueScreen;
