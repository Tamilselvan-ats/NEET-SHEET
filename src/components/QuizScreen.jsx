import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import useTimer from '../hooks/useTimer';

function QuizScreen() {
  const { session, submitAnswer, toggleReview, moveToQuestion, completeQuiz } = useQuiz();
  const navigate = useNavigate();
  const { questions, currentIndex } = session;

  const secondsLeft = useTimer({
    enabled: session.simulation.enabled,
    startTime: session.startTime,
    minutes: session.simulation.timeLimitMinutes,
  });

  useEffect(() => {
    if (session.simulation.enabled && secondsLeft === 0 && questions.length) {
      completeQuiz();
      navigate('/results');
    }
  }, [secondsLeft, session.simulation.enabled, questions.length, completeQuiz, navigate]);

  if (!questions.length) {
    return (
      <section className="card">
        <h2>No active quiz</h2>
        <p>Start from Dashboard, Topic Tracker, or Simulation.</p>
      </section>
    );
  }

  const current = questions[currentIndex];

  return (
    <section className="card quiz-layout">
      <header className="inline space-between">
        <h2>Question {currentIndex + 1} / {questions.length}</h2>
        {session.simulation.enabled && <strong>⏱ {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}</strong>}
      </header>

      <div className="question-box">
        <p>{current.question}</p>
        {current.image && <img className="question-image" src={`/${current.image}`} alt={`Question ${current.id}`} />}
        <div className="options">
          {current.options.map((option, index) => {
            const optionLabel = ['A', 'B', 'C', 'D'][index];
            const selected = session.answers[current.id] === optionLabel;
            return (
              <button
                key={optionLabel}
                className={selected ? 'option selected' : 'option'}
                onClick={() => submitAnswer(current.id, index)}
              >
                {optionLabel}. {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="inline">
        <button onClick={() => moveToQuestion(currentIndex - 1)} disabled={currentIndex === 0}>Previous</button>
        <button onClick={() => toggleReview(current.id)}>{session.reviewFlags[current.id] ? 'Unmark Review' : 'Mark for Review'}</button>
        <button onClick={() => moveToQuestion(currentIndex + 1)} disabled={currentIndex === questions.length - 1}>Next</button>
      </div>

      <div className="question-grid">
        {questions.map((q, index) => (
          <button
            key={q.id}
            className={`grid-btn ${session.answers[q.id] ? 'answered' : ''} ${session.reviewFlags[q.id] ? 'review' : ''}`}
            onClick={() => moveToQuestion(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button onClick={() => { completeQuiz(); navigate('/results'); }}>Submit Quiz</button>
    </section>
  );
}

export default QuizScreen;
