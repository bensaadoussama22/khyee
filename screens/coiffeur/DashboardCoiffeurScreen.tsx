import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppBackground from '../../components/AppBackground';
import SurfaceCard from '../../components/SurfaceCard';
import SurfaceButton from '../../components/SurfaceButton';
import { colors } from '../../theme/colors';
import type { CoiffeurStackScreenProps } from '../../navigation/types';

const SECTIONS: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: 'calendar-outline', label: 'Gérer RDV' },
  { icon: 'stats-chart-outline', label: 'Statistiques' },
  { icon: 'images-outline', label: 'Portfolio' },
  { icon: 'chatbubble-ellipses-outline', label: 'Messages' },
  { icon: 'settings-outline', label: 'Paramètres' },
];

export default function DashboardCoiffeurScreen({ navigation }: CoiffeurStackScreenProps<'Dashboard'>) {
  return (
    <AppBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="flex-row items-center gap-2.5 px-5 pt-2 pb-4">
          <Image source={require('../../assets/logo.png')} className="w-7 h-7" resizeMode="contain" />
          <Text className="font-heading text-white text-lg">Espace Coiffeur</Text>
        </View>

        <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
          <SurfaceCard className="items-center py-9 mb-6">
            <Text className="text-4xl mb-2.5">🚧</Text>
            <Text className="font-heading text-white text-xl mb-3">En construction</Text>
            <View className="bg-accent rounded-xl px-3.5 py-[5px]">
              <Text className="text-white text-xs font-bold tracking-widest">PRO</Text>
            </View>
          </SurfaceCard>

          {SECTIONS.map((section) => (
            <View
              key={section.label}
              className="flex-row items-center gap-3.5 px-4 py-4 rounded-[18px] border border-surfaceBorder bg-[rgba(255,255,255,0.04)] mb-3 opacity-60"
            >
              <Ionicons name={section.icon} size={20} color={colors.gray} />
              <Text className="text-gray text-[15px]">{section.label}</Text>
              <View className="flex-1" />
              <Ionicons name="lock-closed" size={16} color={colors.gray} />
            </View>
          ))}

          <SurfaceButton
            label="Se déconnecter"
            variant="danger"
            className="mt-4"
            onPress={() => navigation.getParent()?.navigate('Login')}
          />
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}
