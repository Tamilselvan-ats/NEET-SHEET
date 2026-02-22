import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import JsonUploader from './JsonUploader';
import PdfConverter from './PdfConverter';

function Dashboard() {
  const { questionBank, topics, startQuiz, session } = useQuiz();
  const navigate = useNavigate();

  const totalAnswered = Object.keys(session.answers).length;
  const completedTopics = topics.filter((topic) => topic.completed >= topic.totalQuestions).length;

  const quickStart = () => {
    startQuiz({ questionCount: 10, simulation: false });
    navigate('/quiz');
  };

  return (
    <section className="grid two-col">
      <article className="card">
        <h2>Overview</h2>
        <div className="stats">
          <div><strong>{questionBank.length}</strong><span>Questions</span></div>
          <div><strong>{topics.length}</strong><span>Topics</span></div>
          <div><strong>{totalAnswered}</strong><span>Answered</span></div>
          <div><strong>{completedTopics}</strong><span>Topics Completed</span></div>
        </div>
        <button onClick={quickStart}>Start Quick Quiz</button>
      </article>

      <article className="card">
        <h2>Import Quiz Data</h2>
        <p>Upload JSON from your Python PDF extraction script.</p>
        <JsonUploader />
      </article>

      <article className="card">
        <h2>Convert PDF to Quiz JSON</h2>
        <PdfConverter />
      </article>
    </section>
  );
}

export default Dashboard;
