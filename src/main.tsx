import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './styles/landing.css';
import './styles/studio.css';
import './styles/homepage-bold.css';
import './styles/reference-inspired.css';
import './styles/features.css';
import './styles/dark.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);



