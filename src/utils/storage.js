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
const STORAGE_KEY = 'neet_quiz_state_v1';

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export const defaultSession = {
  questions: [],
  currentIndex: 0,
  answers: {},
  reviewFlags: {},
  simulation: {
    enabled: false,
    timeLimitMinutes: 30,
    questionCount: 10,
  },
  startTime: null,
  completed: false,
};
