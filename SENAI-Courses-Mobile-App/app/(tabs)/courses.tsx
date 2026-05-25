import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';

import { Colors } from '@/constants/theme';
import { categories, courses } from '@/constants/data';
import { CourseCard } from '@/components/course-card';

export default function CoursesScreen() {
  const router = useRouter();
  const colorScheme = 'dark';
  const C = Colors[colorScheme];

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedModality, setSelectedModality] = useState<string | null>(null);

  const modalities = ['EAD', 'Presencial', 'Híbrido'];

  const filtered = courses.filter((c) => {
    const matchesSearch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = !selectedCategory || c.categoryId === selectedCategory;
    const matchesModality = !selectedModality || c.modality === selectedModality;
    return matchesSearch && matchesCat && matchesModality;
  });

  return (
    <View style={[styles.container, { backgroundColor: C.background }]}>
      {/* Top bar */}
      <View style={[styles.topBar, { backgroundColor: C.tint }]}>
        <Text style={styles.topTitle}>Cursos SENAI</Text>
        <View style={[styles.searchRow, { backgroundColor: C.surface }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: C.text }]}
            placeholder="Buscar cursos..."
            placeholderTextColor={C.muted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={{ color: C.muted, fontSize: 16 }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Category filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}>
          <TouchableOpacity
            style={[
              styles.filterChip,
              { borderColor: C.border, backgroundColor: !selectedCategory ? C.tint : C.card },
            ]}
            onPress={() => setSelectedCategory(null)}>
            <Text style={[styles.filterText, { color: !selectedCategory ? '#FFF' : C.text }]}>
              Todos
            </Text>
          </TouchableOpacity>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.filterChip,
                {
                  borderColor: selectedCategory === cat.id ? cat.color : C.border,
                  backgroundColor: selectedCategory === cat.id ? cat.color : C.card,
                },
              ]}
              onPress={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}>
              <Text
                style={[
                  styles.filterText,
                  { color: selectedCategory === cat.id ? '#FFF' : C.text },
                ]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Modality filters */}
        <View style={styles.modalityRow}>
          {modalities.map((m) => (
            <TouchableOpacity
              key={m}
              style={[
                styles.modalityChip,
                {
                  backgroundColor: selectedModality === m ? C.tintSecondary : C.card,
                  borderColor: C.border,
                },
              ]}
              onPress={() => setSelectedModality(selectedModality === m ? null : m)}>
              <Text
                style={[styles.modalityText, { color: selectedModality === m ? '#FFF' : C.text }]}>
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Results count */}
        <View style={styles.resultsRow}>
          <Text style={[styles.resultsText, { color: C.muted }]}>
            {filtered.length} curso{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </Text>
        </View>

        {/* Course list */}
        <View style={styles.courseList}>
          {filtered.length > 0 ? (
            filtered.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onPress={() => router.push(`/course/${course.id}`)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={[styles.emptyTitle, { color: C.text }]}>Nenhum curso encontrado</Text>
              <Text style={[styles.emptySubtitle, { color: C.muted }]}>
                Tente outros termos ou remova os filtros
              </Text>
            </View>
          )}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { paddingTop: 56, paddingBottom: 20, paddingHorizontal: 20 },
  topTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: '700', marginBottom: 14 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
    elevation: 4,
  },
  searchIcon: { fontSize: 15 },
  searchInput: { flex: 1, fontSize: 15 },
  filtersRow: { paddingHorizontal: 20, paddingVertical: 14, gap: 8 },
  filterChip: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
  },
  filterText: { fontSize: 13, fontWeight: '600' },
  modalityRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 4,
  },
  modalityChip: {
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
  },
  modalityText: { fontSize: 13, fontWeight: '500' },
  resultsRow: { paddingHorizontal: 20, marginTop: 8, marginBottom: 4 },
  resultsText: { fontSize: 13 },
  courseList: { paddingHorizontal: 20, paddingTop: 8 },
  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
  emptySubtitle: { fontSize: 14, textAlign: 'center' },
});
