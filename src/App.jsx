import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./features/auth/pages/LoginPage.jsx";
import DashboardPage from "./features/dashboard/pages/DashboardPage.jsx";
import MyReportsPage from "./features/reports/pages/MyReportsPage.jsx";
import ReportWizardPage from "./features/reports/pages/ReportWizardPage.jsx";
import ReportDetailPage from "./features/reports/pages/ReportDetailPage.jsx";
import ApprovalsInboxPage from "./features/approvals/pages/ApprovalsInboxPage.jsx";
import FinanceQueuePage from "./features/finance/pages/FinanceQueuePage.jsx";

function Protected({ children }) {
  const token = useSelector((s) => s.auth.token);
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-4 py-2 flex gap-4">
        <Link to="/" className="font-medium">Reimburse</Link>
        <Link to="/reports" className="text-sm text-gray-700">My Reports</Link>
        <Link to="/approvals" className="text-sm text-gray-700">Approvals</Link>
        <Link to="/finance" className="text-sm text-gray-700">Finance</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Protected><DashboardPage /></Protected>} />
        <Route path="/reports" element={<Protected><MyReportsPage /></Protected>} />
        <Route path="/reports/:id" element={<Protected><ReportDetailPage /></Protected>} />
        <Route path="/reports/:id/edit" element={<Protected><ReportWizardPage /></Protected>} />
        <Route path="/approvals" element={<Protected><ApprovalsInboxPage /></Protected>} />
        <Route path="/finance" element={<Protected><FinanceQueuePage /></Protected>} />
      </Routes>
    </div>
  );
}
