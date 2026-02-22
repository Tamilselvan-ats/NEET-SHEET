import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { trackerData } from '../data/trackerData';
import { questionBank as defaultQuestions } from '../data/questionBank';
import { defaultState, safeLoad, safeSave } from '../utils/storage';

const AppContext = createContext(null);

const toLabel = (i) => ['A', 'B', 'C', 'D'][i];

export function AppProvider({ children }) {
  const [state, setState] = useState(() => {
    const loaded = safeLoad();
    return { ...loaded, questionBank: loaded.questionBank.length ? loaded.questionBank : defaultQuestions };
  });

  useEffect(() => safeSave(state), [state]);

  const allTopics = useMemo(() => trackerData.flatMap((s) => s.chapters.flatMap((c) => c.topics.map((t) => ({ ...t, subject: s.subject, chapter: c.chapter })))), []);

  const dashboard = useMemo(() => {
    const totalTopics = allTopics.length;
    const completedTopics = allTopics.filter((t) => state.trackerCompletion[t.id]).length;
    const progress = totalTopics ? Math.round((completedTopics / totalTopics) * 100) : 0;
    return { totalTopics, completedTopics, progress };
  }, [allTopics, state.trackerCompletion]);

  const toggleTopic = (topicId) => setState((p) => ({ ...p, trackerCompletion: { ...p.trackerCompletion, [topicId]: !p.trackerCompletion[topicId] } }));

  const setTopicNote = (topicId, note) => setState((p) => ({ ...p, trackerNotes: { ...p.trackerNotes, [topicId]: note } }));

  const startQuiz = (filters) => {
    const { subject, chapter, topic, year, difficulty, questionCount } = filters;
    let list = [...state.questionBank];
    if (subject) list = list.filter((q) => q.subject === subject);
    if (chapter) list = list.filter((q) => q.chapter === chapter);
    if (topic) list = list.filter((q) => q.topic === topic);
    if (year) list = list.filter((q) => String(q.year) === String(year));
    if (difficulty) list = list.filter((q) => q.difficulty === difficulty);
    const limited = list.slice(0, Math.min(180, Number(questionCount) || list.length));
    setState((p) => ({
      ...p,
      activeQuiz: {
        filters,
        questions: limited,
        index: 0,
        answers: {},
        review: {},
        startedAt: Date.now(),
        durationSec: 3 * 60 * 60
      }
    }));
  };

  const answerQuestion = (questionId, optionIndex) => setState((p) => ({
    ...p,
    activeQuiz: { ...p.activeQuiz, answers: { ...p.activeQuiz.answers, [questionId]: toLabel(optionIndex) } }
  }));

  const jumpQuestion = (index) => setState((p) => ({ ...p, activeQuiz: { ...p.activeQuiz, index } }));

  const toggleReview = (questionId) => setState((p) => ({
    ...p,
    activeQuiz: { ...p.activeQuiz, review: { ...p.activeQuiz.review, [questionId]: !p.activeQuiz.review[questionId] } }
  }));

  const submitQuiz = () => {
    const quiz = state.activeQuiz;
    if (!quiz) return;
    const details = quiz.questions.map((q) => {
      const chosen = quiz.answers[q.id] || '';
      return { ...q, chosen, isCorrect: chosen === q.answer };
    });
    const score = details.filter((d) => d.isCorrect).length;
    const weakTopics = [...new Set(details.filter((d) => !d.isCorrect).map((d) => `${d.subject} / ${d.topic}`))];
    const result = { score, total: details.length, correct: score, incorrect: details.length - score, weakTopics, details, at: Date.now() };
    setState((p) => ({
      ...p,
      quizAttempts: [result, ...p.quizAttempts].slice(0, 20),
      lastResult: result,
      activeQuiz: null
    }));
    return result;
  };

  const mergeQuestions = (incoming, source = 'upload') => {
    const cleaned = incoming.slice(0, 180).map((q, idx) => ({ ...q, id: q.id || `${source}-${Date.now()}-${idx}` }));
    setState((p) => ({
      ...p,
      questionBank: [...p.questionBank, ...cleaned],
      uploadedQuizzes: [...p.uploadedQuizzes, { id: `${source}-${Date.now()}`, count: cleaned.length, at: Date.now() }]
    }));
  };

  const resetAll = () => setState({ ...defaultState, questionBank: defaultQuestions });

  const value = { state, trackerData, dashboard, allTopics, toggleTopic, setTopicNote, startQuiz, answerQuestion, jumpQuestion, toggleReview, submitQuiz, mergeQuestions, resetAll };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
