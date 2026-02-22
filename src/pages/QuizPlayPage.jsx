import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCountdown } from '../hooks/useCountdown';
import { useApp } from '../context/AppContext';

export default function QuizPlayPage() {
  const { state, answerQuestion, jumpQuestion, toggleReview, submitQuiz } = useApp();
  const navigate = useNavigate();
  const quiz = state.activeQuiz;
  const left = useCountdown(quiz?.startedAt, quiz?.durationSec);

  useEffect(() => {
    if (quiz && left === 0) {
      submitQuiz();
      navigate('/quiz/result');
    }
  }, [left, quiz, submitQuiz, navigate]);

  if (!quiz || !quiz.questions.length) return <div className="max-w-4xl mx-auto p-4"><div className="card">No active quiz.</div></div>;

  const q = quiz.questions[quiz.index];

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-3">
      <div className="card flex justify-between"><span>Q {quiz.index + 1} / {quiz.questions.length}</span><span>Timer: {Math.floor(left / 60)}:{String(left % 60).padStart(2, '0')}</span></div>
      <div className="card space-y-3">
        <p className="font-medium">{q.question}</p>
        {q.image && <img src={q.image} alt={q.id} className="w-full max-h-80 object-contain border rounded" />}
        <div className="grid gap-2">
          {q.options.map((op, i) => {
            const label = ['A', 'B', 'C', 'D'][i];
            const active = quiz.answers[q.id] === label;
            return <button key={label} onClick={() => answerQuestion(q.id, i)} className={`btn border ${active ? 'bg-brand-600 text-white' : 'bg-white'}`}>{label}. {op}</button>;
          })}
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="btn border" disabled={quiz.index === 0} onClick={() => jumpQuestion(quiz.index - 1)}>Prev</button>
          <button className="btn border" onClick={() => toggleReview(q.id)}>{quiz.review[q.id] ? 'Unmark Review' : 'Mark Review'}</button>
          <button className="btn border" disabled={quiz.index === quiz.questions.length - 1} onClick={() => jumpQuestion(quiz.index + 1)}>Next</button>
          <button className="btn-primary ml-auto" onClick={() => { submitQuiz(); navigate('/quiz/result'); }}>Submit</button>
        </div>
      </div>
      <div className="card grid grid-cols-10 gap-2">
        {quiz.questions.map((item, idx) => <button key={item.id} onClick={() => jumpQuestion(idx)} className={`btn border ${quiz.answers[item.id] ? 'bg-emerald-500 text-white' : ''} ${quiz.review[item.id] ? 'ring-2 ring-amber-400' : ''}`}>{idx + 1}</button>)}
      </div>
    </div>
  );
}
