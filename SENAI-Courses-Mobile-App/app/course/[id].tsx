import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Colors } from '@/constants/theme';
import { courses, categories } from '@/constants/data';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = 'dark';
  const C = Colors[colorScheme];

  const course = courses.find((c) => c.id === id);
  const category = course ? categories.find((cat) => cat.id === course.categoryId) : null;

  if (!course) {
    return (
      <View style={[styles.notFound, { backgroundColor: C.background }]}>
        <Text style={{ color: C.text, fontSize: 18 }}>Curso não encontrado</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: C.tint, marginTop: 12 }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const modalityEmoji = { EAD: '💻', Presencial: '🏢', Híbrido: '🔄' }[course.modality];
  const levelEmoji = { Básico: '🟢', Intermediário: '🟡', Avançado: '🔴' }[course.level];
  const stars = '★'.repeat(Math.round(course.rating)) + '☆'.repeat(5 - Math.round(course.rating));

  return (
    <View style={[styles.container, { backgroundColor: C.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: course.imageColor }]}>
          <View style={styles.heroOverlay}>
            <View style={styles.heroTags}>
              {course.isFree && (
                <View style={styles.freeTag}>
                  <Text style={styles.freeTagText}>GRATUITO</Text>
                </View>
              )}
              {category && (
                <View style={[styles.catTag, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                  <Text style={styles.catTagText}>{category.name}</Text>
                </View>
              )}
            </View>
            <Text style={styles.heroTitle}>{course.title}</Text>
            <Text style={styles.heroInstructor}>{course.instructor}</Text>
            <View style={styles.heroMeta}>
              <Text style={styles.heroMetaText}>{stars} {course.rating}</Text>
              <Text style={styles.heroDot}>•</Text>
              <Text style={styles.heroMetaText}>{course.enrolledCount.toLocaleString('pt-BR')} alunos</Text>
              <Text style={styles.heroDot}>•</Text>
              <Text style={styles.heroMetaText}>{course.duration}</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          {/* Quick info pills */}
          <View style={styles.pillsRow}>
            <View style={[styles.pill, { backgroundColor: C.card, borderColor: C.border }]}>
              <Text style={styles.pillIcon}>{modalityEmoji}</Text>
              <Text style={[styles.pillText, { color: C.text }]}>{course.modality}</Text>
            </View>
            <View style={[styles.pill, { backgroundColor: C.card, borderColor: C.border }]}>
              <Text style={styles.pillIcon}>{levelEmoji}</Text>
              <Text style={[styles.pillText, { color: C.text }]}>{course.level}</Text>
            </View>
            <View style={[styles.pill, { backgroundColor: C.card, borderColor: C.border }]}>
              <Text style={styles.pillIcon}>⏱</Text>
              <Text style={[styles.pillText, { color: C.text }]}>{course.duration}</Text>
            </View>
          </View>

          {/* About */}
          <View style={[styles.section, { backgroundColor: C.card, borderColor: C.border }]}>
            <Text style={[styles.sectionTitle, { color: C.text }]}>Sobre o Curso</Text>
            <Text style={[styles.description, { color: C.muted }]}>{course.description}</Text>
          </View>

          {/* Highlights */}
          <View style={[styles.section, { backgroundColor: C.card, borderColor: C.border }]}>
            <Text style={[styles.sectionTitle, { color: C.text }]}>O que você vai aprender</Text>
            {course.highlights.map((h, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={[styles.checkIcon, { color: C.success }]}>✓</Text>
                <Text style={[styles.listText, { color: C.text }]}>{h}</Text>
              </View>
            ))}
          </View>

          {/* Requirements */}
          <View style={[styles.section, { backgroundColor: C.card, borderColor: C.border }]}>
            <Text style={[styles.sectionTitle, { color: C.text }]}>Pré-requisitos</Text>
            {course.requirements.map((r, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={[styles.checkIcon, { color: C.tintSecondary }]}>›</Text>
                <Text style={[styles.listText, { color: C.text }]}>{r}</Text>
              </View>
            ))}
          </View>

          {/* Tags */}
          <View style={styles.tagsRow}>
            {course.tags.map((tag) => (
              <View key={tag} style={[styles.tag, { backgroundColor: C.tint + '18', borderColor: C.tint + '40' }]}>
                <Text style={[styles.tagText, { color: C.tint }]}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { backgroundColor: C.card, borderTopColor: C.border }]}>
        <View>
          {course.isFree ? (
            <Text style={[styles.price, { color: C.success }]}>Gratuito</Text>
          ) : (
            <>
              <Text style={[styles.priceLabel, { color: C.muted }]}>Investimento</Text>
              <Text style={[styles.price, { color: C.text }]}>
                R$ {course.price?.toLocaleString('pt-BR')}
              </Text>
            </>
          )}
        </View>
        <TouchableOpacity style={[styles.enrollBtn, { backgroundColor: C.tint }]} activeOpacity={0.85}>
          <Text style={styles.enrollBtnText}>
            {course.isFree ? 'Inscrever-se grátis' : 'Matricular-se'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hero: { height: 280, justifyContent: 'flex-end' },
  heroOverlay: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 80,
  },
  heroTags: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  freeTag: { backgroundColor: '#27AE60', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4 },
  freeTagText: { color: '#FFF', fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  catTag: { borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4 },
  catTagText: { color: '#FFF', fontSize: 11, fontWeight: '600' },
  heroTitle: { color: '#FFF', fontSize: 22, fontWeight: '700', lineHeight: 28, marginBottom: 6 },
  heroInstructor: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 10 },
  heroMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  heroMetaText: { color: 'rgba(255,255,255,0.9)', fontSize: 13 },
  heroDot: { color: 'rgba(255,255,255,0.5)', fontSize: 13 },
  content: { padding: 20, gap: 14 },
  pillsRow: { flexDirection: 'row', gap: 10 },
  pill: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 10, paddingVertical: 10, borderWidth: 1 },
  pillIcon: { fontSize: 16 },
  pillText: { fontSize: 13, fontWeight: '600' },
  section: { borderRadius: 14, padding: 16, borderWidth: 1 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  description: { fontSize: 14, lineHeight: 22 },
  listItem: { flexDirection: 'row', gap: 10, marginBottom: 10, alignItems: 'flex-start' },
  checkIcon: { fontSize: 16, fontWeight: '700', marginTop: 1 },
  listText: { flex: 1, fontSize: 14, lineHeight: 20 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1 },
  tagText: { fontSize: 12, fontWeight: '600' },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 34,
    borderTopWidth: 1,
    elevation: 12,
  },
  priceLabel: { fontSize: 11, marginBottom: 2 },
  price: { fontSize: 22, fontWeight: '700' },
  enrollBtn: { borderRadius: 14, paddingVertical: 14, paddingHorizontal: 28 },
  enrollBtnText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
});
