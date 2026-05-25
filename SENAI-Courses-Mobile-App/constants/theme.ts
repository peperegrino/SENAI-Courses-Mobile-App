import { Platform } from 'react-native';

// NEO-FUTURISTIC CYBERPUNK THEME
export const Colors = {
  light: {
    // Neo-futuristic palette
    text: '#0F0F1F',           // Nearly black
    background: '#F8F9FF',     // Soft white with blue tint
    card: '#FFFFFF',
    tint: '#00D9FF',           // Cyan neon
    tintSecondary: '#FF006E',  // Pink neon
    tintTertiary: '#8338EC',   // Purple neon
    icon: '#4A5FA3',
    tabIconDefault: '#9BB0D1',
    tabIconSelected: '#00D9FF',
    border: '#E0E6FF',
    muted: '#7A8FBB',
    success: '#00FF88',        // Neon green
    warning: '#FFB700',        // Neon amber
    surface: '#FFFFFF',
    
    // Additional neo-futuristic colors
    primary: '#00D9FF',        // Cyan
    secondary: '#FF006E',      // Pink/Magenta
    accent: '#8338EC',         // Purple
    dark: '#0F0F1F',
    glow: 'rgba(0, 217, 255, 0.15)',
    glowPink: 'rgba(255, 0, 110, 0.15)',
    glowPurple: 'rgba(131, 56, 236, 0.15)',
  },
  dark: {
    // Dark neo-futuristic palette
    text: '#E8EEFF',
    background: '#0A0E27',     // Deep space blue
    card: '#1A1F3A',           // Dark blue-gray
    tint: '#00D9FF',           // Cyan neon
    tintSecondary: '#FF006E',  // Pink neon
    tintTertiary: '#8338EC',   // Purple neon
    icon: '#9BB0D1',
    tabIconDefault: '#5A6FB5',
    tabIconSelected: '#00D9FF',
    border: '#2A3560',
    muted: '#7A8FBB',
    success: '#00FF88',        // Neon green
    warning: '#FFB700',        // Neon amber
    surface: '#14192D',
    
    // Additional neo-futuristic colors
    primary: '#00D9FF',        // Cyan
    secondary: '#FF006E',      // Pink/Magenta
    accent: '#8338EC',         // Purple
    dark: '#0A0E27',
    glow: 'rgba(0, 217, 255, 0.2)',
    glowPink: 'rgba(255, 0, 110, 0.2)',
    glowPurple: 'rgba(131, 56, 236, 0.2)',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// NEO-FUTURISTIC SHADOWS (Glow effects)
export const Shadows = {
  glow: {
    shadowColor: '#00D9FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  glowPink: {
    shadowColor: '#FF006E',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  glowPurple: {
    shadowColor: '#8338EC',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
};
