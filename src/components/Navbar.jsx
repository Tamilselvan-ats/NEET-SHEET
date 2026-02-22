import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) => `px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-brand-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}`;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto p-3 flex flex-wrap items-center gap-2">
        <h1 className="font-bold mr-auto">NEET 2026 Ultimate Tracker</h1>
        <NavLink to="/" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/tracker" className={linkClass}>Portion Tracker</NavLink>
        <NavLink to="/quiz/setup" className={linkClass}>Quiz</NavLink>
        <NavLink to="/pdf" className={linkClass}>PDF → Quiz</NavLink>
      </div>
    </header>
  );
}
