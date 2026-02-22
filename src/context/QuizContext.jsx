import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import sampleQuestions from '../data/sampleQuiz.json';
import { defaultSession, loadState, saveState } from '../utils/storage';

const QuizContext = createContext(null);

function getAnswerLabel(index) {
  return ['A', 'B', 'C', 'D'][index];
}

export function QuizProvider({ children }) {
  const [questionBank, setQuestionBank] = useState(sampleQuestions);
  const [session, setSession] = useState(() => loadState() || { ...defaultSession, questions: sampleQuestions });

  useEffect(() => {
    saveState(session);
  }, [session]);

  const topics = useMemo(() => {
    const grouped = new Map();

    questionBank.forEach((q) => {
      const key = `${q.subject}::${q.topic}`;
      if (!grouped.has(key)) {
        grouped.set(key, {
          subject: q.subject,
          chapter: q.chapter,
          topic: q.topic,
          difficulty: q.difficulty,
          years: new Set(),
          notesLink: q.notesLink,
          videoLink: q.videoLink,
          totalQuestions: 0,
          completed: 0,
        });
      }
      const entry = grouped.get(key);
      entry.totalQuestions += 1;
      entry.years.add(q.year);
      if (session.answers[q.id]) {
        entry.completed += 1;
      }
    });

    return [...grouped.values()].map((topic) => ({ ...topic, years: [...topic.years].sort() }));
  }, [questionBank, session.answers]);

  const startQuiz = ({ topic, year, questionCount, simulation = false, timeLimitMinutes = 30 }) => {
    let filtered = [...questionBank];
    if (topic) filtered = filtered.filter((q) => q.topic === topic);
    if (year) filtered = filtered.filter((q) => String(q.year) === String(year));

    if (questionCount && questionCount < filtered.length) {
      filtered = filtered.slice(0, questionCount);
    }

    setSession({
      ...defaultSession,
      questions: filtered,
      simulation: { enabled: simulation, questionCount: questionCount || filtered.length, timeLimitMinutes },
      startTime: Date.now(),
    });
  };

  const submitAnswer = (questionId, optionIndex) => {
    setSession((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: getAnswerLabel(optionIndex) },
    }));
  };

  const toggleReview = (questionId) => {
    setSession((prev) => ({
      ...prev,
      reviewFlags: { ...prev.reviewFlags, [questionId]: !prev.reviewFlags[questionId] },
    }));
  };

  const moveToQuestion = (index) => {
    setSession((prev) => ({ ...prev, currentIndex: Math.max(0, Math.min(index, prev.questions.length - 1)) }));
  };

  const completeQuiz = () => {
    setSession((prev) => ({ ...prev, completed: true }));
  };

  const importQuestionBank = (questions) => {
    setQuestionBank(questions);
    setSession((prev) => ({ ...prev, questions }));
  };

  const value = {
    questionBank,
    session,
    topics,
    startQuiz,
    submitAnswer,
    toggleReview,
    moveToQuestion,
    completeQuiz,
    importQuestionBank,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used inside QuizProvider');
  }
  return context;
}
