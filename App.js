import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './screens/Login-Screen/LoginScreen';

export default function App() {
  return (
    <PaperProvider>
      <LoginScreen />
    </PaperProvider>
  );
}