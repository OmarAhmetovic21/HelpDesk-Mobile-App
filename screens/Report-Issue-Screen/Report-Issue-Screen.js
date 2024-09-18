import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ReportIssueScreen = ({ navigation }) => {
  const [selectedSektor, setSelectedSektor] = useState("");

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
          multiline={true}
          numberOfLines={4} // Minimalni broj linija
          textAlignVertical="top"
        />
        <Picker
          selectedValue={selectedSektor}
          onValueChange={(itemValue) => setSelectedSektor(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Izaberite Sektor" value="" />
          <Picker.Item label="Sektor 1" value="sektor1" />
          <Picker.Item label="Sektor 2" value="sektor2" />
          <Picker.Item label="Sektor 3" value="sektor3" />
        </Picker>

        {/* Razmak između dugmića postignut korištenjem margine ispod svakog dugmeta */}
        <View style={styles.buttonWrapper}>
          <Button
            title="Pošalji"
            color="#007F37"
            onPress={() => navigation.navigate('AdminDashboard')}
          />
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
  buttonWrapper: {
    marginBottom: 10, // Razmak između dugmadi
  },
  picker: {
    backgroundColor: '#D9D9D9',
    borderRadius: 3,
    color: '#0056b3',
    marginBottom: 10,
  },
});

export default ReportIssueScreen;
