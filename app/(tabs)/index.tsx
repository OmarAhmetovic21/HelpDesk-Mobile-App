import { Platform, View, Text, TextInput, Button, StyleSheet, Image,Pressable } from 'react-native';
import React, { useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };
  return (
    <View style={styles.container}>
      <View>
      <Image source={require('@/assets/images/logo_samo.png')} style={styles.logo} />
      </View>
      <View style={styles.titleView}>
      <Text style={styles.title}>Sarajevogas Helpdesk</Text>
      </View>
      <Text style={styles.label}>Login</Text>
      <Text style={styles.labelCaption}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="ime.prezime@sarajevogas.ba"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Text style={styles.labelCaption}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Unesi svoj password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {/*<Button title="Login" onPress={handleLogin}/>*/}
      <Pressable style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? '#004494'
              : '#0056b3'
          },
          styles.button
        ]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    //marginBottom: 100
  },
  title: {
    //justifyContent: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign:'center',
    marginTop:'2.5%'
  },
  label: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#224798'
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  titleView: {
    backgroundColor:'#007F37',
    width: '100%', 
    height:'7%',
    marginBottom: 60
  },
    button: {
      width: '100%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      marginBottom: 300,
      marginTop: 20
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    labelCaption:{
      fontSize: 17,
      marginBottom: 10,
      color: '#224798'
    }
});
