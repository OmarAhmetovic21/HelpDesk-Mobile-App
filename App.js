import React from 'react';
import LoginScreen from './screens/Login-Screen/LoginScreen';
import DashboardScreen from './screens/Dashboard-Screen/DashboardScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminDashboardScreen from './screens/Admin-Dashboard-Screen/AdminDashboardScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
<NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Dodaješ ovu liniju
        />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{ headerShown: false }} // Ako želiš sakriti header i na Dashboard ekranu
        />
                <Stack.Screen 
          name="AdminDashboard" 
          component={AdminDashboardScreen} 
          options={{ headerShown: false }} // Ako želiš sakriti header i na Dashboard ekranu
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}