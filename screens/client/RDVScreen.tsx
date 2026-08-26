import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppBackground from '../../components/AppBackground';
import SurfaceCard from '../../components/SurfaceCard';
import SurfaceButton from '../../components/SurfaceButton';
import RdvCard, { Rdv } from '../../components/RdvCard';
import { colors } from '../../theme/colors';

type Tab = 'upcoming' | 'history';

type UpcomingAppointment = Rdv & {
  barberPhoto: string;
  service: string;
  currentNumber: number;
  address: string;
  city: string;
};

const NEXT_APPOINTMENT: UpcomingAppointment | null = {
  id: '1',
  barberName: 'Salon Nadir',
  date: '18 Juin',
  ticketNumber: 7,
  status: 'confirmed',
  barberPhoto: 'https://i.pravatar.cc/600?img=12',
  service: 'Coupe + Barbe',
  currentNumber: 4,
  address: 'Rue Émir Abdelkader',
  city: 'Tlemcen',
};

const HISTORY: Rdv[] = [
  { id: '2', barberName: 'Barber Karim', date: '02 Juin, 10h00', ticketNumber: 3, status: 'done' },
  { id: '3', barberName: 'Yacine Cuts', date: '20 Mai, 16h00', ticketNumber: 5, status: 'done' },
];
function StepItem({
  label,
  status,
}: {
  label: string;
  status: 'done' | 'active' | 'pending';
}) {
  const isDone = status === 'done';
  const isActive = status === 'active';

  return (
    <View className="flex-row items-center mb-4">
      {/* Circle */}
      <View
        className={`w-5 h-5 rounded-full items-center justify-center mr-3
        ${isDone ? 'bg-accent' : isActive ? 'bg-accent' : 'bg-surfaceBorder'}`}
      >
        {isDone && <Ionicons name="checkmark" size={12} color="#fff" />}
        {isActive && (
          <View className="w-2 h-2 rounded-full bg-white" />
        )}
      </View>

      {/* Label */}
      <Text
        className={`text-sm font-medium
        ${isDone ? 'text-white' : isActive ? 'text-accent' : 'text-gray'}`}
      >
        {label}
      </Text>
    </View>
  );
}
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View className="flex-row items-center gap-3 py-3">
      <View className="w-9 h-9 rounded-xl bg-[rgba(91,78,232,0.18)] items-center justify-center">
        <Ionicons name={icon} size={16} color={colors.accent} />
      </View>
      <View className="flex-1">
        <Text className="text-gray text-xs mb-0.5">{label}</Text>
        <Text className="text-white text-sm font-semibold">{value}</Text>
      </View>
    </View>
  );
}

function UpcomingDetail({ rdv, onCancel }: { rdv: UpcomingAppointment; onCancel: () => void }) {
  return (
    <View className="mb-7">
      <SurfaceCard className="p-0 mb-4 overflow-hidden">
        <Image source={{ uri: rdv.barberPhoto }} className="w-full h-44" />
        <View className="p-[18px]">
          <View className="flex-row items-start justify-between mb-2">
            <View className="flex-1">
              <Text className="text-white text-lg font-semibold mb-1">{rdv.barberName}</Text>
              <Text className="text-gray text-sm">{rdv.service}</Text>
            </View>
            <View className="rounded-xl h-14 w-14 px-2.5 py-[5px] bg-[rgba(91,78,232,0.25)]">
            <Text className="text-accent font-heading text-[22px]">#{rdv.ticketNumber}</Text>

            </View>
          </View>
          <View className="flex-row items-center justify-center mt-2 gap-6">
            <View className="items-center">
              <Text className="text-gray text-lg mb-1">Numéro actuel</Text>
              <Text className="text-white font-heading text-[26px]">{rdv.currentNumber}</Text>
            </View>
            <View className="w-px h-10 bg-surfaceBorder" />
            
          </View>
        </View>
      </SurfaceCard>

      <SurfaceCard className="px-[18px] mb-4">
        <InfoRow icon="calendar" label="Date" value={rdv.date} />
        <View className="h-px bg-surfaceBorder" />
        <InfoRow icon="pricetag" label="Service" value={rdv.service} />
        <View className="h-px bg-surfaceBorder" />
        <InfoRow icon="location-sharp" label="Adresse" value={`${rdv.address}, ${rdv.city}`} />
      </SurfaceCard>
<SurfaceCard className="p-4 mb-4">

  <Text className="text-white font-semibold mb-4">

    Suivi du rendez-vous

  </Text>

  <StepItem label="Réservation confirmée" status="done" />

  <StepItem label="En attente du client" status="done" />

  <StepItem label="Ton tour approche" status="active" />

  <StepItem label="Service terminé" status="pending" />

</SurfaceCard>
      <View className="flex-row gap-3 mb-4">
        <SurfaceButton label="Itinéraire" variant="outline" className="flex-1" icon={<Ionicons name="navigate-outline" size={16} color={colors.white} />} />
        <SurfaceButton label="Annuler" variant="danger" className="flex-1" onPress={onCancel} />
      </View>

      <Pressable className="flex-row items-center justify-center gap-2 py-2">
        <Ionicons name="help-circle-outline" size={16} color={colors.gray} />
        <Text className="text-gray text-sm">Besoin d'aide avec ce rendez-vous ?</Text>
      </Pressable>
    </View>
  );
}

export default function RDVScreen() {
  const [tab, setTab] = useState<Tab>('upcoming');
  const [nextAppointment, setNextAppointment] = useState(NEXT_APPOINTMENT);

  const handleCancel = () => {
    Alert.alert('Annuler le rendez-vous', 'Veux-tu vraiment annuler ce rendez-vous ?', [
      { text: 'Garder', style: 'cancel' },
      { text: 'Annuler', style: 'destructive', onPress: () => setNextAppointment(null) },
    ]);
  };

  return (
    <AppBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <Text className="font-heading text-white text-[22px] px-5 pt-2 mb-4">Mes Rendez-vous</Text>

        <View className="flex-row px-5 gap-2.5 mb-5">
          <Pressable
            className={`flex-1 items-center py-3 rounded-2xl border ${tab === 'upcoming' ? 'bg-accent border-accent' : 'bg-surfaceBg border-surfaceBorder'}`}
            onPress={() => setTab('upcoming')}
          >
            <Text className={`font-semibold ${tab === 'upcoming' ? 'text-white' : 'text-gray'}`}>À venir</Text>
          </Pressable>
          <Pressable
            className={`flex-1 items-center py-3 rounded-2xl border ${tab === 'history' ? 'bg-accent border-accent' : 'bg-surfaceBg border-surfaceBorder'}`}
            onPress={() => setTab('history')}
          >
            <Text className={`font-semibold ${tab === 'history' ? 'text-white' : 'text-gray'}`}>Historique</Text>
          </Pressable>
        </View>

        <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
          {tab === 'upcoming' ? (
            nextAppointment ? (
              <UpcomingDetail rdv={nextAppointment} onCancel={handleCancel} />
            ) : (
              <View className="items-center mt-20">
                <Text className="text-gray text-[15px] text-center leading-[22px]">
                  Aucun RDV à venir{'\n'}Réserve maintenant khyee ✂️
                </Text>
              </View>
            )
          ) : HISTORY.length === 0 ? (
            <View className="items-center mt-20">
              <Text className="text-gray text-[15px] text-center leading-[22px]">Aucun rendez-vous passé</Text>
            </View>
          ) : (
            HISTORY.map((rdv) => <RdvCard key={rdv.id} rdv={rdv} />)
          )}
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}
