import NetInfo from '@react-native-community/netinfo';
import { useHeaderHeight } from '@react-navigation/elements';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import type { SendScreenProps } from '../navigation/types';

export default function SendScreen({ navigation }: SendScreenProps) {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [networkError, setNetworkError] = useState(false);

  const headerHeight = useHeaderHeight();
  const canSubmit = amount.trim().length > 0 && recipient.trim().length > 0;

  async function handleConfirm() {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      setNetworkError(true);
      return;
    }
    setNetworkError(false);
    navigation.navigate('Confirm', { amount, recipient });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={headerHeight}
    >
      <View style={styles.fields}>
        {networkError && (
          <View testID="error-banner" style={styles.errorBanner}>
            <Text testID="error-message" style={styles.errorText}>
              Network unavailable. Please try again.
            </Text>
            <TouchableOpacity testID="retry-btn" onPress={handleConfirm} style={styles.retryBtn}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.field}>
          <Text style={styles.label}>Recipient</Text>
          <TextInput
            testID="send-recipient-input"
            style={styles.input}
            value={recipient}
            onChangeText={setRecipient}
            placeholder="Name or email"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            testID="send-amount-input"
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="$0.00"
            keyboardType="decimal-pad"
            returnKeyType="done"
          />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          testID="send-confirm-btn"
          style={[styles.button, !canSubmit && styles.buttonDisabled]}
          onPress={handleConfirm}
          disabled={!canSubmit}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fields: {
    flex: 1,
    padding: 24,
    gap: 16,
    justifyContent: 'center',
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  errorBanner: {
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 12,
  },
  errorText: {
    color: '#C62828',
    fontSize: 14,
  },
  retryBtn: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  retryText: {
    color: '#C62828',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  footer: {
    padding: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
