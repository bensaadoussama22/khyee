import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppBackground from '../../components/AppBackground';
import SurfaceCard from '../../components/SurfaceCard';
import RdvCoiffeurCard, { RdvCoiffeur } from '../../components/RdvCoiffeurCard';
import { colors } from '../../theme/colors';
import type { CoiffeurTabScreenProps } from '../../navigation/types';

const TODAY_RDVS: RdvCoiffeur[] = [
  { id: '1', clientName: 'Amine Benali', clientPhoto: 'https://i.pravatar.cc/300?img=11', service: 'Coupe + Barbe', date: "Aujourd'hui", hour: '09:30', ticketNumber: 1, status: 'done' },
  { id: '2', clientName: 'Yacine Mokrani', clientPhoto: 'https://i.pravatar.cc/300?img=14', service: 'Coupe', date: "Aujourd'hui", hour: '10:15', ticketNumber: 2, status: 'active' },
  { id: '3', clientName: 'Karim Boudiaf', clientPhoto: 'https://i.pravatar.cc/300?img=53', service: 'Coupe + Barbe', date: "Aujourd'hui", hour: '11:00', ticketNumber: 3, status: 'waiting' },
  { id: '4', clientName: 'Rachid Amrani', clientPhoto: 'https://i.pravatar.cc/300?img=60', service: 'Barbe', date: "Aujourd'hui", hour: '11:45', ticketNumber: 4, status: 'waiting' },
];

type StatBoxProps = {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
};

function StatBox({ icon, value, label }: StatBoxProps) {
  return (
    <SurfaceCard className="flex-1 items-center py-4 px-2">
      <View className="w-9 h-9 rounded-xl bg-[rgba(91,78,232,0.18)] items-center justify-center mb-2">
        <Ionicons name={icon} size={18} color={colors.accent} />
      </View>
      <Text className="text-white font-heading text-xl mb-0.5">{value}</Text>
      <Text className="text-gray text-[11px]">{label}</Text>
    </SurfaceCard>
  );
}

export default function DashboardCoiffeurScreen({ navigation }: CoiffeurTabScreenProps<'Dashboard'>) {
  const [rdvs, setRdvs] = useState(TODAY_RDVS);
  const [isOnline, setIsOnline] = useState(true);

  const handleAccept = (id: string) => {
    setRdvs((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'active' as const } : r)));
  };

  const handleRefuse = (id: string) => {
    setRdvs((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'cancelled' as const } : r)));
  };

  const handleComplete = (id: string) => {
    setRdvs((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'done' as const } : r)));
  };

  const doneCount = rdvs.filter((r) => r.status === 'done').length;
  const activeCount = rdvs.filter((r) => r.status === 'active').length;

  return (
    <AppBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
          <View className="flex-row items-center gap-2.5">
            <Image source={require('../../assets/logo.png')} className="w-7 h-7" resizeMode="contain" />
            <Text className="font-heading text-white text-lg">Espace Coiffeur</Text>
          </View>
          <Pressable className="w-10 h-10 rounded-full bg-surface border border-surfaceBorder items-center justify-center">
            <Ionicons name="notifications" size={20} color={colors.white} />
            <View className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-[9px] bg-accent items-center justify-center px-[3px]">
              <Text className="text-white text-[10px] font-bold">3</Text>
            </View>
          </Pressable>
        </View>

        <SurfaceCard className="mx-5 p-4 mb-5 flex-row items-center">
          <View className={`w-3 h-3 rounded-full mr-3 ${isOnline ? 'bg-green-500' : 'bg-gray'}`} />
          <View className="flex-1">
            <Text className="text-white text-[15px] font-semibold">{isOnline ? 'En ligne' : 'Hors ligne'}</Text>
            <Text className="text-gray text-xs">{isOnline ? 'Visible par les clients' : 'Invisible par les clients'}</Text>
          </View>
          <Switch
            value={isOnline}
            onValueChange={setIsOnline}
            trackColor={{ true: '#22c55e', false: colors.gray }}
            thumbColor="#fff"
          />
        </SurfaceCard>

        <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
          <SurfaceCard className="p-5 mb-5">
            <Text className="text-gray text-sm mb-1">Aujourd'hui</Text>
            <Text className="font-heading text-white text-2xl mb-4">Tableau de bord</Text>
            <View className="flex-row gap-2.5">
              <StatBox icon="calendar" value={`${rdvs.length}`} label="RDV total" />
              <StatBox icon="checkmark-circle" value={`${doneCount}`} label="Terminés" />
              <StatBox icon="people" value={`${activeCount}`} label="En cours" />
            </View>
          </SurfaceCard>

          <View className="flex-row items-center justify-between mb-3.5">
            <Text className="font-heading text-white text-xl">File d'attente</Text>
            <Pressable onPress={() => navigation.navigate('GestionRDV')}>
              <Text className="text-accent text-sm font-semibold">Tout voir</Text>
            </Pressable>
          </View>

          {rdvs.filter((r) => r.status !== 'done' && r.status !== 'cancelled').length === 0 ? (
            <SurfaceCard className="items-center py-8">
              <Text className="text-gray text-sm text-center">Aucun RDV en cours 👍</Text>
            </SurfaceCard>
          ) : (
            rdvs
              .filter((r) => r.status !== 'done' && r.status !== 'cancelled')
              .map((rdv) => (
                <RdvCoiffeurCard
                  key={rdv.id}
                  rdv={rdv}
                  onAccept={() => handleAccept(rdv.id)}
                  onRefuse={() => handleRefuse(rdv.id)}
                  onComplete={() => handleComplete(rdv.id)}
                />
              ))
          )}
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}
