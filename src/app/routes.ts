import { createBrowserRouter } from 'react-router';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import StudentProfile from './pages/StudentProfile';
import AIAnalysis from './pages/AIAnalysis';
import Analytics from './pages/Analytics';
import Alerts from './pages/Alerts';
import Interventions from './pages/Interventions';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'students', Component: Students },
      { path: 'student/:id', Component: StudentProfile },
      { path: 'ai-analysis', Component: AIAnalysis },
      { path: 'analytics', Component: Analytics },
      { path: 'alerts', Component: Alerts },
      { path: 'interventions', Component: Interventions },
    ],
  },
]);
