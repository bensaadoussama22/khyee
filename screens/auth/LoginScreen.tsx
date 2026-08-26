import React from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBackground from '../../components/AppBackground';
import SurfaceButton from '../../components/SurfaceButton';
import type { RootStackScreenProps } from '../../navigation/types';

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
  return (
    <AppBackground>
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center px-7">
          <Image source={require('../../assets/logo.png')} className="w-[140px] h-[140px] mb-8" resizeMode="contain" />

          <Text className="font-heading text-white text-[26px] text-center mb-2.5">Bienvenue khyee 👋</Text>
          <Text className="text-gray text-[15px] text-center mb-12">Connecte-toi pour continuer</Text>

          <View className="w-full gap-4">
            <SurfaceButton
              label="Je suis Client"
              variant="primary"
              className="w-full"
              onPress={() => navigation.navigate('ClientApp')}
            />
            <SurfaceButton
              label="Je suis Coiffeur"
              variant="outline"
              className="w-full"
              onPress={() => navigation.navigate('CoiffeurApp')}
            />
          </View>
        </View>
      </SafeAreaView>
    </AppBackground>
  );
}
