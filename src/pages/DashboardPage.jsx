import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function DashboardPage() {
  const { dashboard, state, startQuiz } = useApp();
  const navigate = useNavigate();

  const quickStart = () => {
    startQuiz({ questionCount: 30 });
    navigate('/quiz/play');
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="card"><p className="text-sm">Total Topics</p><p className="text-2xl font-bold">{dashboard.totalTopics}</p></div>
        <div className="card"><p className="text-sm">Completed Topics</p><p className="text-2xl font-bold">{dashboard.completedTopics}</p></div>
        <div className="card"><p className="text-sm">Overall Progress</p><p className="text-2xl font-bold">{dashboard.progress}%</p></div>
        <div className="card"><p className="text-sm">Last Quiz Score</p><p className="text-2xl font-bold">{state.lastResult ? `${state.lastResult.score}/${state.lastResult.total}` : '-'}</p></div>
      </div>
      <div className="card flex flex-wrap gap-3">
        <button className="btn-primary" onClick={quickStart}>Quick Start Quiz</button>
        <Link className="btn border border-slate-300" to="/quiz/setup">Custom Quiz</Link>
        {state.activeQuiz && <Link className="btn border border-slate-300" to="/quiz/play">Resume Last Quiz</Link>}
      </div>
    </div>
  );
}
