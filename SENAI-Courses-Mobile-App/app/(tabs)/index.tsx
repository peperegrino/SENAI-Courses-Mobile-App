import { useRouter } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import { Colors } from '@/constants/theme';
import { categories, courses } from '@/constants/data';
import { CourseCard } from '@/components/course-card';
import { CategoryChip } from '@/components/category-chip';
import { GlassyCard } from '@/components/glassy-card';
import { NeonBadge } from '@/components/neon-badge';
import { useGamification } from '@/hooks/use-gamification';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = 'dark';
  const C = Colors[colorScheme];
  const gamification = useGamification();
  const levelProgress = gamification.getNextLevelProgress();

  const featured = courses.filter((c) => c.rating >= 4.8);
  const freeCourses = courses.filter((c) => c.isFree);

  // Simulated recent achievements
  const recentAchievements = gamification.state.unlockedAchievements.slice(-3);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: C.background }]}
      showsVerticalScrollIndicator={false}>
      {/* NEO-FUTURISTIC Header */}
      <View style={[styles.header, { backgroundColor: C.primary }]}>
        <View style={styles.gradientOverlay} />
        
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerGreeting}>Bem-vindo, estudante 🚀</Text>
            <Text style={styles.headerTitle}>Próximo nível{'\n'}de aprendizado</Text>
          </View>
          <View style={[styles.avatar, { backgroundColor: C.secondary }]}>
            <Text style={styles.avatarText}>✨</Text>
          </View>
        </View>

        {/* Search bar */}
        <TouchableOpacity
          style={[styles.searchBar, { backgroundColor: `${C.card}E6` }]}
          onPress={() => router.push('/(tabs)/courses')}
          activeOpacity={0.8}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={[styles.searchPlaceholder, { color: C.muted }]}>
            Explorar cursos...
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* GAMIFICATION STATS SECTION */}
        <View style={styles.statsSection}>
          {/* Main stats card */}
          <GlassyCard intensity="strong" glowColor="cyan" style={styles.mainStatsCard}>
            <View style={styles.levelDisplay}>
              <View style={styles.levelCircle}>
                <Text style={styles.levelNumber}>{gamification.state.level}</Text>
                <Text style={styles.levelLabel}>LVL</Text>
              </View>
              <View style={{ flex: 1, gap: 6 }}>
                <Text style={[styles.pointsText, { color: C.text }]}>
                  {gamification.state.points.toLocaleString()} Pontos
                </Text>
                <View style={[styles.progressBar, { backgroundColor: `${C.tint}20` }]}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${levelProgress.progress * 100}%`,
                        backgroundColor: C.tint,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.progressText, { color: C.muted }]}>
                  {levelProgress.current} / {levelProgress.needed} pts
                </Text>
              </View>
            </View>

            {/* Streak & Achievements Row */}
            <View style={styles.statRow}>
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={[styles.statLabel, { color: C.muted }]}>Sequência</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Text style={{ fontSize: 20 }}>🔥</Text>
                  <Text style={[styles.statValue, { color: C.secondary }]}>
                    {gamification.state.streak} dias
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={[styles.statLabel, { color: C.muted }]}>Estudado</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Text style={{ fontSize: 20 }}>⏱️</Text>
                  <Text style={[styles.statValue, { color: C.tint }]}>
                    {gamification.state.totalMinutesStudied}h
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={[styles.statLabel, { color: C.muted }]}>Cursos</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Text style={{ fontSize: 20 }}>🎓</Text>
                  <Text style={[styles.statValue, { color: C.accent }]}>
                    {gamification.state.coursesCompleted}
                  </Text>
                </View>
              </View>
            </View>
          </GlassyCard>

          {/* Recent Achievements */}
          {recentAchievements.length > 0 && (
            <GlassyCard intensity="medium" glowColor="pink" style={styles.achievementsCard}>
              <Text style={[styles.achievementsTitle, { color: C.text }]}>
                🏆 Últimas Conquistas
              </Text>
              <View style={styles.achievementsList}>
                {recentAchievements.map((ach) => (
                  <NeonBadge
                    key={ach.id}
                    label={ach.name}
                    icon={ach.icon}
                    color={ach.color}
                    size="small"
                  />
                ))}
              </View>
            </GlassyCard>
          )}
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: C.text }]}>Categorias</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesRow}>
            {categories.map((cat) => (
              <CategoryChip
                key={cat.id}
                category={cat}
                onPress={() => router.push('/(tabs)/courses')}
              />
            ))}
          </ScrollView>
        </View>

        {/* Featured */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: C.text }]}>
              ⭐ Mais Bem Avaliados
            </Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/courses')}>
              <Text style={[styles.seeAll, { color: C.tint }]}>Ver tudo →</Text>
            </TouchableOpacity>
          </View>
          {featured.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onPress={() => router.push(`/course/${course.id}`)}
            />
          ))}
        </View>

        {/* Free courses */}
        {freeCourses.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: C.text }]}>🎁 Gratuitos</Text>
            </View>
            {freeCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onPress={() => router.push(`/course/${course.id}`)}
              />
            ))}
          </View>
        )}

        {/* Neo-Futuristic Banner */}
        <TouchableOpacity
          style={[
            styles.banner,
            {
              background: `linear-gradient(135deg, ${C.accent} 0%, ${C.secondary} 100%)`,
              backgroundColor: C.accent,
            },
          ]}
          activeOpacity={0.85}>
          <Text style={styles.bannerEmoji}>🎓</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitle}>Certificação SENAI</Text>
            <Text style={styles.bannerSub}>Reconhecido no Brasil inteiro</Text>
          </View>
          <Text style={styles.bannerArrow}>⚡</Text>
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
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(131, 56, 236, 0.1)',
    opacity: 0.5,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    zIndex: 1,
  },
  headerGreeting: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginBottom: 4 },
  headerTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: '800', lineHeight: 30, letterSpacing: 0.5 },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: { color: '#FFFFFF', fontWeight: '700', fontSize: 24 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    borderColor: 'rgba(0, 217, 255, 0.2)',
    zIndex: 1,
  },
  searchIcon: { fontSize: 16 },
  searchPlaceholder: { fontSize: 14, fontWeight: '500' },
  content: { padding: 20 },
  statsSection: { marginBottom: 28, gap: 12 },
  mainStatsCard: {
    gap: 14,
  },
  levelDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  levelCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 217, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#00D9FF',
  },
  levelNumber: { fontSize: 28, fontWeight: '800', color: '#00D9FF' },
  levelLabel: { fontSize: 10, fontWeight: '700', color: '#00D9FF', marginTop: 2 },
  pointsText: { fontSize: 16, fontWeight: '700' },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: { fontSize: 11, fontWeight: '500' },
  statRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  statLabel: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.3 },
  statValue: { fontSize: 16, fontWeight: '800' },
  achievementsCard: {
    gap: 10,
  },
  achievementsTitle: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
  achievementsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  section: { marginBottom: 28 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  seeAll: { fontSize: 13, fontWeight: '600' },
  categoriesRow: { gap: 10, paddingRight: 4 },
  banner: {
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 8,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(131, 56, 236, 0.4)',
  },
  bannerEmoji: { fontSize: 36 },
  bannerTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', marginBottom: 4 },
  bannerSub: { color: 'rgba(255,255,255,0.85)', fontSize: 13 },
  bannerArrow: { color: '#FFFFFF', fontSize: 24, fontWeight: '800' },
});
