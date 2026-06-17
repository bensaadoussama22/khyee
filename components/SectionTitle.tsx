import React from 'react';
import { Text } from 'react-native';

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionTitle({ children, className }: SectionTitleProps) {
  return <Text className={`font-heading text-white text-xl mb-3.5 ${className ?? ''}`}>{children}</Text>;
}
