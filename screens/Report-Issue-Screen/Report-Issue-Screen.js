import React, { useState, useEffect } from 'react'; 
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ReportIssueScreen = ({ navigation }) => {
  //const [selectedSektor, setSelectedSektor] = useState("");
  const [selectedOption, setSelectedOption] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sectors, setSectors] = useState([]); 

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/api/report-issue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, sector: selectedOption, message }),
        });

        if (response.ok) {
            alert('Smetnja je uspješno prijavljena!');
            toggleModal();
        } else {
            alert('Došlo je do greške prilikom prijave smetnje.');
        }
    } catch (error) {
        console.error('Greška prilikom slanja prijave smetnje:', error);
        alert('Došlo je do greške prilikom slanja prijave smetnje.');
    }
};

const handleChange = (event) => {
  setSelectedOption(event.target.value);
};


  return (
    <View style={styles.container}>

      <View style={styles.loginHeader}>
        <Text style={styles.loginTitle}>Prijavite Smetnju:</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Ime i Prezime"
          value={name}
          onChangeText={setName}
          style={styles.inputName}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="ime.prezime@sarajevogas.ba"
          value={email}
          onChangeText={setEmail}
          style={styles.inputEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          required
        />
        <Text style={styles.label}>Poruka:</Text>
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={styles.inputMessage}
          multiline={true}
          numberOfLines={4} // Minimalni broj linija
          textAlignVertical="top"
          required 
        />
        
        <Picker
value={selectedOption}
onChange={handleChange}
          name="sector" 
          required 
          style={[
            styles.picker,
            selectedOption ? styles.pickerSelected : styles.pickerDefault, // Primjena stilova zavisi od vrijednosti
          ]}
        >
          {/* "Izaberite Sektor" je vidljivo, ali onemogućeno za izbor */}
          <Picker.Item label="Izaberite Sektor" value="" enabled={false} />

          {/* Mapiranje sektora dohvaćenih sa API-ja u Picker.Item */}
          {sectors.map((sector) => (
            <Picker.Item key={sector.id} label={sector} value={sector.id} />
          ))}

        </Picker>

        <View style={styles.buttonWrapper}>
          <Button
            title="Pošalji"
            color="#007F37"
            onPress={handleSubmit}
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
    backgroundColor: '#D9D9D9',
    borderRadius: 3,
    color: '#0056b3',
    marginBottom: 10,
    borderRadius: 3,
  },
  pickerDefault: {
    backgroundColor: '#D9D9D9', // Siva pozadina kada nije izabrano ništa
    color: '#0056b3', // Plava boja teksta kada je siva pozadina
  },
  pickerSelected: {
    backgroundColor: '#0056b3', // Plava pozadina kada je izabrana vrijednost
    color: '#FFFFFF', // Bijela boja teksta kada je plava pozadina
  },
  buttonWrapper: {
    marginBottom: 15,
  },
});

export default ReportIssueScreen;
