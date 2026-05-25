import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import type { Category } from '@/constants/data';

type Props = {
  category: Category;
  onPress: () => void;
};

export function CategoryChip({ category, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.chip, { backgroundColor: category.color + '18', borderColor: category.color + '50' }]}
      onPress={onPress}
      activeOpacity={0.75}>
      <Text style={[styles.name, { color: category.color }]}>{category.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderWidth: 1,
  },
  name: { fontSize: 13, fontWeight: '700' },
});
