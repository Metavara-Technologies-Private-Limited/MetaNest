import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardHome from './Dashboard';
import RoleSelection from './pages/Login/RoleSelection';
import MobileLogin from './pages/Login/MobileLogin';
import OtpVerification from './pages/Login/OtpVerification';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ResidentDashboard from './pages/ResidentDashboard/ResidentDashboard';
import SelectFlat from './pages/ResidentDashboard/SelectFlat';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardHome />} />
      <Route path="/login" element={<RoleSelection />} />
      <Route path="/login/:role/mobile" element={<MobileLogin />} />
      <Route path="/login/:role/otp" element={<OtpVerification />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/resident/select-flat" element={<SelectFlat />} />
      <Route path="/resident" element={<ResidentDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
