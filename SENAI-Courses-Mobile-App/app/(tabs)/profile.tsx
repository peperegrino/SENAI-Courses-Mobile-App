import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useState } from 'react';

import { Colors } from '@/constants/theme';
import { GlassyCard } from '@/components/glassy-card';
import { NeonBadge } from '@/components/neon-badge';
import { ACHIEVEMENTS } from '@/constants/achievements';

export default function ProfileScreen() {
  const colorScheme = 'dark';
  const C = Colors[colorScheme];
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');

  // Simulated achievements unlocked
  const unlockedAchievements = ACHIEVEMENTS.slice(0, 5);

  const menuItems = [
    { icon: '📋', label: 'Certificados', sublabel: '1 certificado disponível', badge: '1' },
    { icon: '⭐', label: 'Avaliações', sublabel: 'Gerencie suas avaliações', badge: '3' },
    { icon: '💳', label: 'Pagamentos', sublabel: 'Histórico e métodos', badge: '0' },
    { icon: '🎯', label: 'Metas', sublabel: 'Defina suas metas', badge: null },
    { icon: '❓', label: 'Ajuda', sublabel: 'FAQ e suporte', badge: null },
    { icon: '📞', label: 'Contato', sublabel: '0800 061 0904', badge: null },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: C.background }]}
      showsVerticalScrollIndicator={false}>
      {/* NEO Profile header */}
      <View style={[styles.header, { backgroundColor: C.secondary }]}>
        <View style={styles.headerGradient} />
        
        <View style={[styles.avatarLarge, { backgroundColor: C.accent, borderColor: C.tint }]}>
          <Text style={styles.avatarLargeText}>JS</Text>
        </View>
        <Text style={styles.profileName}>João da Silva</Text>
        <Text style={styles.profileEmail}>joao.silva@email.com</Text>
        
        <View style={styles.profileStatsRow}>
          <GlassyCard intensity="strong" glowColor="cyan" style={styles.statBadge}>
            <View style={{ alignItems: 'center', gap: 3 }}>
              <Text style={{ fontSize: 20 }}>3</Text>
              <Text style={[styles.statBadgeLabel, { color: C.muted }]}>Cursos</Text>
            </View>
          </GlassyCard>
          
          <GlassyCard intensity="strong" glowColor="pink" style={styles.statBadge}>
            <View style={{ alignItems: 'center', gap: 3 }}>
              <Text style={{ fontSize: 20 }}>1</Text>
              <Text style={[styles.statBadgeLabel, { color: C.muted }]}>Cert.</Text>
            </View>
          </GlassyCard>
          
          <GlassyCard intensity="strong" glowColor="purple" style={styles.statBadge}>
            <View style={{ alignItems: 'center', gap: 3 }}>
              <Text style={{ fontSize: 20 }}>850</Text>
              <Text style={[styles.statBadgeLabel, { color: C.muted }]}>Pts</Text>
            </View>
          </GlassyCard>
        </View>
      </View>

      <View style={styles.content}>
        {/* Achievements Section */}
        {unlockedAchievements.length > 0 && (
          <GlassyCard intensity="medium" glowColor="purple" style={styles.achievementsSection}>
            <Text style={[styles.sectionTitle, { color: C.text }]}>🏆 Conquistas Desbloqueadas</Text>
            <View style={styles.achievementsGrid}>
              {unlockedAchievements.map((achievement) => (
                <TouchableOpacity key={achievement.id} style={styles.achievementItem} activeOpacity={0.7}>
                  <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                  <Text style={[styles.achievementLabel, { color: C.text }]} numberOfLines={1}>
                    {achievement.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </GlassyCard>
        )}

        {/* Preferences */}
        <GlassyCard intensity="strong" glowColor="cyan" style={styles.card}>
          <Text style={[styles.cardTitle, { color: C.text }]}>⚙️ Preferências</Text>

          <View style={[styles.prefRow, { borderBottomColor: C.border }]}>
            <View style={styles.prefLeft}>
              <Text style={styles.prefIcon}>🔔</Text>
              <View>
                <Text style={[styles.prefLabel, { color: C.text }]}>Notificações</Text>
                <Text style={[styles.prefSub, { color: C.muted }]}>Lembretes de aulas</Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ true: C.tint, false: C.border }}
              thumbColor={notifications ? C.tint : C.muted}
            />
          </View>

          <View style={styles.prefRow}>
            <View style={styles.prefLeft}>
              <Text style={styles.prefIcon}>🌙</Text>
              <View>
                <Text style={[styles.prefLabel, { color: C.text }]}>Tema Escuro</Text>
                <Text style={[styles.prefSub, { color: C.muted }]}>Reduzir brilho</Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ true: C.tint, false: C.border }}
              thumbColor={darkMode ? C.tint : C.muted}
            />
          </View>
        </GlassyCard>

        {/* Menu items */}
        <GlassyCard intensity="strong" glowColor="pink" style={styles.card}>
          <Text style={[styles.cardTitle, { color: C.text }]}>👤 Conta</Text>
          {menuItems.map((item, idx) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.menuItem,
                idx < menuItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: C.border },
              ]}
              activeOpacity={0.6}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.menuLabel, { color: C.text }]}>{item.label}</Text>
                <Text style={[styles.menuSub, { color: C.muted }]} numberOfLines={1}>
                  {item.sublabel}
                </Text>
              </View>
              {item.badge && item.badge !== '0' && (
                <NeonBadge
                  label={item.badge}
                  icon="✨"
                  color="cyan"
                  size="small"
                />
              )}
              <Text style={[styles.menuArrow, { color: C.muted }]}>›</Text>
            </TouchableOpacity>
          ))}
        </GlassyCard>

        {/* Logout */}
        <TouchableOpacity
          style={[
            styles.logoutBtn,
            {
              backgroundColor: `${C.secondary}20`,
              borderColor: C.secondary,
            },
          ]}
          activeOpacity={0.75}>
          <Text style={[styles.logoutText, { color: C.secondary }]}>⚡ Sair da Conta</Text>
        </TouchableOpacity>

        <Text style={[styles.version, { color: C.muted }]}>SENAI Cursos • v1.0.0 • Neo-Future</Text>

        <View style={{ height: 32 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 217, 255, 0.1)',
    opacity: 0.3,
  },
  avatarLarge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 2,
    zIndex: 1,
  },
  avatarLargeText: { color: '#FFF', fontSize: 32, fontWeight: '800' },
  profileName: { color: '#FFF', fontSize: 22, fontWeight: '800', marginBottom: 4, zIndex: 1, letterSpacing: 0.5 },
  profileEmail: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 16, zIndex: 1 },
  profileStatsRow: { flexDirection: 'row', gap: 10, width: '100%', zIndex: 1 },
  statBadge: { flex: 1, paddingVertical: 12, paddingHorizontal: 8, alignItems: 'center' },
  statBadgeLabel: { fontSize: 10, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.2 },
  profileBadgesRow: { flexDirection: 'row', gap: 10 },
  profileBadge: { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  profileBadgeText: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  content: { padding: 20, gap: 16 },
  achievementsSection: {
    gap: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  achievementItem: {
    width: '32%',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
  },
  achievementIcon: { fontSize: 28 },
  achievementLabel: { fontSize: 11, fontWeight: '600', textAlign: 'center' },
  card: {
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  prefLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  prefIcon: { fontSize: 24 },
  prefLabel: { fontSize: 15, fontWeight: '600' },
  prefSub: { fontSize: 12, marginTop: 2 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  menuIcon: { fontSize: 22 },
  menuLabel: { fontSize: 15, fontWeight: '600' },
  menuSub: { fontSize: 12, marginTop: 2 },
  menuArrow: { fontSize: 20, fontWeight: '700', marginLeft: 8 },
  logoutBtn: {
    borderRadius: 16,
    borderWidth: 2,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: { fontSize: 16, fontWeight: '800', letterSpacing: 0.5 },
  version: { textAlign: 'center', fontSize: 11, marginTop: 8, fontWeight: '500', letterSpacing: 0.2 },
});
