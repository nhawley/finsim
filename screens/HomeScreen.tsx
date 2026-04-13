import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { HomeScreenProps } from '../navigation/types';

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Balance</Text>
      <Text
        style={styles.balance}
        testID='home-balance'
      >
        $1,250.00
      </Text>
      <TouchableOpacity testID="home-send-btn" style={styles.button} onPress={() => navigation.navigate('Send')}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  balance: {
    fontSize: 48,
    fontWeight: '700',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
