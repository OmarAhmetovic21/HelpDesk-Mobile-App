import React from 'react';
import LoginScreen from './screens/Login-Screen/LoginScreen';
import WorkerDashboard from './screens/Worker-Dashboard/WorkerDashboard';
import Dashboard from './screens/Dashboard/Dashboard';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTaskScreen from './screens/Add-Task-Screen/Add-Task-Screen';
import ReportIssueScreen from './screens/Report-Issue-Screen/Report-Issue-Screen';

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
          name="/worker-dashboard" 
          component={WorkerDashboard} 
          options={{ headerShown: false }} // Ako želiš sakriti header i na Dashboard ekranu
        />
                <Stack.Screen 
          name="/dashboard" 
          component={Dashboard} 
          options={{ headerShown: false }} // Ako želiš sakriti header i na Dashboard ekranu
        />
                        <Stack.Screen 
          name="AddTask" 
          component={AddTaskScreen} 
          options={{ headerShown: false }} // Ako želiš sakriti header i na Dashboard ekranu
        />
                                <Stack.Screen 
          name="ReportIssue" 
          component={ReportIssueScreen} 
          options={{ headerShown: false }} // Ako želiš sakriti header i na Dashboard ekranu
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}