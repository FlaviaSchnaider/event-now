import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import EventCreated from './pages/EventCreated';
import VotePage from './pages/VotePage';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/evento-criado/:id" element={<EventCreated />} />
        <Route path="/event/:id" element={<VotePage />} />
        <Route path="/event/:id/results" element={<ResultsPage />} />
      </Routes>
    </div>
  );
}

export default App;