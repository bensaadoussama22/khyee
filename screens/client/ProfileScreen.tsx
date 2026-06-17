import React, { useState } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppBackground from '../../components/AppBackground';
import SurfaceCard from '../../components/SurfaceCard';
import { colors } from '../../theme/colors';

type RowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  danger?: boolean;
  right?: React.ReactNode;
  onPress?: () => void;
};

function Row({ icon, label, danger, right, onPress }: RowProps) {
  return (
    <Pressable className="flex-row items-center px-4 py-3.5 gap-3.5" onPress={onPress}>
      <Ionicons name={icon} size={20} color={danger ? colors.danger : colors.white} />
      <Text className={`text-[15px] ${danger ? 'text-danger' : 'text-white'}`}>{label}</Text>
      <View className="flex-1" />
      {right ?? <Ionicons name="chevron-forward" size={18} color={colors.gray} />}
    </Pressable>
  );
}

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <AppBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
          <View className="items-center mt-3 mb-7">
            <View className="w-[84px] h-[84px] rounded-[42px] bg-primary items-center justify-center mb-3.5">
              <Text className="text-white text-3xl font-heading">A</Text>
            </View>
            <Text className="text-white text-lg font-bold mb-1">Amine Benali</Text>
            <Text className="text-gray text-[13px]">Client Khyee</Text>
          </View>

          <SurfaceCard className="mb-4 py-1">
            <Row icon="person-outline" label="Infos personnelles" />
            <View className="h-px bg-surfaceBorder mx-4" />
            <Row icon="heart-outline" label="Barbiers favoris" />
          </SurfaceCard>

          <SurfaceCard className="mb-4 py-1">
            <Row
              icon="notifications-outline"
              label="Notifications"
              right={<Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: colors.accent }} />}
            />
            <View className="h-px bg-surfaceBorder mx-4" />
            <Row
              icon="moon-outline"
              label="Mode sombre"
              right={<Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ true: colors.accent }} />}
            />
          </SurfaceCard>

          <SurfaceCard className="mb-4 py-1">
            <Row icon="help-circle-outline" label="Support" />
          </SurfaceCard>

          <SurfaceCard className="mb-4 py-1">
            <Row icon="log-out-outline" label="Déconnexion" danger right={<View />} />
          </SurfaceCard>
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}
