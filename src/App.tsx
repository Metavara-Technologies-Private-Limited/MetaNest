import type { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardHome from './Dashboard';
import RoleSelection from './pages/Login/RoleSelection';
import MobileLogin from './pages/Login/MobileLogin';
import OtpVerification from './pages/Login/OtpVerification';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ResidentDashboard from './pages/ResidentDashboard/ResidentDashboard';
import SelectFlat from './pages/ResidentDashboard/SelectFlat';
import { useAppSelector } from './redux/hooks';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  return accessToken ? children : <Navigate to="/login" replace />;
}

function LoginEntryRoute() {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const role = useAppSelector((state) => state.auth.role);

  if (accessToken && role === 'admin') return <Navigate to="/admin" replace />;
  if (accessToken && role === 'resident') return <Navigate to="/resident" replace />;
  return <RoleSelection />;
}

function LoginStepRoute({ children }: { children: ReactNode }) {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const role = useAppSelector((state) => state.auth.role);

  if (accessToken && role === 'admin') return <Navigate to="/admin" replace />;
  if (accessToken && role === 'resident') return <Navigate to="/resident" replace />;
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginEntryRoute />} />
      <Route path="/login/:role/mobile" element={<LoginStepRoute><MobileLogin /></LoginStepRoute>} />
      <Route path="/login/:role/otp" element={<LoginStepRoute><OtpVerification /></LoginStepRoute>} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resident/select-flat"
        element={
          <ProtectedRoute>
            <SelectFlat />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resident"
        element={
          <ProtectedRoute>
            <ResidentDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
