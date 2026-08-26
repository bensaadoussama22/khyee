import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppBackground from '../../components/AppBackground';
import SurfaceCard from '../../components/SurfaceCard';
import { colors } from '../../theme/colors';

const SERVICES = [
  { name: 'Coupe + Barbe', count: 45 },
  { name: 'Coupe', count: 32 },
  { name: 'Barbe', count: 18 },
  { name: 'Dégradé', count: 12 },
];

type StatBoxProps = {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
  color?: string;
};

function StatBox({ icon, value, label, color = colors.accent }: StatBoxProps) {
  return (
    <SurfaceCard className="flex-1 items-center py-5 px-2">
      <View className="w-10 h-10 rounded-xl bg-[rgba(91,78,232,0.18)] items-center justify-center mb-2.5">
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text className="text-white font-heading text-xl mb-0.5">{value}</Text>
      <Text className="text-gray text-[11px] text-center">{label}</Text>
    </SurfaceCard>
  );
}

export default function StatsScreen() {
  const totalServices = SERVICES.reduce((sum, s) => sum + s.count, 0);

  return (
    <AppBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="px-5 pt-2 pb-4">
          <Text className="font-heading text-white text-[22px]">Statistiques</Text>
        </View>

        <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
          <View className="flex-row gap-2.5 mb-5">
            <StatBox icon="cut" value={`${totalServices}`} label="Services" />
            <StatBox icon="people" value="67" label="Clients uniques" />
          </View>

          <View className="flex-row gap-2.5 mb-5">
            <StatBox icon="star" value="4.9" label="Note moyenne" />
            <StatBox icon="time" value="128h" label="Temps total" />
          </View>

          <SurfaceCard className="p-5">
            <Text className="font-heading text-white text-lg mb-4">Services populaires</Text>
            {SERVICES.map((service) => {
              const percentage = (service.count / Math.max(...SERVICES.map((s) => s.count))) * 100;
              return (
                <View key={service.name} className="mb-4 last:mb-0">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-white text-sm font-semibold">{service.name}</Text>
                    <Text className="text-gray text-xs">{service.count} fois</Text>
                  </View>
                  <View className="h-2 rounded-full bg-surfaceBorder overflow-hidden">
                    <View className="h-full rounded-full bg-accent" style={{ width: `${percentage}%` }} />
                  </View>
                </View>
              );
            })}
          </SurfaceCard>
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}
