import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/theme';
import { NeonBadge } from './neon-badge';
import type { Course } from '@/constants/data';
import { categories } from '@/constants/data';

type Props = {
  course: Course;
  onPress: () => void;
};

export function CourseCard({ course, onPress }: Props) {
  const colorScheme = 'dark';
  const C = Colors[colorScheme];
  const category = categories.find((c) => c.id === course.categoryId);
  const stars = '★'.repeat(Math.round(course.rating));
  const modalityEmoji = { EAD: '💻', Presencial: '🏢', Híbrido: '🔄' }[course.modality];
  
  // Determine glow color based on category
  const glowColor = category?.id === 'tech' ? 'cyan' : category?.id === 'industry' ? 'pink' : 'purple';

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: C.card,
          borderColor: glowColor === 'cyan' ? 'rgba(0, 217, 255, 0.3)' : glowColor === 'pink' ? 'rgba(255, 0, 110, 0.3)' : 'rgba(131, 56, 236, 0.3)',
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}>
      {/* Neo-futuristic Color bar header with gradient effect */}
      <View style={[styles.cardHeader, { backgroundColor: course.imageColor }]}>
        <View style={[styles.glowOverlay, { backgroundColor: course.imageColor + '40' }]} />
        {course.isFree && (
          <NeonBadge
            label="GRÁTIS"
            icon="🎁"
            color="green"
            size="small"
          />
        )}
        <View style={styles.headerRight}>
          <NeonBadge
            label={course.duration}
            icon="⏱️"
            color={glowColor as 'cyan' | 'pink' | 'purple' | 'green'}
            size="small"
          />
        </View>
      </View>

      <View style={styles.cardBody}>
        {/* Category + modality */}
        <View style={styles.metaRow}>
          {category && (
            <NeonBadge
              label={category.name}
              color={glowColor as 'cyan' | 'pink' | 'purple' | 'green'}
              icon="🏷️"
              size="small"
            />
          )}
          <Text style={[styles.modality, { color: C.muted }]}>
            {modalityEmoji} {course.modality}
          </Text>
        </View>

        <Text style={[styles.title, { color: C.text }]} numberOfLines={2}>
          {course.title}
        </Text>

        <Text style={[styles.instructor, { color: C.muted }]}>{course.instructor}</Text>

        <View style={styles.bottomRow}>
          <View style={styles.ratingRow}>
            <Text style={[styles.stars, { color: C.success }]}>{stars}</Text>
            <Text style={[styles.ratingNum, { color: C.tint }]}>{course.rating}</Text>
            <Text style={[styles.enrolledText, { color: C.muted }]}>
              ({(course.enrolledCount / 1000).toFixed(1)}k)
            </Text>
          </View>
          <NeonBadge
            label={course.level}
            icon="🎯"
            color={course.level === 'Básico' ? 'green' : course.level === 'Intermediário' ? 'cyan' : 'pink'}
            size="small"
          />
        </View>

        {!course.isFree && course.price && (
          <Text style={[styles.price, { color: C.tint }]}>
            R$ {course.price.toLocaleString('pt-BR')}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1.5,
    overflow: 'hidden',
    marginBottom: 14,
    elevation: 8,
  },
  cardHeader: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  glowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
  },
  headerRight: {
    alignItems: 'flex-end',
    marginLeft: 'auto',
  },
  cardBody: { padding: 14, gap: 8 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  categoryLabel: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.3 },
  dot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#9BA1A6' },
  modality: { fontSize: 12, fontWeight: '500' },
  title: { fontSize: 16, fontWeight: '700', lineHeight: 22 },
  instructor: { fontSize: 12 },
  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  stars: { fontSize: 14 },
  ratingNum: { fontSize: 13, fontWeight: '700' },
  enrolledText: { fontSize: 12 },
  levelBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  levelText: { fontSize: 11, fontWeight: '700' },
  price: { fontSize: 18, fontWeight: '800', marginTop: 6, letterSpacing: 0.5 },
  freeBadge: {
    backgroundColor: '#27AE60',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  freeBadgeText: { color: '#FFF', fontSize: 10, fontWeight: '800' },
  durationBadge: {
    marginLeft: 'auto',
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '600',
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
});
