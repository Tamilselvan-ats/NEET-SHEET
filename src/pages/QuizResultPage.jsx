import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function QuizResultPage() {
  const { state } = useApp();
  const result = state.lastResult;
  if (!result) return <div className="max-w-4xl mx-auto p-4"><div className="card">No results yet.</div></div>;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-3">
      <div className="card">
        <h2 className="text-xl font-semibold">Quiz Result</h2>
        <p>Score: {result.score}/{result.total}</p>
        <p>Correct: {result.correct} | Incorrect: {result.incorrect}</p>
        <p className="font-medium mt-2">Weak Topics:</p>
        <ul className="list-disc pl-5">{result.weakTopics.length ? result.weakTopics.map((w) => <li key={w}>{w}</li>) : <li>None</li>}</ul>
      </div>
      <div className="card space-y-2">
        {result.details.map((d) => (
          <div key={d.id} className={`p-3 rounded border ${d.isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
            <p className="font-medium">{d.question}</p>
            <p>Your: {d.chosen || '-'} | Correct: {d.answer}</p>
            <div className="flex gap-3 text-sm">
              {d.notesLink && <a className="text-brand-600" href={d.notesLink} target="_blank" rel="noreferrer">Notes</a>}
              {d.videoLink && <a className="text-brand-600" href={d.videoLink} target="_blank" rel="noreferrer">Video</a>}
            </div>
          </div>
        ))}
      </div>
      <Link className="btn-primary" to="/quiz/setup">Start New Quiz</Link>
    </div>
  );
}
