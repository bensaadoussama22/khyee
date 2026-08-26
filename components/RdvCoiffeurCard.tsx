import React from 'react';
import { Image, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SurfaceCard from './SurfaceCard';
import SurfaceButton from './SurfaceButton';
import { colors } from '../theme/colors';

export type RdvCoiffeur = {
  id: string;
  clientName: string;
  clientPhoto: string;
  service: string;
  date: string;
  hour: string;
  ticketNumber: number;
  status: 'waiting' | 'active' | 'done' | 'cancelled';
};

type RdvCoiffeurCardProps = {
  rdv: RdvCoiffeur;
  onAccept?: () => void;
  onRefuse?: () => void;
  onComplete?: () => void;
};

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  waiting: { label: 'En attente', bg: 'bg-[rgba(255,193,7,0.2)]', text: 'text-yellow-400' },
  active: { label: 'En cours', bg: 'bg-[rgba(91,78,232,0.25)]', text: 'text-accent' },
  done: { label: 'Terminé', bg: 'bg-[rgba(160,160,176,0.2)]', text: 'text-gray' },
  cancelled: { label: 'Annulé', bg: 'bg-[rgba(232,69,60,0.2)]', text: 'text-danger' },
};

export default function RdvCoiffeurCard({ rdv, onAccept, onRefuse, onComplete }: RdvCoiffeurCardProps) {
  const status = STATUS_CONFIG[rdv.status];

  return (
    <SurfaceCard className="p-[18px] mb-3.5">
      <View className="flex-row items-center mb-3.5">
        <Image source={{ uri: rdv.clientPhoto }} className="w-11 h-11 rounded-[22px] mr-3" />
        <View className="flex-1">
          <Text className="text-white text-[15px] font-semibold mb-0.5">{rdv.clientName}</Text>
          <Text className="text-gray text-xs">{rdv.service}</Text>
        </View>
        <View className="items-end">
          <View className={`rounded-xl px-2.5 py-[5px] ${status.bg}`}>
            <Text className={`text-xs font-semibold ${status.text}`}>{status.label}</Text>
          </View>
          <View className="flex-row items-center gap-1 mt-1.5">
            <Ionicons name="time-outline" size={12} color={colors.gray} />
            <Text className="text-gray text-xs">{rdv.hour}</Text>
          </View>
        </View>
      </View>

      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="calendar-outline" size={14} color={colors.gray} />
          <Text className="text-gray text-[13px]">{rdv.date}</Text>
        </View>
        <View className="rounded-xl bg-[rgba(91,78,232,0.18)] px-2.5 py-[5px]">
          <Text className="text-accent font-heading text-[16px]">#{rdv.ticketNumber}</Text>
        </View>
      </View>

      {rdv.status === 'waiting' && (
        <View className="flex-row gap-3">
          <SurfaceButton label="Refuser" variant="danger" className="flex-1" paddingClassName="py-3" onPress={onRefuse} />
          <SurfaceButton label="Accepter" variant="primary" className="flex-1" paddingClassName="py-3" onPress={onAccept} />
        </View>
      )}

      {rdv.status === 'active' && (
        <SurfaceButton label="Terminer le service" variant="primary" onPress={onComplete} />
      )}
    </SurfaceCard>
  );
}
