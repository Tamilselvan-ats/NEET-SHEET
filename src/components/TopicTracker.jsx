import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

function TopicTracker() {
  const { topics, startQuiz } = useQuiz();
  const navigate = useNavigate();
  const [yearFilter, setYearFilter] = useState('all');

  const availableYears = useMemo(() => {
    const yearSet = new Set();
    topics.forEach((topic) => topic.years.forEach((year) => yearSet.add(year)));
    return [...yearSet].sort((a, b) => b - a);
  }, [topics]);

  const visibleTopics = topics.filter((topic) =>
    yearFilter === 'all' ? true : topic.years.some((year) => String(year) === yearFilter),
  );

  return (
    <section className="card">
      <div className="inline space-between">
        <h2>Topic Tracker</h2>
        <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
          <option value="all">All Years</option>
          {availableYears.map((year) => (
            <option key={year} value={String(year)}>{year}</option>
          ))}
        </select>
      </div>

      <div className="topic-list">
        {visibleTopics.map((topic) => (
          <article className="topic-item" key={`${topic.subject}-${topic.topic}`}>
            <div>
              <h3>{topic.topic}</h3>
              <p>{topic.subject} • {topic.chapter}</p>
              <small>Difficulty: {topic.difficulty} • Progress: {topic.completed}/{topic.totalQuestions}</small>
            </div>
            <div className="topic-actions">
              <a href={topic.notesLink} target="_blank" rel="noreferrer">Notes</a>
              <a href={topic.videoLink} target="_blank" rel="noreferrer">Video</a>
              <button onClick={() => { startQuiz({ topic: topic.topic }); navigate('/quiz'); }}>Start Quiz</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TopicTracker;
