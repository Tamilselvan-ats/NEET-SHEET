import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function QuizSetupPage() {
  const { state, startQuiz } = useApp();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ subject: '', chapter: '', topic: '', year: '', difficulty: '', questionCount: 30 });

  const meta = useMemo(() => ({
    subjects: [...new Set(state.questionBank.map((q) => q.subject))],
    chapters: [...new Set(state.questionBank.filter((q) => !filters.subject || q.subject === filters.subject).map((q) => q.chapter))],
    topics: [...new Set(state.questionBank.filter((q) => (!filters.subject || q.subject === filters.subject) && (!filters.chapter || q.chapter === filters.chapter)).map((q) => q.topic))],
    years: [...new Set(state.questionBank.map((q) => q.year))].sort((a, b) => b - a),
    difficulties: ['Easy', 'Medium', 'Hard']
  }), [state.questionBank, filters.subject, filters.chapter]);

  const setField = (k, v) => setFilters((p) => ({ ...p, [k]: v }));

  const onStart = () => {
    startQuiz(filters);
    navigate('/quiz/play');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="card space-y-3">
        <h2 className="font-semibold text-lg">Start Quiz</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <select value={filters.subject} onChange={(e) => setField('subject', e.target.value)}><option value="">All Subjects</option>{meta.subjects.map((v) => <option key={v}>{v}</option>)}</select>
          <select value={filters.chapter} onChange={(e) => setField('chapter', e.target.value)}><option value="">All Chapters</option>{meta.chapters.map((v) => <option key={v}>{v}</option>)}</select>
          <select value={filters.topic} onChange={(e) => setField('topic', e.target.value)}><option value="">All Topics</option>{meta.topics.map((v) => <option key={v}>{v}</option>)}</select>
          <select value={filters.year} onChange={(e) => setField('year', e.target.value)}><option value="">All Years</option>{meta.years.map((v) => <option key={v}>{v}</option>)}</select>
          <select value={filters.difficulty} onChange={(e) => setField('difficulty', e.target.value)}><option value="">All Difficulties</option>{meta.difficulties.map((v) => <option key={v}>{v}</option>)}</select>
          <input type="number" min="1" max="180" value={filters.questionCount} onChange={(e) => setField('questionCount', e.target.value)} />
        </div>
        <button className="btn-primary" onClick={onStart}>Start</button>
      </div>
    </div>
  );
}
