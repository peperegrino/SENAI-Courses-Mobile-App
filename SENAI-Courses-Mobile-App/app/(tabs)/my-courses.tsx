import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { Colors } from '@/constants/theme';
import { courses } from '@/constants/data';
import { GlassyCard } from '@/components/glassy-card';
import { NeonBadge } from '@/components/neon-badge';

// Simulated enrolled courses (IDs 1, 3, 8)
const ENROLLED_IDS = ['1', '3', '8'];
const PROGRESS: Record<string, number> = { '1': 65, '3': 22, '8': 100 };
const TOTAL_HOURS = { '1': 52, '3': 26, '8': 80 };
const COMPLETED_HOURS = { '1': 34, '3': 6, '8': 80 };

export default function MyCoursesScreen() {
  const router = useRouter();
  const colorScheme = 'dark';
  const C = Colors[colorScheme];

  const enrolled = courses.filter((c) => ENROLLED_IDS.includes(c.id));
  const completed = enrolled.filter((c) => PROGRESS[c.id] === 100);
  const inProgress = enrolled.filter((c) => PROGRESS[c.id] < 100);
  
  const totalHoursCompleted = Object.values(COMPLETED_HOURS).reduce((a, b) => a + b, 0);
  const totalHours = Object.values(TOTAL_HOURS).reduce((a, b) => a + b, 0);
  const completionPercentage = Math.round((totalHoursCompleted / totalHours) * 100);

  const ProgressBar = ({ progress, color }: { progress: number; color: string }) => (
    <View style={[styles.progressTrack, { backgroundColor: `${C.tint}20` }]}>
      <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: color }]} />
    </View>
  );

  const CourseItem = ({ course }: { course: (typeof courses)[0] }) => {
    const progress = PROGRESS[course.id];
    const isCompleted = progress === 100;
    const hoursCompleted = COMPLETED_HOURS[course.id];
    const totalCourseHours = TOTAL_HOURS[course.id];
    return (
      <GlassyCard
        glowColor={isCompleted ? 'green' : 'cyan'}
        intensity="medium"
        style={styles.courseItem}>
        <View style={{ gap: 8 }}>
          <View style={styles.courseHeaderRow}>
            <Text style={[styles.courseItemTitle, { color: C.text }]} numberOfLines={2}>
              {course.title}
            </Text>
            {isCompleted && <NeonBadge label="Concluído" icon="✓" color="green" size="small" />}
          </View>
          
          <Text style={[styles.courseItemInstructor, { color: C.muted }]}>
            👨‍🏫 {course.instructor}
          </Text>
          
          <View style={styles.hoursRow}>
            <Text style={[styles.hoursText, { color: C.tint }]}>
              ⏱️ {hoursCompleted}h / {totalCourseHours}h
            </Text>
          </View>

          <ProgressBar progress={progress} color={isCompleted ? C.success : C.tint} />
          
          <View style={styles.percentageRow}>
            <Text style={[styles.percentageText, { color: isCompleted ? C.success : C.tint }]}>
              {progress}% completo
            </Text>
          </View>
        </View>
      </GlassyCard>
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: C.background }]} showsVerticalScrollIndicator={false}>
      {/* NEO Header */}
      <View style={[styles.header, { backgroundColor: C.tint }]}>
        <View style={styles.headerGradient} />
        
        <Text style={styles.headerTitle}>📚 Sua Jornada</Text>
        <Text style={styles.headerSubtitle}>{completed.length} cursos concluídos</Text>
        
        <View style={styles.statsRow}>
          <GlassyCard intensity="strong" glowColor="cyan" style={styles.statCard}>
            <View style={{ alignItems: 'center', gap: 4 }}>
              <Text style={{ fontSize: 24 }}>{enrolled.length}</Text>
              <Text style={[styles.statLabel, { color: C.muted }]}>Inscritos</Text>
            </View>
          </GlassyCard>
          
          <GlassyCard intensity="strong" glowColor="pink" style={styles.statCard}>
            <View style={{ alignItems: 'center', gap: 4 }}>
              <Text style={{ fontSize: 24 }}>{totalHoursCompleted}h</Text>
              <Text style={[styles.statLabel, { color: C.muted }]}>Estudado</Text>
            </View>
          </GlassyCard>
          
          <GlassyCard intensity="strong" glowColor="purple" style={styles.statCard}>
            <View style={{ alignItems: 'center', gap: 4 }}>
              <Text style={{ fontSize: 24 }}>{completionPercentage}%</Text>
              <Text style={[styles.statLabel, { color: C.muted }]}>Geral</Text>
            </View>
          </GlassyCard>
        </View>

        {/* Overall progress */}
        <GlassyCard intensity="medium" glowColor="cyan" style={{ marginTop: 14 }}>
          <Text style={[styles.progressLabel, { color: C.text }]}>Progresso Total</Text>
          <ProgressBar progress={completionPercentage} color={C.tint} />
          <Text style={[styles.completionText, { color: C.tint }]}>
            {totalHoursCompleted} / {totalHours} horas
          </Text>
        </GlassyCard>
      </View>

      <View style={styles.content}>
        {/* In progress */}
        {inProgress.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={[styles.sectionTitle, { color: C.text }]}>⚡ Em Andamento</Text>
              <NeonBadge label={`${inProgress.length}`} icon="🔥" color="pink" size="small" />
            </View>
            {inProgress.map((c) => (
              <CourseItem key={c.id} course={c} />
            ))}
          </View>
        )}

        {/* Completed */}
        {completed.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={[styles.sectionTitle, { color: C.text }]}>🏆 Concluídos</Text>
              <NeonBadge label={`${completed.length}`} icon="⭐" color="green" size="small" />
            </View>
            {completed.map((c) => (
              <CourseItem key={c.id} course={c} />
            ))}
          </View>
        )}

        {/* CTA */}
        <TouchableOpacity
          style={[styles.ctaBox, { backgroundColor: C.accent, borderColor: `${C.accent}40` }]}
          onPress={() => router.push('/(tabs)/courses')}
          activeOpacity={0.85}>
          <Text style={styles.ctaEmoji}>✨</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.ctaTitle}>Continuar Aprendendo</Text>
            <Text style={styles.ctaSubtitle}>Explore novos cursos</Text>
          </View>
          <Text style={styles.ctaArrow}>→</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 56,
    paddingBottom: 24,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 0, 110, 0.1)',
    opacity: 0.4,
  },
  headerTitle: { color: '#FFF', fontSize: 26, fontWeight: '800', marginBottom: 4, zIndex: 1, letterSpacing: 0.5 },
  headerSubtitle: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 13, marginBottom: 16, zIndex: 1 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 14, zIndex: 1 },
  statCard: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  statNumber: { fontSize: 24, fontWeight: '800' },
  statLabel: { fontSize: 11, fontWeight: '600', marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.2 },
  content: { padding: 20 },
  section: { marginBottom: 24 },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  courseItem: {
    marginBottom: 12,
  },
  courseHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  courseColorBar: { width: 6 },
  courseItemContent: { flex: 1, gap: 6 },
  courseItemTitle: { fontSize: 15, fontWeight: '700', lineHeight: 20 },
  courseItemInstructor: { fontSize: 12 },
  hoursRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hoursText: { fontSize: 12, fontWeight: '600' },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  progressTrack: { flex: 1, height: 7, borderRadius: 3.5, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3.5 },
  progressLabel: { fontSize: 12, fontWeight: '700', width: 36, textAlign: 'right' },
  percentageRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  percentageText: { fontSize: 12, fontWeight: '700' },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { fontSize: 12, fontWeight: '700' },
  ctaBox: {
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1.5,
  },
  ctaEmoji: { fontSize: 28 },
  ctaTitle: { color: '#FFF', fontSize: 15, fontWeight: '800', marginBottom: 2 },
  ctaSubtitle: { color: 'rgba(255,255,255,0.75)', fontSize: 12 },
  ctaArrow: { color: '#FFF', fontSize: 22, fontWeight: '800' },
  completionText: { fontSize: 11, fontWeight: '600', marginTop: 6 },
});
