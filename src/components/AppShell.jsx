import { NavLink } from 'react-router-dom';

function AppShell({ children }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <h1>NEET Quiz Pro</h1>
        <p>Practice by topic • simulate tests • track mastery</p>
      </header>
      <nav className="nav-tabs">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/topics">Topic Tracker</NavLink>
        <NavLink to="/simulation">Simulation</NavLink>
        <NavLink to="/quiz">Quiz</NavLink>
      </nav>
      <main>{children}</main>
    </div>
  );
}

export default AppShell;
