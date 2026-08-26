import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBackground from '../../components/AppBackground';
import Header from '../../components/Header';
import SectionTitle from '../../components/SectionTitle';
import PromoCard, { Promo } from '../../components/PromoCard';
import BarberCard, { Barber } from '../../components/BarberCard';
import RdvCard, { Rdv } from '../../components/RdvCard';
import SurfaceCard from '../../components/SurfaceCard';
import type { ClientTabScreenProps } from '../../navigation/types';

const NEXT_RDV: Rdv | null = {
  id: '1',
  barberName: 'Salon Nadir',
  date: '18 Juin, 14h30',
  ticketNumber: 7,
  status: 'confirmed',
};

const TOP_BARBERS: Barber[] = [
  { id: '4', name: 'Salon Nadir', city: 'Tlemcen', rating: 4.9, distance: '0.8 km', price: '200 DA', rank: 1, photo: 'https://i.pravatar.cc/300?img=12' },
  { id: '5', name: 'Barber Karim', city: 'Tlemcen', rating: 4.8, distance: '1.5 km', price: '250 DA', rank: 2, photo: 'https://i.pravatar.cc/300?img=51' },
  { id: '6', name: 'Yacine Cuts', city: 'Tlemcen', rating: 4.7, distance: '1.2 km', price: '220 DA', rank: 3, photo: 'https://i.pravatar.cc/300?img=33' },
];

const PROMOS: Promo[] = [
  {
    id: 'p1',
    badge: 'PROMO',
    title: '-20% chez Salon Nadir',
    subtitle: 'Offre valable cette semaine',
    cta: 'Réserver maintenant',
    icon: 'cut',
    gradient: ['#3B2BC2', '#5B4EE8', '#1A1340'],
  },
  {
    id: 'p2',
    badge: 'NOUVEAU',
    title: 'Nouveau barbier à Tlemcen',
    subtitle: 'Découvre Yacine Cuts',
    cta: 'Voir le profil',
    icon: 'sparkles',
    gradient: ['#1A1340', '#3B2BC2', '#0A0A0F'],
  },
];

export default function HomeScreen({ navigation }: ClientTabScreenProps<'Home'>) {
  const [nextRdv, setNextRdv] = useState(NEXT_RDV);

  const handleCancel = () => {
    Alert.alert('Annuler le rendez-vous', 'Veux-tu vraiment annuler ce rendez-vous ?', [
      { text: 'Garder', style: 'cancel' },
      { text: 'Annuler', style: 'destructive', onPress: () => setNextRdv(null) },
    ]);
  };

  return (
    <AppBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <Header city="Tlemcen" notifCount={2} />

        <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
          <Text className="font-heading text-white text-2xl mb-1">Sba7 el kheir, Khyee 👋</Text>
          <Text className="text-gray text-sm mb-5">Trouve ton barbier idéal</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="pr-1.5"
            className="mb-7"
          >
            {PROMOS.map((promo) => (
              <View key={promo.id} className="mr-3.5">
                <PromoCard promo={promo} />
              </View>
            ))}
          </ScrollView>

          <SectionTitle>Prochain rendez-vous 📅</SectionTitle>
          {nextRdv ? (
            <View className="mb-3.5">
              <RdvCard rdv={nextRdv} onCancel={handleCancel} />
            </View>
          ) : (
            <SurfaceCard className="items-center py-8 mb-7">
              <Text className="text-gray text-sm text-center">Aucun RDV à venir{'\n'}Réserve maintenant khyee ✂️</Text>
            </SurfaceCard>
          )}

          <SectionTitle>Top Khyee 🔥</SectionTitle>
          {TOP_BARBERS.map((barber) => (
            <BarberCard
              key={barber.id}
              barber={barber}
              variant="vertical"
              onPress={() => navigation.navigate('BarberProfile', {
                barberId: barber.id,
                barberName: barber.name,
                barberPhoto: barber.photo ?? '',
                barberRating: barber.rating,
                barberCity: barber.city,
                barberDistance: barber.distance,
                barberPrice: barber.price ?? '',
                barberAvailable: true,
              })}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}
