import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

type HeaderProps = {
  city?: string;
  notifCount?: number;
  onNotifPress?: () => void;
};

export default function Header({ city, notifCount = 0, onNotifPress }: HeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
      <View className="flex-row items-center gap-2">
        <Image source={require('../assets/logo.png')} className="w-7 h-7" resizeMode="contain" />
        <Text className="font-heading text-white text-base">Khyee</Text>
      </View>

      {city ? (
        <View className="flex-row items-center gap-1">
          <Ionicons name="location-sharp" size={16} color={colors.accent} />
          <Text className="text-gray text-sm">{city}</Text>
        </View>
      ) : null}

      <Pressable
        onPress={onNotifPress}
        className="w-10 h-10 rounded-full bg-surface border border-surfaceBorder items-center justify-center"
        style={[styles.shadow, { borderCurve: 'continuous' }]}
      >
        <Ionicons name="notifications" size={22} color={colors.white} />
        {notifCount > 0 ? (
          <View className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-[9px] bg-accent items-center justify-center px-[3px]">
            <Text className="text-white text-[10px] font-bold">{notifCount}</Text>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
});
