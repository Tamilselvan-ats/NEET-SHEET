const STORAGE_KEY = 'neet-tracker-v1';

export const defaultState = {
  trackerCompletion: {},
  trackerNotes: {},
  questionBank: [],
  uploadedQuizzes: [],
  quizAttempts: [],
  lastResult: null,
  activeQuiz: null
};

export const safeLoad = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
};

export const safeSave = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export { STORAGE_KEY };
