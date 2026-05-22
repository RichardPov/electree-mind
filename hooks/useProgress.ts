"use client";
import { useState, useEffect, useCallback } from "react";

export type Progress = {
  lessons: Record<string, boolean[]>;
  certResults: Record<string, { passed: boolean; score: number; date: string }>;
  dailyAnswered: Record<string, boolean>;
  dailyCorrect: Record<string, boolean>;
  points: number;
  streak: number;
};

export const SEED: Progress = {
  lessons: {
    elektrina: [true, true, true, true, true, true, true, true],
    fve: [true, true, true, false, false, false],
    plyn: [true, true, false, false, false],
    retence: [true, true, true, true, true, false, false],
    systemy: [],
  },
  certResults: {
    "produktovy-specialista": { passed: true, score: 3, date: "2026-05-10" },
  },
  dailyAnswered: {},
  dailyCorrect: {},
  points: 2190,
  streak: 14,
};

const KEY = "electree-progress-v2";

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(SEED);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Progress>;
        setProgress((prev) => ({ ...prev, ...parsed }));
      }
    } catch {}
  }, []);

  const markLesson = useCallback((courseId: string, idx: number) => {
    setProgress((prev) => {
      const arr = [...(prev.lessons[courseId] ?? [])];
      if (arr[idx]) return prev;
      arr[idx] = true;
      const next = { ...prev, lessons: { ...prev.lessons, [courseId]: arr }, points: prev.points + 50 };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const saveCert = useCallback((certId: string, passed: boolean, score: number) => {
    setProgress((prev) => {
      const next = {
        ...prev,
        certResults: {
          ...prev.certResults,
          [certId]: { passed, score, date: new Date().toISOString().split("T")[0] },
        },
        points: passed && !prev.certResults[certId]?.passed ? prev.points + 500 : prev.points,
      };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const answerDaily = useCallback((date: string, correct: boolean) => {
    setProgress((prev) => {
      if (prev.dailyAnswered[date]) return prev;
      const next = {
        ...prev,
        dailyAnswered: { ...prev.dailyAnswered, [date]: true },
        dailyCorrect: { ...prev.dailyCorrect, [date]: correct },
        points: correct ? prev.points + 150 : prev.points,
      };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const isDone = useCallback(
    (courseId: string, idx: number): boolean =>
      progress.lessons[courseId]?.[idx] ??
      (SEED.lessons[courseId as keyof typeof SEED.lessons]?.[idx] ?? false),
    [progress]
  );

  const countDone = useCallback(
    (courseId: string): number =>
      (progress.lessons[courseId] ?? SEED.lessons[courseId as keyof typeof SEED.lessons] ?? []).filter(Boolean).length,
    [progress]
  );

  return { progress, markLesson, saveCert, answerDaily, isDone, countDone };
}
