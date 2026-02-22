import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell';
import Dashboard from './components/Dashboard';
import TopicTracker from './components/TopicTracker';
import QuizScreen from './components/QuizScreen';
import SimulationSetup from './components/SimulationSetup';
import ResultScreen from './components/ResultScreen';

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/topics" element={<TopicTracker />} />
        <Route path="/simulation" element={<SimulationSetup />} />
        <Route path="/quiz" element={<QuizScreen />} />
        <Route path="/results" element={<ResultScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}

export default App;
