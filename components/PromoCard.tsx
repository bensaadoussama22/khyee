import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export type Promo = {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  cta: string;
  icon: keyof typeof Ionicons.glyphMap;
  gradient: [string, string, string];
};

type PromoCardProps = {
  promo: Promo;
  onPress?: () => void;
};

export default function PromoCard({ promo, onPress }: PromoCardProps) {
  return (
    <Pressable onPress={onPress} style={[styles.shadow, { borderCurve: 'continuous' }]}>
      <LinearGradient
        colors={promo.gradient}
        className="w-[260px] h-[150px] rounded-3xl p-[18px] justify-between overflow-hidden"
        style={{ borderCurve: 'continuous' }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="absolute w-[140px] h-[140px] rounded-[70px] bg-[rgba(255,255,255,0.08)] -top-[50px] -right-10" />
        <View className="absolute w-[70px] h-[70px] rounded-[35px] bg-[rgba(255,255,255,0.07)] -bottom-5 right-10" />

        <View className="self-start bg-[rgba(255,255,255,0.22)] rounded-[10px] px-2.5 py-1">
          <Text className="text-white text-[10px] font-bold tracking-wide">{promo.badge}</Text>
        </View>

        <View className="mt-1.5">
          <Text className="font-heading text-white text-[17px] mb-1">{promo.title}</Text>
          <Text className="text-[rgba(255,255,255,0.8)] text-[12.5px]">{promo.subtitle}</Text>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-1.5">
            <Text className="text-white text-[13px] font-bold">{promo.cta}</Text>
            <Ionicons name="arrow-forward" size={14} color={colors.white} />
          </View>
          <View className="w-[38px] h-[38px] rounded-[19px] bg-[rgba(255,255,255,0.18)] items-center justify-center">
            <Ionicons name={promo.icon} size={22} color={colors.white} />
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
});
