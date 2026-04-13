import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { ConfirmScreenProps } from '../navigation/types';

export default function ConfirmScreen({ navigation, route }: ConfirmScreenProps) {
  const { amount, recipient } = route.params;

  return (
    <View style={styles.container} testID="confirmation-screen">
      <View style={styles.banner}>
        <Text style={styles.check}>✓</Text>
        <Text
          style={styles.heading}
          testID="confirmation-message"
        >
          Payment Sent!
        </Text>
        <Text style={styles.detail}>
          ${amount} to {recipient}
        </Text>
      </View>

      <TouchableOpacity
        testID="confirm-home-btn"
        style={styles.button}
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 32,
  },
  banner: {
    width: '100%',
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    gap: 8,
  },
  check: {
    fontSize: 48,
    color: '#2E7D32',
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2E7D32',
  },
  detail: {
    fontSize: 15,
    color: '#4CAF50',
  },
  button: {
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
