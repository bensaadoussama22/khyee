import React from 'react';
import { Platform, View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/auth/LoginScreen';
import HomeScreen from '../screens/client/HomeScreen';
import SearchScreen from '../screens/client/SearchScreen';
import RDVScreen from '../screens/client/RDVScreen';
import ProfileScreen from '../screens/client/ProfileScreen';
import BarberProfileScreen from '../screens/client/BarberProfileScreen';
import BookingScreen from '../screens/client/BookingScreen';
import DashboardCoiffeurScreen from '../screens/coiffeur/DashboardCoiffeurScreen';
import GestionRDVScreen from '../screens/coiffeur/GestionRDVScreen';
import StatsScreen from '../screens/coiffeur/StatsScreen';
import PortfolioScreen from '../screens/coiffeur/PortfolioScreen';
import ProfileCoiffeurScreen from '../screens/coiffeur/ProfileCoiffeurScreen';

import { colors } from '../theme/colors';
import type { ClientTabParamList, ClientStackParamList, CoiffeurTabParamList, RootStackParamList } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const ClientStack = createNativeStackNavigator<ClientStackParamList>();
const ClientTab = createBottomTabNavigator<ClientTabParamList>();
const CoiffeurTab = createBottomTabNavigator<CoiffeurTabParamList>();

const CLIENT_TAB_ICONS: Record<keyof ClientTabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'home',
  Search: 'search',
  RDV: 'calendar',
  Profile: 'person',
};

const COIFFEUR_TAB_ICONS: Record<keyof CoiffeurTabParamList, keyof typeof Ionicons.glyphMap> = {
  Dashboard: 'grid',
  GestionRDV: 'calendar',
  Stats: 'stats-chart',
  Portfolio: 'images',
  Profil: 'person',
};

const COIFFEUR_TAB_LABELS: Record<keyof CoiffeurTabParamList, string> = {
  Dashboard: 'Accueil',
  GestionRDV: 'RDV',
  Stats: 'Stats',
  Portfolio: 'Portfolio',
  Profil: 'Profil',
};

function ClientTabs() {
  return (
    <ClientTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <View
            className="absolute inset-0 rounded-3xl bg-surface border border-surfaceBorder overflow-hidden"
            style={{ borderCurve: 'continuous' }}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={CLIENT_TAB_ICONS[route.name as keyof ClientTabParamList]} color={color} size={size} />
        ),
      })}
    >
      <ClientTab.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
      <ClientTab.Screen name="Search" component={SearchScreen} options={{ title: 'Recherche' }} />
      <ClientTab.Screen name="RDV" component={RDVScreen} options={{ title: 'RDV' }} />
      <ClientTab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
    </ClientTab.Navigator>
  );
}

function ClientNavigator() {
  return (
    <ClientStack.Navigator screenOptions={{ headerShown: false }}>
      <ClientStack.Screen name="ClientTabs" component={ClientTabs} />
      <ClientStack.Screen name="BarberProfile" component={BarberProfileScreen} />
      <ClientStack.Screen name="Booking" component={BookingScreen} />
    </ClientStack.Navigator>
  );
}

function CoiffeurTabs() {
  return (
    <CoiffeurTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: styles.tabBar,
        tabBarLabel: COIFFEUR_TAB_LABELS[route.name as keyof CoiffeurTabParamList],
        tabBarBackground: () => (
          <View
            className="absolute inset-0 rounded-3xl bg-surface border border-surfaceBorder overflow-hidden"
            style={{ borderCurve: 'continuous' }}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={COIFFEUR_TAB_ICONS[route.name as keyof CoiffeurTabParamList]} color={color} size={size} />
        ),
      })}
    >
      <CoiffeurTab.Screen name="Dashboard" component={DashboardCoiffeurScreen} />
      <CoiffeurTab.Screen name="GestionRDV" component={GestionRDVScreen} />
      <CoiffeurTab.Screen name="Stats" component={StatsScreen} />
      <CoiffeurTab.Screen name="Portfolio" component={PortfolioScreen} />
      <CoiffeurTab.Screen name="Profil" component={ProfileCoiffeurScreen} />
    </CoiffeurTab.Navigator>
  );
}

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.background,
    primary: colors.accent,
    border: colors.surfaceBorder,
  },
};

export default function RootNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="ClientApp" component={ClientNavigator} />
        <RootStack.Screen name="CoiffeurApp" component={CoiffeurTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = {
  tabBar: {
    position: 'absolute' as const,
    left: 16,
    right: 16,
    bottom: Platform.select({ ios: 24, default: 16 }),
    height: 64,
    borderRadius: 24,
    borderCurve: 'continuous' as const,
    backgroundColor: 'transparent',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
};
