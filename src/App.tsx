import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import DashboardHome from './Dashboard';
import AdminDashboard from './MetaNestHome/Admin/AdminDashboard';
import ResidentDashboard from './MetaNestHome/Resident/ResidentDashboard';
import LayoutDashboard from './MetaNestLayout/LayoutDashboard';

function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<DashboardHome />} />
      <Route path="/dashboard" element={<DashboardHome />} />
      <Route path="/home/admin" element={<AdminDashboard onBack={() => navigate('/home')} />} />
      <Route
        path="/home/resident"
        element={<ResidentDashboard onBack={() => navigate('/home')} />}
      />
      <Route path="/layout" element={<LayoutDashboard onBack={() => navigate('/home')} />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;
