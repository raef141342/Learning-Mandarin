import Home from './page/belajar/Home';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Belajar from './page/belajar/Belajar';

// Tipe data profil user
export interface UserProfile {
  name: string;
  email: string;
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/belajar" element={<Belajar />} />
      </Routes>
    </HashRouter>
  );
}
