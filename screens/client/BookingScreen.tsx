import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppBackground from '../../components/AppBackground';
import SurfaceCard from '../../components/SurfaceCard';
import SurfaceButton from '../../components/SurfaceButton';
import { colors } from '../../theme/colors';
import type { ClientStackScreenProps } from '../../navigation/types';

const SERVICES = [
  { id: '1', name: 'Coupe', price: '150 DA', duration: '20 min' },
  { id: '2', name: 'Coupe + Barbe', price: '200 DA', duration: '35 min' },
  { id: '3', name: 'Barbe', price: '100 DA', duration: '15 min' },
  { id: '4', name: 'Dégradé', price: '220 DA', duration: '30 min' },
];

const SLOTS = [
  { id: 's1', time: '09:00', available: true },
  { id: 's2', time: '09:30', available: false },
  { id: 's3', time: '10:00', available: true },
  { id: 's4', time: '10:30', available: true },
  { id: 's5', time: '11:00', available: false },
  { id: 's6', time: '11:30', available: true },
  { id: 's7', time: '14:00', available: true },
  { id: 's8', time: '14:30', available: true },
  { id: 's9', time: '15:00', available: false },
  { id: 's10', time: '15:30', available: true },
];

const DATES = [
  { id: 'd1', label: "Aujourd'hui", day: '26' },
  { id: 'd2', label: 'Demain', day: '27' },
  { id: 'd3', label: 'Ven', day: '28' },
  { id: 'd4', label: 'Sam', day: '29' },
];

export default function BookingScreen({ route, navigation }: ClientStackScreenProps<'Booking'>) {
  const { barberName, barberPhoto } = route.params;
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const canConfirm = selectedService && selectedDate && selectedSlot;

  const handleConfirm = () => {
    const service = SERVICES.find((s) => s.id === selectedService);
    const slot = SLOTS.find((s) => s.id === selectedSlot);
    const date = DATES.find((d) => d.id === selectedDate);

    Alert.alert(
      'Réservation confirmée ✅',
      `${service?.name} avec ${barberName}\n${date?.label} à ${slot?.time}`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <AppBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="flex-row items-center gap-3 px-5 pt-2 pb-4">
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={colors.white} />
          </Pressable>
          <Text className="font-heading text-white text-lg">Réserver</Text>
        </View>

        <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
          <SurfaceCard className="flex-row items-center p-4 mb-5">
            <Image source={{ uri: barberPhoto }} className="w-12 h-12 rounded-[22px] mr-3" />
            <View>
              <Text className="text-white text-[15px] font-semibold">{barberName}</Text>
              <Text className="text-gray text-xs">Choisis ton service et créneau</Text>
            </View>
          </SurfaceCard>

          <Text className="font-heading text-white text-lg mb-3">Service</Text>
          <View className="flex-row flex-wrap gap-2.5 mb-5">
            {SERVICES.map((service) => {
              const active = selectedService === service.id;
              return (
                <Pressable key={service.id} onPress={() => setSelectedService(service.id)}>
                  <SurfaceCard className={`p-3.5 ${active ? 'border-accent' : ''}`}>
                    <Text className={`text-[13px] font-semibold mb-0.5 ${active ? 'text-accent' : 'text-white'}`}>{service.name}</Text>
                    <Text className="text-gray text-xs">{service.duration}</Text>
                    <Text className={`text-xs font-semibold mt-1 ${active ? 'text-accent' : 'text-gray'}`}>{service.price}</Text>
                  </SurfaceCard>
                </Pressable>
              );
            })}
          </View>

          <Text className="font-heading text-white text-lg mb-3">Jour</Text>
          <View className="flex-row gap-2.5 mb-5">
            {DATES.map((date) => {
              const active = selectedDate === date.id;
              return (
                <Pressable key={date.id} onPress={() => setSelectedDate(date.id)}>
                  <View className={`flex-1 items-center py-3 rounded-2xl border ${active ? 'bg-accent border-accent' : 'bg-surfaceBg border-surfaceBorder'}`}>
                    <Text className={`text-[11px] mb-0.5 ${active ? 'text-white/70' : 'text-gray'}`}>{date.label}</Text>
                    <Text className={`text-lg font-bold ${active ? 'text-white' : 'text-white'}`}>{date.day}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          <Text className="font-heading text-white text-lg mb-3">Créneau</Text>
          <View className="flex-row flex-wrap gap-2.5 mb-5">
            {SLOTS.map((slot) => {
              const active = selectedSlot === slot.id;
              const disabled = !slot.available;
              return (
                <Pressable
                  key={slot.id}
                  onPress={() => !disabled && setSelectedSlot(slot.id)}
                >
                  <View
                    className={`rounded-2xl border px-4 py-2.5 ${active ? 'bg-accent border-accent' : disabled ? 'bg-surfaceBg border-surfaceBorder opacity-40' : 'bg-surfaceBg border-surfaceBorder'}`}
                  >
                    <Text className={`text-[13px] font-semibold ${active ? 'text-white' : disabled ? 'text-gray' : 'text-white'}`}>{slot.time}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        <View className="px-5 pb-6">
          <SurfaceButton
            label="Confirmer la réservation"
            variant={canConfirm ? 'primary' : 'outline'}
            onPress={canConfirm ? handleConfirm : undefined}
          />
        </View>
      </SafeAreaView>
    </AppBackground>
  );
}
