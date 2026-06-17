import React from 'react';
import { StyleSheet, View } from 'react-native';

type SurfaceCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SurfaceCard({ children, className }: SurfaceCardProps) {
  return (
    <View
      className={`rounded-[22px] bg-surface border border-surfaceBorder ${className ?? ''}`}
      style={[styles.shadow, { borderCurve: 'continuous' }]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 6,
  },
});
