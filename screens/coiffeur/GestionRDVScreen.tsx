import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppBackground from '../../components/AppBackground';
import RdvCoiffeurCard, { RdvCoiffeur } from '../../components/RdvCoiffeurCard';
import { colors } from '../../theme/colors';
import type { CoiffeurTabScreenProps } from '../../navigation/types';

type Tab = 'all' | 'waiting' | 'active' | 'done';

const ALL_RDVS: RdvCoiffeur[] = [
  { id: '1', clientName: 'Amine Benali', clientPhoto: 'https://i.pravatar.cc/300?img=11', service: 'Coupe + Barbe', date: "Aujourd'hui", hour: '09:30', ticketNumber: 1, status: 'done' },
  { id: '2', clientName: 'Yacine Mokrani', clientPhoto: 'https://i.pravatar.cc/300?img=14', service: 'Coupe', date: "Aujourd'hui", hour: '10:15', ticketNumber: 2, status: 'active' },
  { id: '3', clientName: 'Karim Boudiaf', clientPhoto: 'https://i.pravatar.cc/300?img=53', service: 'Coupe + Barbe', date: "Aujourd'hui", hour: '11:00', ticketNumber: 3, status: 'waiting' },
  { id: '4', clientName: 'Rachid Amrani', clientPhoto: 'https://i.pravatar.cc/300?img=60', service: 'Barbe', date: "Aujourd'hui", hour: '11:45', ticketNumber: 4, status: 'waiting' },
  { id: '5', clientName: 'Sofiane Haddad', clientPhoto: 'https://i.pravatar.cc/300?img=17', service: 'Coupe', date: 'Demain', hour: '09:00', ticketNumber: 1, status: 'waiting' },
  { id: '6', clientName: 'Omar Khelifi', clientPhoto: 'https://i.pravatar.cc/300?img=22', service: 'Coupe + Barbe', date: 'Demain', hour: '10:30', ticketNumber: 2, status: 'waiting' },
  { id: '7', clientName: 'Mohamed Zeroual', clientPhoto: 'https://i.pravatar.cc/300?img=35', service: 'Barbe', date: '20 Juin', hour: '14:00', ticketNumber: 5, status: 'done' },
  { id: '8', clientName: 'Nadir Benslimane', clientPhoto: 'https://i.pravatar.cc/300?img=44', service: 'Coupe', date: '18 Juin', hour: '11:00', ticketNumber: 3, status: 'done' },
];

const TABS: { key: Tab; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'waiting', label: 'En attente' },
  { key: 'active', label: 'En cours' },
  { key: 'done', label: 'Terminés' },
];

export default function GestionRDVScreen({ navigation }: CoiffeurTabScreenProps<'GestionRDV'>) {
  const [rdvs, setRdvs] = useState(ALL_RDVS);
  const [tab, setTab] = useState<Tab>('all');

  const filtered = tab === 'all' ? rdvs : rdvs.filter((r) => r.status === tab);

  const handleAccept = (id: string) => {
    setRdvs((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'active' as const } : r)));
  };

  const handleRefuse = (id: string) => {
    setRdvs((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'cancelled' as const } : r)));
  };

  const handleComplete = (id: string) => {
    setRdvs((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'done' as const } : r)));
  };

  return (
    <AppBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="flex-row items-center gap-2.5 px-5 pt-2 pb-4">
          <Image source={require('../../assets/logo.png')} className="w-7 h-7" resizeMode="contain" />
          <Text className="font-heading text-white text-lg">Gérer RDV</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 gap-2.5" className="grow-0 mb-4">
          {TABS.map((t) => {
            const active = tab === t.key;
            const count = t.key === 'all' ? rdvs.length : rdvs.filter((r) => r.status === t.key).length;
            return (
              <Pressable key={t.key} onPress={() => setTab(t.key)}>
                <View className={`flex-row items-center gap-1.5 rounded-2xl border px-4 py-2 ${active ? 'bg-accent border-accent' : 'bg-surfaceBg border-surfaceBorder'}`}>
                  <Text className={`text-[13px] font-semibold ${active ? 'text-white' : 'text-gray'}`}>{t.label}</Text>
                  <View className={`min-w-[20px] h-5 rounded-[10px] items-center justify-center px-1 ${active ? 'bg-white/20' : 'bg-surfaceBorder'}`}>
                    <Text className={`text-[11px] font-bold ${active ? 'text-white' : 'text-gray'}`}>{count}</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>

        <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
          {filtered.length === 0 ? (
            <View className="items-center mt-20">
              <Text className="text-gray text-[15px]">Aucun rendez-vous dans cette catégorie</Text>
            </View>
          ) : (
            filtered.map((rdv) => (
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

