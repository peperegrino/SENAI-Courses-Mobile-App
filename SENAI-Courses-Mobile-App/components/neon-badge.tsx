import { StyleSheet, Text, View, ViewProps } from 'react-native';
import { Colors } from '@/constants/theme';

interface NeonBadgeProps extends ViewProps {
  label: string;
  icon?: string;
  color?: 'cyan' | 'pink' | 'purple' | 'green';
  size?: 'small' | 'medium' | 'large';
}

export function NeonBadge({
  label,
  icon = '⭐',
  color = 'cyan',
  size = 'medium',
  style,
  ...props
}: NeonBadgeProps) {
  const colorScheme = 'dark';
  const C = Colors[colorScheme];

  const colorMap = {
    cyan: C.tint,
    pink: C.tintSecondary,
    purple: C.tintTertiary,
    green: C.success,
  };

  const sizeMap = {
    small: { padding: 6, fontSize: 12, iconSize: 14 },
    medium: { padding: 8, fontSize: 13, iconSize: 16 },
    large: { padding: 10, fontSize: 14, iconSize: 18 },
  };

  const currentSize = sizeMap[size];

  return (
    <View
      style={[
        {
          backgroundColor: `${colorMap[color]}20`,
          borderWidth: 1.5,
          borderColor: colorMap[color],
          borderRadius: 12,
          paddingHorizontal: currentSize.padding + 4,
          paddingVertical: currentSize.padding,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        },
        style,
      ]}
      {...props}>
      <Text style={{ fontSize: currentSize.iconSize }}>{icon}</Text>
      <Text
        style={{
          color: colorMap[color],
          fontSize: currentSize.fontSize,
          fontWeight: '600',
        }}>
        {label}
      </Text>
    </View>
  );
}
