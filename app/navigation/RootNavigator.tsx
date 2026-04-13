import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ConfirmScreen from '../screens/ConfirmScreen';
import HomeScreen from '../screens/HomeScreen';
import SendScreen from '../screens/SendScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'FinSim' }} />
      <Stack.Screen name="Send" component={SendScreen} options={{ title: 'Send Money' }} />
      <Stack.Screen
        name="Confirm"
        component={ConfirmScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}
