import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import PortalShell from './components/PortalShell';
import SiteMotionProvider from './components/SiteMotionProvider';
import RouteEffects from './components/RouteEffects';
import PlaygroundPage from './pages/PlaygroundPage';
import ResourcesPage from './pages/ResourcesPage';
import LearningHubPage from './pages/LearningHubPage';
import LandingPage from './pages/LandingPage';
import PortalHomePage from './pages/PortalHomePage';
import SignupPage from './pages/SignupPage';
import AboutPage from './pages/AboutPage';
import FieldGuidePage from './pages/FieldGuidePage';
import CurriculumPage from './pages/CurriculumPage';
import ContactPage from './pages/ContactPage';
import SourcesPage from './pages/SourcesPage';
import { ProgressProvider } from './state/ProgressContext';

function App() {
  return (
    <SiteMotionProvider><ProgressProvider>
      <Router><RouteEffects />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/playground" element={<PlaygroundPage />} /><Route path="/resources" element={<ResourcesPage />} /><Route path="/about" element={<AboutPage />} />
          <Route path="/field-guide" element={<FieldGuidePage />} />
          <Route path="/sources" element={<SourcesPage />} />
          <Route path="/portal" element={<PortalShell><PortalHomePage /></PortalShell>} />
          <Route path="/learn" element={<PortalShell><LearningHubPage /></PortalShell>} />
          <Route path="/progress" element={<PortalShell><PortalHomePage /></PortalShell>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ProgressProvider></SiteMotionProvider>
  );
}

export default App;
