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

export type ClientStackParamList = {
  ClientTabs: undefined;
  BarberProfile: { barberId: string; barberName: string; barberPhoto: string; barberRating: number; barberCity: string; barberDistance: string; barberPrice: string; barberAvailable: boolean };
  Booking: { barberName: string; barberPhoto: string; service: string };
};

export type CoiffeurTabParamList = {
  Dashboard: undefined;
  GestionRDV: undefined;
  Stats: undefined;
  Portfolio: undefined;
  Profil: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type ClientTabScreenProps<T extends keyof ClientTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<ClientTabParamList, T>,
  NativeStackScreenProps<ClientStackParamList>
>;

export type CoiffeurTabScreenProps<T extends keyof CoiffeurTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<CoiffeurTabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type ClientStackScreenProps<T extends keyof ClientStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<ClientStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;
