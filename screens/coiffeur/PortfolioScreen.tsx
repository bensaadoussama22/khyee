import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppBackground from '../../components/AppBackground';
import SurfaceCard from '../../components/SurfaceCard';
import { colors } from '../../theme/colors';

type PortfolioItem = {
  id: string;
  uri: string;
  caption: string;
};

const PHOTOS: PortfolioItem[] = [
  { id: '1', uri: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400', caption: 'Dégradé-classique' },
  { id: '2', uri: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400', caption: 'Coupe moderne' },
  { id: '3', uri: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400', caption: 'Barbe styling' },
  { id: '4', uri: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400', caption: 'Fade côtés' },
  { id: '5', uri: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400', caption: 'Texture naturelle' },
  { id: '6', uri: 'https://images.unsplash.com/photo-1593702288056-7927b442d1fa?w=400', caption: 'Line-up précis' },
  { id: '7', uri: 'https://images.unsplash.com/photo-1634302086887-13b5281d0a76?w=400', caption: 'Coupe afro' },
  { id: '8', uri: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=400', caption: 'Pompadour' },
  { id: '9', uri: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400', caption: 'Crew cut' },
];

const CATEGORIES = ['Tous', 'Dégradé', 'Classique', 'Moderne', 'Barbe'];

export default function PortfolioScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  return (
    <AppBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
          <Text className="font-heading text-white text-[22px]">Portfolio</Text>
          <Pressable className="w-10 h-10 rounded-full bg-accent items-center justify-center">
            <Ionicons name="add" size={24} color={colors.white} />
          </Pressable>
        </View>

        <SurfaceCard className="mx-5 p-4 mb-4">
          <View className="flex-row items-center gap-3">
            <View className="w-[72px] h-[72px] rounded-[36px] bg-primary items-center justify-center">
              <Text className="text-white text-3xl font-heading">S</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white text-lg font-bold mb-0.5">Salon Nadir</Text>
              <Text className="text-gray text-sm mb-1">Tlemcen</Text>
              <View className="flex-row items-center gap-1">
                <Ionicons name="star" size={14} color={colors.accent} />
                <Text className="text-gray text-xs">4.9</Text>
                <Text className="text-gray text-xs mx-1">·</Text>
                <Text className="text-gray text-xs">{PHOTOS.length} photos</Text>
              </View>
            </View>
          </View>
        </SurfaceCard>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 gap-2.5" className="grow-0 mb-4">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <Pressable key={cat} onPress={() => setSelectedCategory(cat)}>
                <View className={`rounded-2xl border px-4 py-2 ${active ? 'bg-accent border-accent' : 'bg-surfaceBg border-surfaceBorder'}`}>
                  <Text className={`text-[13px] font-semibold ${active ? 'text-white' : 'text-gray'}`}>{cat}</Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>

        <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap gap-2.5">
            {PHOTOS.map((photo) => (
              <Pressable key={photo.id} className="w-[48%]">
                <SurfaceCard className="p-0 overflow-hidden">
                  <Image source={{ uri: photo.uri }} className="w-full h-[140px]" />
                  <View className="p-3">
                    <Text className="text-white text-sm font-semibold">{photo.caption}</Text>
                  </View>
                </SurfaceCard>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}
