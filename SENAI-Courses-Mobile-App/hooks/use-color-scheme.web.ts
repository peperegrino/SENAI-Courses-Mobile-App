import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * Force dark mode for neo-futuristic theme
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // Always return dark mode
  if (hasHydrated) {
    return 'dark' as const;
  }

  return 'dark' as const;
}
