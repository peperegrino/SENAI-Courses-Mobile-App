import { StyleSheet, View, ViewProps } from 'react-native';
import { Colors } from '@/constants/theme';

interface GlassyCardProps extends ViewProps {
  intensity?: 'light' | 'medium' | 'strong';
  glowColor?: 'cyan' | 'pink' | 'purple' | 'none';
}

export function GlassyCard({
  intensity = 'medium',
  glowColor = 'cyan',
  style,
  ...props
}: GlassyCardProps) {
  const colorScheme = 'dark';
  const C = Colors[colorScheme];

  const intensityMap = {
    light: 0.6,
    medium: 0.8,
    strong: 0.95,
  };

  const glowColorMap = {
    cyan: C.glow,
    pink: C.glowPink,
    purple: C.glowPurple,
    none: 'transparent',
  };

  const styles = StyleSheet.create({
    glassyCard: {
      backgroundColor: glowColorMap[glowColor],
      borderWidth: 1,
      borderColor: `rgba(0, 217, 255, ${glowColor === 'cyan' ? 0.2 : 0})`,
      borderRadius: 20,
      padding: 16,
      backdropFilter: 'blur(10px)',
      overflow: 'hidden',
    },
  });

  return (
    <View
      style={[
        styles.glassyCard,
        {
          borderColor:
            glowColor === 'cyan'
              ? 'rgba(0, 217, 255, 0.3)'
              : glowColor === 'pink'
                ? 'rgba(255, 0, 110, 0.3)'
                : glowColor === 'purple'
                  ? 'rgba(131, 56, 236, 0.3)'
                  : 'rgba(0, 0, 0, 0.1)',
        },
        style,
      ]}
      {...props}
    />
  );
}
