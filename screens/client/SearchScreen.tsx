import React, { useMemo, useState } from 'react';
import { FlatList, Image, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppBackground from '../../components/AppBackground';
import SurfaceCard from '../../components/SurfaceCard';
import { colors } from '../../theme/colors';
import type { ClientTabScreenProps } from '../../navigation/types';

type FilterKey = 'all' | 'nearby' | 'topRated' | 'available';

type SearchBarber = {
  id: string;
  name: string;
  city: string;
  rating: number;
  distance: string;
  price: string;
  available: boolean;
  photo: string;
};

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'nearby', label: 'Près de moi' },
  { key: 'topRated', label: 'Bien noté' },
  { key: 'available', label: 'Disponible' },
];

const BARBERS: SearchBarber[] = [
  { id: '1', name: 'Salon Nadir', city: 'Tlemcen', rating: 4.9, distance: '0.8 km', price: '200 DA', available: true, photo: 'https://i.pravatar.cc/300?img=12' },
  { id: '2', name: 'Yacine Cuts', city: 'Tlemcen', rating: 4.6, distance: '1.2 km', price: '220 DA', available: false, photo: 'https://i.pravatar.cc/300?img=33' },
  { id: '3', name: 'Barber Karim', city: 'Tlemcen', rating: 4.8, distance: '1.5 km', price: '250 DA', available: true, photo: 'https://i.pravatar.cc/300?img=51' },
  { id: '4', name: 'Style Houari', city: 'Tlemcen', rating: 4.3, distance: '2.4 km', price: '180 DA', available: true, photo: 'https://i.pravatar.cc/300?img=68' },
];

export default function SearchScreen({ navigation }: ClientTabScreenProps<'Search'>) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterKey>('all');

  const filtered = useMemo(() => {
    let list = BARBERS.filter((b) => b.name.toLowerCase().includes(query.toLowerCase()));
    if (filter === 'nearby') list = [...list].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    if (filter === 'topRated') list = list.filter((b) => b.rating >= 4.7);
    if (filter === 'available') list = list.filter((b) => b.available);
    return list;
  }, [query, filter]);

  return (
    <AppBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="px-5 pt-2 pb-4">
          <Text className="font-heading text-white text-[22px]">Recherche</Text>
        </View>

        <View className="px-5 mb-4">
          <SurfaceCard className="flex-row items-center px-4 py-3 gap-2.5">
            <Ionicons name="search" size={18} color={colors.gray} />
            <TextInput
              placeholder="Cherche un barbier khyee..."
              placeholderTextColor={colors.gray}
              value={query}
              onChangeText={setQuery}
              className="flex-1 text-white text-[15px]"
            />
          </SurfaceCard>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={FILTERS}
          keyExtractor={(item) => item.key}
          contentContainerClassName="px-5 gap-2.5"
          className="grow-0 mb-4"
          renderItem={({ item }) => {
            const active = filter === item.key;
            return (
              <Pressable onPress={() => setFilter(item.key)}>
                <View
                  className={`rounded-2xl border px-4 py-2 ${active ? 'bg-accent border-accent' : 'bg-surfaceBg border-surfaceBorder'}`}
                >
                  <Text className={`text-[13px] font-semibold ${active ? 'text-white' : 'text-gray'}`}>{item.label}</Text>
                </View>
              </Pressable>
            );
          }}
        />

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerClassName="px-5 pb-10"
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="items-center mt-16">
              <Text className="text-gray text-[15px]">Aucun barbier trouvé</Text>
            </View>
          }
          renderItem={({ item }) => (
            <SurfaceCard className="flex-row items-center p-3.5 mb-3 gap-3">
              <Image source={{ uri: item.photo }} className="w-12 h-12 rounded-3xl" />
              <View className="flex-1">
                <Text className="text-white text-[15px] font-semibold mb-0.5">{item.name}</Text>
                <Text className="text-gray text-xs mb-1">{item.city}</Text>
                <View className="flex-row items-center">
                  <Ionicons name="star" size={13} color={colors.accent} />
                  <Text className="text-gray text-xs ml-1">{item.rating.toFixed(1)}</Text>
                  <Ionicons name="location-sharp" size={13} color={colors.gray} className="ml-2" />
                  <Text className="text-gray text-xs ml-1">{item.distance}</Text>
                  <Text className="text-accent text-xs ml-2">{item.price}</Text>
                </View>
              </View>
              <Pressable
                className="rounded-[14px] border border-surfaceBorder bg-[rgba(91,78,232,0.25)] px-3 py-2"
                onPress={() => navigation.navigate('BarberProfile', {
                  barberId: item.id,
                  barberName: item.name,
                  barberPhoto: item.photo,
                  barberRating: item.rating,
                  barberCity: item.city,
                  barberDistance: item.distance,
                  barberPrice: item.price,
                  barberAvailable: item.available,
                })}
              >
                <Text className="text-white text-xs font-semibold">Voir profil</Text>
              </Pressable>
            </SurfaceCard>
          )}
        />
      </SafeAreaView>
    </AppBackground>
  );
}
