import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SurfaceCard from './SurfaceCard';
import SurfaceButton from './SurfaceButton';
import { colors } from '../theme/colors';

export type Rdv = {
  id: string;
  barberName: string;
  date: string;
  ticketNumber: number;
  status: 'confirmed' | 'done';
};

type RdvCardProps = {
  rdv: Rdv;
  onCancel?: () => void;
  onRenew?: () => void;
};

export default function RdvCard({ rdv, onCancel, onRenew }: RdvCardProps) {
  const isConfirmed = rdv.status === 'confirmed';

  return (
    <SurfaceCard className="p-[18px] mb-3.5">
      <View className="flex-row items-start mb-3.5">
        <View className="flex-1">
          <Text className="text-white text-base font-semibold mb-1.5">{rdv.barberName}</Text>
          <View className="flex-row items-center gap-1.5">
            <Ionicons name="calendar" size={14} color={colors.gray} />
            <Text className="text-gray text-[13px]">{rdv.date}</Text>
          </View>
        </View>
        <View className="items-center">
          <Ionicons name="pricetag" size={14} color={colors.accent} />
          <Text className="text-accent font-heading text-[22px]">#{rdv.ticketNumber}</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <View className={`rounded-xl px-2.5 py-[5px] ${isConfirmed ? 'bg-[rgba(91,78,232,0.25)]' : 'bg-[rgba(160,160,176,0.2)]'}`}>
          <Text className={`text-xs font-semibold ${isConfirmed ? 'text-accent' : 'text-gray'}`}>
            {isConfirmed ? 'Confirmé ✅' : 'Terminé'}
          </Text>
        </View>
        {isConfirmed ? (
          <SurfaceButton label="Annuler" variant="danger" onPress={onCancel} paddingClassName="py-2 px-4" />
        ) : (
          <SurfaceButton label="Renouveler" variant="outline" onPress={onRenew} paddingClassName="py-2 px-4" />
        )}
      </View>
    </SurfaceCard>
  );
}
