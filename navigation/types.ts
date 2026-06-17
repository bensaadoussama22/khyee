import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  ClientApp: undefined;
  CoiffeurApp: undefined;
};

export type ClientTabParamList = {
  Home: undefined;
  Search: undefined;
  RDV: undefined;
  Profile: undefined;
};

export type CoiffeurStackParamList = {
  Dashboard: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type ClientTabScreenProps<T extends keyof ClientTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<ClientTabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type CoiffeurStackScreenProps<T extends keyof CoiffeurStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<CoiffeurStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;
