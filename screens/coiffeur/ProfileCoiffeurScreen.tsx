import React, { useState } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppBackground from '../../components/AppBackground';
import SurfaceCard from '../../components/SurfaceCard';
import SurfaceButton from '../../components/SurfaceButton';
import { colors } from '../../theme/colors';
import type { CoiffeurTabScreenProps } from '../../navigation/types';

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

export default function ProfileCoiffeurScreen({ navigation }: CoiffeurTabScreenProps<'Profil'>) {
  const [notifications, setNotifications] = useState(true);
  const [autoAccept, setAutoAccept] = useState(false);

  return (
    <AppBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
          <View className="items-center mt-3 mb-7">
            <View className="w-[84px] h-[84px] rounded-[42px] bg-primary items-center justify-center mb-3.5">
              <Text className="text-white text-3xl font-heading">N</Text>
            </View>
            <Text className="text-white text-lg font-bold mb-1">Nadir Benslimane</Text>
            <Text className="text-gray text-[13px] mb-2">Salon Nadir · Tlemcen</Text>
            <View className="flex-row items-center gap-1">
              <Ionicons name="star" size={14} color={colors.accent} />
              <Text className="text-gray text-xs">4.9 · 128 avis</Text>
            </View>
          </View>

          <SurfaceCard className="mb-4 py-1">
            <Row icon="person-outline" label="Modifier le profil" />
            <View className="h-px bg-surfaceBorder mx-4" />
            <Row icon="cut-outline" label="Gérer les services" />
            <View className="h-px bg-surfaceBorder mx-4" />
            <Row icon="time-outline" label="Horaires d'ouverture" />
          </SurfaceCard>

          <SurfaceCard className="mb-4 py-1">
            <Row
              icon="notifications-outline"
              label="Notifications"
              right={<Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: colors.accent }} />}
            />
            <View className="h-px bg-surfaceBorder mx-4" />
            <Row
              icon="checkmark-circle-outline"
              label="Acceptation auto"
              right={<Switch value={autoAccept} onValueChange={setAutoAccept} trackColor={{ true: colors.accent }} />}
            />
          </SurfaceCard>

          <SurfaceCard className="mb-4 py-1">
            <Row icon="help-circle-outline" label="Support" />
            <View className="h-px bg-surfaceBorder mx-4" />
            <Row icon="document-text-outline" label="Conditions d'utilisation" />
          </SurfaceCard>

          <SurfaceButton
            label="Se déconnecter"
            variant="danger"
            className="mt-4"
            onPress={() => navigation.getParent()?.navigate('Login')}
          />
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}
