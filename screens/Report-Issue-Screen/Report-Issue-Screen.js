import React, { useState, useEffect } from 'react'; 
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ReportIssueScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sectors, setSectors] = useState([]); 

  const fetchSectors = async () => {
    try {
      const token = AsyncStorage.getItem('token'); // Preuzimanje tokena iz localStorage
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

  /*const [complaints, setComplaints] = useState([]);
  const [loadingComplaints, setLoadingComplaints] = useState(true);

  const fetchComplaints = async () => {
    try {
      const token = AsyncStorage.getItem('token'); 
        const response = await fetch('http://localhost:3000/api/report-issue/all-complaints', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        setComplaints(data.complaints || []); 
        console.log('Dohvaćene Smetnje:', data);
    } catch (error) {
        console.error('Greška prilikom preuzimanja prijava smetnji:', error);
    } finally {
        setLoadingComplaints(false); // Postavi loading na false nakon preuzimanja podataka
    }
};
*/
  const handleSubmit = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/report-issue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, sector: selectedOption, message }),
        });
        const data = await response.json();
        console.log('Server odgovor:', data);

        if (response.ok) {
            alert('Uspjeh, Smetnja je uspješno prijavljena!');
            console.log('Uspjeh, Smetnja je uspješno prijavljena!');
            AsyncStorage.getItem('userRole')
            if ('userRole' === 'Sector Manager') {
              navigation.navigate('/dashboard',
                {
                  params: { refresh: true }, // Prosljeđuje se parametar da osvježimo dashboard
                }
              );
            } else if ('userRole' === 'User') {
              navigation.navigate('/worker-dashboard');
            } else {
              Alert.alert('Greška', 'Nepoznata uloga korisnika');
            }
            navigation.goBack({
              params: { refresh: true }, // Prosljeđuje se parametar da osvježimo dashboard
            });
        } else {
            alert('Greška, Došlo je do greške prilikom prijave smetnje.');
            console.log('Greška, Došlo je do greške prilikom prijave smetnje.');
        }
    } catch (error) {
        console.error('Greška prilikom slanja prijave smetnje:', error);
        alert('Greška, Došlo je do greške prilikom slanja prijave smetnje.');
    }
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
        />
        <Text style={styles.label}>Poruka:</Text>
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={styles.inputMessage}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
        />
        
        <Picker
  selectedValue={selectedOption}
  onValueChange={(itemValue) => setSelectedOption(itemValue)}
  style={[
    styles.picker,
    selectedOption ? styles.pickerSelected : styles.pickerDefault, 
  ]}
>
  <Picker.Item label="Izaberite Sektor" value="" enabled={false} />

  {sectors.map((sector, index) => (
    <Picker.Item 
      key={sector.id || index}  // Ensure unique keys, fall back to index if id is missing
      label={sector} 
      value={sector.id} 
    />
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
  },
  pickerDefault: {
    backgroundColor: '#D9D9D9', 
    color: '#0056b3',
  },
  pickerSelected: {
    backgroundColor: '#0056b3', 
    color: '#FFFFFF',
  },
  buttonWrapper: {
    marginBottom: 15,
  },
});

export default ReportIssueScreen;
