import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import PortalShell from './components/PortalShell';
import PortalHomePage from './pages/PortalHomePage';
import { ProgressProvider } from './state/ProgressContext';

function App() {
  return (
    <ProgressProvider>
      <Router>
        <PortalShell>
          <Routes>
            <Route path="/" element={<PortalHomePage />} />
            <Route path="/learn" element={<PortalHomePage />} />
            <Route path="/progress" element={<PortalHomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PortalShell>
      </Router>
    </ProgressProvider>
  );
}

export default App;