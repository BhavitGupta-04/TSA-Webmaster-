import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import PortalShell from './components/PortalShell';
import SiteMotionProvider from './components/SiteMotionProvider';
import RouteEffects from './components/RouteEffects';
import AskSignal from './components/AskSignal';
import CartDrawer from './components/CartDrawer';
import PlaygroundPage from './pages/PlaygroundPage';
import ResourcesPage from './pages/ResourcesPage';
const LearningHubPage = lazy(() => import('./pages/LearningHubPage'));
const LessonQuizPage = lazy(() => import('./pages/LessonQuizPage'));
const LearningReferencesPage = lazy(() => import('./pages/LearningReferencesPage'));
import LandingPage from './pages/LandingPage';
import PortalHomePage from './pages/PortalHomePage';
import SignupPage from './pages/SignupPage';
import AboutPage from './pages/AboutPage';
import FieldGuidePage from './pages/FieldGuidePage';
import CurriculumPage from './pages/CurriculumPage';
import ContactPage from './pages/ContactPage';
import SourcesPage from './pages/SourcesPage';
import ReadingListPage from './pages/ReadingListPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmedPage from './pages/OrderConfirmedPage';
import { ProgressProvider } from './state/ProgressContext';
import { CartProvider } from './state/CartProvider';

function App() {
  return (
    <SiteMotionProvider><ProgressProvider><CartProvider>
      <Router><RouteEffects />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/field-guide" element={<FieldGuidePage />} />
          <Route path="/sources" element={<SourcesPage />} />
          <Route path="/reading-list" element={<ReadingListPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmed" element={<OrderConfirmedPage />} />
          <Route path="/portal" element={<PortalShell><PortalHomePage /></PortalShell>} />
          <Route path="/learn" element={<PortalShell><Suspense fallback={<div className="academy-page" role="status">Loading your lesson...</div>}><LearningHubPage /></Suspense></PortalShell>} />
          <Route path="/learn/references" element={<PortalShell><Suspense fallback={<div className="academy-page" role="status">Loading video references...</div>}><LearningReferencesPage /></Suspense></PortalShell>} />
          <Route path="/learn/:lessonId/quiz" element={<PortalShell><Suspense fallback={<div className="academy-page" role="status">Loading your quiz...</div>}><LessonQuizPage /></Suspense></PortalShell>} />
          <Route path="/progress" element={<PortalShell><PortalHomePage /></PortalShell>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <CartDrawer />
        <AskSignal />
      </Router>
    </CartProvider></ProgressProvider></SiteMotionProvider>
  );
}

export default App;
