import React from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBackground from '../../components/AppBackground';
import SurfaceCard from '../../components/SurfaceCard';
import { colors } from '../../theme/colors';

type Message = {
  id: string;
  clientName: string;
  clientPhoto: string;
  lastMessage: string;
  time: string;
  unread: number;
};

const MESSAGES: Message[] = [
  { id: '1', clientName: 'Amine Benali', clientPhoto: 'https://i.pravatar.cc/300?img=11', lastMessage: 'Merci pour la coupe ! Top comme toujours', time: '09:45', unread: 0 },
  { id: '2', clientName: 'Yacine Mokrani', clientPhoto: 'https://i.pravatar.cc/300?img=14', lastMessage: "Je peux passer à 10h30 au lieu de 10h15 ?", time: '10:02', unread: 2 },
  { id: '3', clientName: 'Karim Boudiaf', clientPhoto: 'https://i.pravatar.cc/300?img=53', lastMessage: 'Vous faites les dégradés?', time: 'Hier', unread: 1 },
  { id: '4', clientName: 'Sofiane Haddad', clientPhoto: 'https://i.pravatar.cc/300?img=17', lastMessage: 'Bon anniversaire Nadir ! 🎉', time: 'Lun', unread: 0 },
  { id: '5', clientName: 'Omar Khelifi', clientPhoto: 'https://i.pravatar.cc/300?img=22', lastMessage: 'Disponible demain matin?', time: 'Dim', unread: 0 },
];

export default function MessagesCoiffeurScreen() {
  return (
    <AppBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="px-5 pt-2 pb-4">
          <Text className="font-heading text-white text-[22px]">Messages</Text>
        </View>

        <FlatList
          data={MESSAGES}
          keyExtractor={(item) => item.id}
          contentContainerClassName="px-5 pb-10"
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="items-center mt-20">
              <Text className="text-gray text-[15px]">Aucun message</Text>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable>
              <SurfaceCard className="flex-row items-center p-4 mb-3">
                <View className="relative mr-3">
                  <Image source={{ uri: item.clientPhoto }} className="w-12 h-12 rounded-[22px]" />
                  {item.unread > 0 && (
                    <View className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-[9px] bg-accent items-center justify-center px-[3px]">
                      <Text className="text-white text-[10px] font-bold">{item.unread}</Text>
                    </View>
                  )}
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className={`text-[15px] font-semibold ${item.unread > 0 ? 'text-white' : 'text-gray'}`}>{item.clientName}</Text>
                    <Text className="text-gray text-xs">{item.time}</Text>
                  </View>
                  <Text className={`text-sm ${item.unread > 0 ? 'text-white' : 'text-gray'}`} numberOfLines={1}>{item.lastMessage}</Text>
                </View>
              </SurfaceCard>
            </Pressable>
          )}
        />
      </SafeAreaView>
    </AppBackground>
  );
}
