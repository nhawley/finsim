import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Send: undefined;
  Confirm: { amount: string; recipient: string };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type SendScreenProps = NativeStackScreenProps<RootStackParamList, 'Send'>;
export type ConfirmScreenProps = NativeStackScreenProps<RootStackParamList, 'Confirm'>;
