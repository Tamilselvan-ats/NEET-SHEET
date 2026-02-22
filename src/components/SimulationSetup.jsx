import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

function SimulationSetup() {
  const { questionBank, startQuiz } = useQuiz();
  const navigate = useNavigate();
  const [questionCount, setQuestionCount] = useState(Math.min(30, questionBank.length));
  const [minutes, setMinutes] = useState(60);

  const launchSimulation = () => {
    startQuiz({ simulation: true, questionCount: Number(questionCount), timeLimitMinutes: Number(minutes) });
    navigate('/quiz');
  };

  return (
    <section className="card">
      <h2>Simulation / Test Mode</h2>
      <div className="form-grid">
        <label>
          Number of Questions
          <input
            type="number"
            min="1"
            max={questionBank.length}
            value={questionCount}
            onChange={(e) => setQuestionCount(e.target.value)}
          />
        </label>
        <label>
          Timer (minutes)
          <input type="number" min="5" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
        </label>
      </div>
      <button onClick={launchSimulation}>Start Simulation</button>
    </section>
  );
}

export default SimulationSetup;
