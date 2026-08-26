import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';

type Variant = 'primary' | 'danger' | 'outline';

type SurfaceButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  className?: string;
  paddingClassName?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

const VARIANT_BG: Record<Variant, string> = {
  primary: colors.accent,
  danger: colors.danger,
  outline: colors.surface,
};

const VARIANT_BORDER: Record<Variant, string> = {
  primary: 'transparent',
  danger: 'transparent',
  outline: colors.surfaceBorder,
};

const VARIANT_TEXT: Record<Variant, string> = {
  primary: colors.white,
  danger: colors.white,
  outline: colors.white,
};

export default function SurfaceButton({
  label,
  onPress,
  variant = 'primary',
  className,
  paddingClassName = 'py-4 px-6',
  icon,
  disabled,
}: SurfaceButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`rounded-2xl items-center justify-center ${paddingClassName} ${className ?? ''}`}
      style={({ pressed }) => [
        {
          backgroundColor: VARIANT_BG[variant],
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: VARIANT_BORDER[variant],
          borderCurve: 'continuous' as const,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
        styles.shadow,
      ]}
    >
      <Text className="text-base font-semibold" style={{ color: VARIANT_TEXT[variant] }}>
        {icon}
        {icon ? ' ' : ''}
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
});
