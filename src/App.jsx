import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JeuYams from './pages/JeuYams';
import Jeu5000 from './pages/Jeu5000';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/yams" element={<JeuYams />} />
          <Route path="/5000" element={<Jeu5000 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
