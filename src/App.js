import { Routes, Route, useLocation } from 'react-router-dom';
import Search from './pages/Search';
import User from './pages/User';
import { AnimatePresence } from 'framer-motion'

function App() {
  const location = useLocation();

  return (
    <main>
      <AnimatePresence initial={true} mode='wait'>
        <Routes location={location} key={location.key}>
          <Route path='/' element={<Search />} />
          <Route path='/user/:login?' element={<User />} />
        </Routes>
      </AnimatePresence>
    </main>
  );
}

export default App;
