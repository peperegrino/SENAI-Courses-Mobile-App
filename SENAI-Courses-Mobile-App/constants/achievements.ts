export type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: 'cyan' | 'pink' | 'purple' | 'green';
  unlockedAt?: number; // timestamp
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_course',
    name: 'Primeiro Passo',
    description: 'Completou seu primeiro curso',
    icon: '🎓',
    color: 'cyan',
  },
  {
    id: 'streak_7',
    name: 'Aprendiz Consistente',
    description: 'Estudou por 7 dias consecutivos',
    icon: '🔥',
    color: 'pink',
  },
  {
    id: 'streak_30',
    name: 'Mestre dos Estudos',
    description: 'Estudou por 30 dias consecutivos',
    icon: '👑',
    color: 'purple',
  },
  {
    id: 'five_courses',
    name: 'Colecionador',
    description: 'Completou 5 cursos diferentes',
    icon: '🎯',
    color: 'green',
  },
  {
    id: 'speedrun',
    name: 'Velocista',
    description: 'Completou um curso em menos de 7 dias',
    icon: '⚡',
    color: 'cyan',
  },
  {
    id: 'tech_master',
    name: 'Expert em Tecnologia',
    description: 'Completou 3 cursos de tecnologia',
    icon: '💻',
    color: 'pink',
  },
  {
    id: 'perfect_rating',
    name: 'Perfeição',
    description: 'Avaliou todos os seus cursos com 5 estrelas',
    icon: '⭐',
    color: 'purple',
  },
  {
    id: 'free_master',
    name: 'Economia',
    description: 'Completou 5 cursos gratuitos',
    icon: '💰',
    color: 'green',
  },
  {
    id: 'social_butterfly',
    name: 'Compartilhador',
    description: 'Compartilhou seu progresso 10 vezes',
    icon: '🦋',
    color: 'cyan',
  },
  {
    id: 'all_categories',
    name: 'Polímata',
    description: 'Estudou em todas as categorias',
    icon: '🌍',
    color: 'pink',
  },
];

export const GAMIFICATION_MILESTONES = {
  FIRST_LOGIN: 100,
  COURSE_ENROLLED: 50,
  COURSE_COMPLETED: 500,
  DAILY_STREAK: 25,
  ACHIEVEMENT_UNLOCK: 250,
  COURSE_REVIEWED: 75,
  PROFILE_UPDATED: 100,
};
