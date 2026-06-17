import React from 'react';
import { View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type AppBackgroundProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string;
};

export default function AppBackground({ children, style, className }: AppBackgroundProps) {
  return (
    <View className={`flex-1 bg-background ${className ?? ''}`} style={style}>
      <LinearGradient
        colors={['#0A0A0F', '#0D0D14', '#0A0A0F']}
        locations={[0, 0.5, 1]}
        className="absolute inset-0"
      />
      {children}
    </View>
  );
}
