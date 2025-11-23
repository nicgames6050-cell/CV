import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import BrendanPage from './pages/BrendanPage';
import EthanPage from './pages/EthanPage';
import JacksonPage from './pages/JacksonPage';
import HunterPage from './pages/HunterPage';
import BrysonPage from './pages/BrysonPage';
import NicPage from './pages/NicPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/brendan" element={<BrendanPage />} />
        <Route path="/ethan" element={<EthanPage />} />
        <Route path="/jackson" element={<JacksonPage />} />
        <Route path="/hunter" element={<HunterPage />} />
        <Route path="/bryson" element={<BrysonPage />} />
        <Route path="/nic" element={<NicPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
