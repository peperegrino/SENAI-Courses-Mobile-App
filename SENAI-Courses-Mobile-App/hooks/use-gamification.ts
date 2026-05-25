import { useState, useCallback } from 'react';
import { ACHIEVEMENTS, GAMIFICATION_MILESTONES, Achievement } from '@/constants/achievements';

export interface GamificationState {
  points: number;
  level: number;
  streak: number;
  totalMinutesStudied: number;
  unlockedAchievements: Achievement[];
  coursesCompleted: number;
}

const POINTS_PER_LEVEL = 1000;

export function useGamification() {
  const [state, setState] = useState<GamificationState>({
    points: 0,
    level: 1,
    streak: 0,
    totalMinutesStudied: 0,
    unlockedAchievements: [],
    coursesCompleted: 0,
  });

  const addPoints = useCallback((points: number) => {
    setState((prev) => {
      const newPoints = prev.points + points;
      const newLevel = Math.floor(newPoints / POINTS_PER_LEVEL) + 1;
      return {
        ...prev,
        points: newPoints,
        level: newLevel,
      };
    });
  }, []);

  const addStreak = useCallback(() => {
    setState((prev) => ({
      ...prev,
      streak: prev.streak + 1,
      points: prev.points + GAMIFICATION_MILESTONES.DAILY_STREAK,
    }));
  }, []);

  const resetStreak = useCallback(() => {
    setState((prev) => ({
      ...prev,
      streak: 0,
    }));
  }, []);

  const addMinutesStudied = useCallback((minutes: number) => {
    setState((prev) => ({
      ...prev,
      totalMinutesStudied: prev.totalMinutesStudied + minutes,
      points: prev.points + Math.floor(minutes / 10) * 5,
    }));
  }, []);

  const completeCourse = useCallback(() => {
    setState((prev) => ({
      ...prev,
      coursesCompleted: prev.coursesCompleted + 1,
      points: prev.points + GAMIFICATION_MILESTONES.COURSE_COMPLETED,
    }));
    addPoints(GAMIFICATION_MILESTONES.COURSE_COMPLETED);
  }, [addPoints]);

  const unlockAchievement = useCallback((achievementId: string) => {
    const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
    if (achievement && !state.unlockedAchievements.find((a) => a.id === achievementId)) {
      setState((prev) => ({
        ...prev,
        unlockedAchievements: [...prev.unlockedAchievements, achievement],
        points: prev.points + GAMIFICATION_MILESTONES.ACHIEVEMENT_UNLOCK,
      }));
      addPoints(GAMIFICATION_MILESTONES.ACHIEVEMENT_UNLOCK);
    }
  }, [state.unlockedAchievements, addPoints]);

  const getNextLevelProgress = useCallback(() => {
    const currentLevelPoints = (state.level - 1) * POINTS_PER_LEVEL;
    const nextLevelPoints = state.level * POINTS_PER_LEVEL;
    const pointsInCurrentLevel = state.points - currentLevelPoints;
    const pointsNeededForNextLevel = nextLevelPoints - currentLevelPoints;
    return {
      current: pointsInCurrentLevel,
      needed: pointsNeededForNextLevel,
      progress: pointsInCurrentLevel / pointsNeededForNextLevel,
    };
  }, [state.points, state.level]);

  return {
    state,
    addPoints,
    addStreak,
    resetStreak,
    addMinutesStudied,
    completeCourse,
    unlockAchievement,
    getNextLevelProgress,
  };
}
