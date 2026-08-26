import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
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

const REVIEWS = [
  { id: '1', name: 'Amine B.', rating: 5, text: 'Top comme toujours, je recommande !', date: 'Il y a 2 jours' },
  { id: '2', name: 'Yacine M.', rating: 5, text: 'Très pro, resulta always clean', date: 'Il y a 1 semaine' },
  { id: '3', name: 'Sofiane H.', rating: 4, text: 'Bon boulot, ambiance sympa', date: 'Il y a 2 semaines' },
];

export default function BarberProfileScreen({ route, navigation }: ClientStackScreenProps<'BarberProfile'>) {
  const { barberName, barberPhoto, barberRating, barberCity, barberDistance, barberPrice, barberAvailable } = route.params;

  return (
    <AppBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView contentContainerClassName="pb-10" showsVerticalScrollIndicator={false}>
          <View className="relative">
            <Image source={{ uri: barberPhoto }} className="w-full h-64" />
            <Pressable
              onPress={() => navigation.goBack()}
              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-surface border border-surfaceBorder items-center justify-center"
            >
              <Ionicons name="arrow-back" size={20} color={colors.white} />
            </Pressable>
          </View>

          <View className="px-5 -mt-8">
            <SurfaceCard className="p-5 mb-4">
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-white text-xl font-bold mb-1">{barberName}</Text>
                  <View className="flex-row items-center gap-1 mb-2">
                    <Ionicons name="location-sharp" size={14} color={colors.gray} />
                    <Text className="text-gray text-sm">{barberCity} · {barberDistance}</Text>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="star" size={16} color={colors.accent} />
                    <Text className="text-white text-sm font-semibold">{barberRating.toFixed(1)}</Text>
                    <Text className="text-gray text-sm">· {REVIEWS.length} avis</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-1.5">
                  <View className={`w-2.5 h-2.5 rounded-full ${barberAvailable ? 'bg-green-500' : 'bg-gray'}`} />
                  <Text className={`text-xs font-semibold ${barberAvailable ? 'text-green-500' : 'text-gray'}`}>
                    {barberAvailable ? 'En ligne' : 'Hors ligne'}
                  </Text>
                </View>
              </View>
            </SurfaceCard>

            <Text className="font-heading text-white text-lg mb-3">Services</Text>
            {SERVICES.map((service) => (
              <SurfaceCard key={service.id} className="flex-row items-center p-4 mb-3">
                <View className="w-10 h-10 rounded-xl bg-[rgba(91,78,232,0.18)] items-center justify-center mr-3">
                  <Ionicons name="cut" size={18} color={colors.accent} />
                </View>
                <View className="flex-1">
                  <Text className="text-white text-[15px] font-semibold mb-0.5">{service.name}</Text>
                  <Text className="text-gray text-xs">{service.duration}</Text>
                </View>
                <Text className="text-accent text-[15px] font-semibold">{service.price}</Text>
              </SurfaceCard>
            ))}

            <Text className="font-heading text-white text-lg mt-5 mb-3">Avis clients</Text>
            {REVIEWS.map((review) => (
              <SurfaceCard key={review.id} className="p-4 mb-3">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-white text-sm font-semibold">{review.name}</Text>
                  <Text className="text-gray text-xs">{review.date}</Text>
                </View>
                <View className="flex-row gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Ionicons key={i} name={i < review.rating ? 'star' : 'star-outline'} size={13} color={colors.accent} />
                  ))}
                </View>
                <Text className="text-gray text-sm">{review.text}</Text>
              </SurfaceCard>
            ))}
          </View>
        </ScrollView>

        <View className="px-5 pb-6">
          <SurfaceButton
            label={barberAvailable ? 'Réserver maintenant' : 'Indisponible'}
            variant={barberAvailable ? 'primary' : 'outline'}
            disabled={!barberAvailable}
            onPress={() => {
              if (barberAvailable) {
                navigation.navigate('Booking', { barberName, barberPhoto, service: '' });
              }
            }}
          />
        </View>
      </SafeAreaView>
    </AppBackground>
  );
}
