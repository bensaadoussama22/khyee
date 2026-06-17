import './global.css';
import './nativewind-interop';
import React, { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, AoboshiOne_400Regular } from '@expo-google-fonts/aoboshi-one';
import RootNavigator from './navigation/RootNavigator';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [fontsLoaded] = useFonts({ AoboshiOne_400Regular });

  const onLayout = useCallback(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <View className="flex-1 bg-background" />;
  }

  return (
    <SafeAreaProvider onLayout={onLayout} className="bg-background">
      <StatusBar style="light" />
      <RootNavigator />
    </SafeAreaProvider>
  );
}
