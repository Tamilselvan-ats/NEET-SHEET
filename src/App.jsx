import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import TrackerPage from './pages/TrackerPage';
import QuizSetupPage from './pages/QuizSetupPage';
import QuizPlayPage from './pages/QuizPlayPage';
import QuizResultPage from './pages/QuizResultPage';
import PdfGeneratorPage from './pages/PdfGeneratorPage';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/tracker" element={<TrackerPage />} />
        <Route path="/quiz/setup" element={<QuizSetupPage />} />
        <Route path="/quiz/play" element={<QuizPlayPage />} />
        <Route path="/quiz/result" element={<QuizResultPage />} />
        <Route path="/pdf" element={<PdfGeneratorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
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
