import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import SurfaceCard from './SurfaceCard';
import SurfaceButton from './SurfaceButton';
import { colors } from '../theme/colors';

export type Barber = {
  id: string;
  name: string;
  city: string;
  rating: number;
  distance: string;
  price?: string;
  rank?: number;
  photo?: string;
};

type BarberCardProps = {
  barber: Barber;
  variant?: 'horizontal' | 'vertical';
  onPress?: () => void;
  onBookPress?: () => void;
};

function Avatar({ barber, className }: { barber: Barber; className: string }) {
  const initial = barber.name.charAt(0).toUpperCase();

  if (barber.photo) {
    return <Image source={{ uri: barber.photo }} className={className} />;
  }

  return (
    <LinearGradient colors={[colors.accent, colors.primary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className={className}>
      <Text className="text-white text-[22px] font-heading">{initial}</Text>
    </LinearGradient>
  );
}

export default function BarberCard({ barber, variant = 'horizontal', onPress, onBookPress }: BarberCardProps) {
  if (variant === 'vertical') {
    return (
      <Pressable onPress={onPress}>
        <SurfaceCard className="p-[18px] mb-3.5 items-center">
          {barber.rank ? (
            <View className="absolute top-3 left-3 bg-accent rounded-[10px] px-2 py-[3px]">
              <Text className="text-white text-[11px] font-bold">#{barber.rank}</Text>
            </View>
          ) : null}
          <Avatar barber={barber} className="w-[72px] h-[72px] rounded-[36px] items-center justify-center mb-2.5" />
          <Text className="text-white text-base font-semibold mb-1.5 text-center">{barber.name}</Text>
          <View className="flex-row items-center gap-1 mb-1">
            <Ionicons name="star" size={14} color={colors.accent} />
            <Text className="text-gray text-xs">{barber.rating.toFixed(1)}</Text>
            <Ionicons name="location-sharp" size={14} color={colors.gray} className="ml-2.5" />
            <Text className="text-gray text-xs">{barber.distance}</Text>
          </View>
          {barber.price ? <Text className="text-accent text-[13px] font-semibold mt-1.5">À partir de {barber.price}</Text> : null}
        </SurfaceCard>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress}>
      <SurfaceCard className="w-40 p-4 items-center">
        <Avatar barber={barber} className="w-14 h-14 rounded-[28px] items-center justify-center mb-2.5" />
        <Text className="text-white text-sm font-semibold mb-1.5 text-center">{barber.name}</Text>
        <View className="flex-row items-center gap-1 mb-1">
          <Ionicons name="star" size={13} color={colors.accent} />
          <Text className="text-gray text-xs">{barber.rating.toFixed(1)}</Text>
        </View>
        <View className="flex-row items-center gap-1 mb-1">
          <Ionicons name="location-sharp" size={13} color={colors.gray} />
          <Text className="text-gray text-xs">{barber.distance}</Text>
        </View>
        <SurfaceButton
          label="Réserver"
          variant="primary"
          className="mt-2.5"
          paddingClassName="py-2 px-[18px]"
          onPress={onBookPress}
        />
      </SurfaceCard>
    </Pressable>
  );
}
