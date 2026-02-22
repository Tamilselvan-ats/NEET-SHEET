import { Link } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

function ResultScreen() {
  const { session } = useQuiz();
  const attempted = session.questions.length;

  const correct = session.questions.reduce((total, question) => {
    return total + (session.answers[question.id] === question.answer ? 1 : 0);
  }, 0);

  return (
    <section className="card">
      <h2>Results</h2>
      <p>Score: {correct} / {attempted}</p>

      <div className="review-list">
        {session.questions.map((question) => {
          const chosen = session.answers[question.id] || 'Not answered';
          const isCorrect = chosen === question.answer;
          return (
            <article key={question.id} className={isCorrect ? 'review-item correct' : 'review-item wrong'}>
              <p><strong>{question.id}</strong> {question.question}</p>
              <small>Your answer: {chosen} • Correct answer: {question.answer}</small>
            </article>
          );
        })}
      </div>

      <Link to="/">Back to Dashboard</Link>
    </section>
  );
}

export default ResultScreen;
