import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Organizations from './components/Organizations';
import DonationForm from './components/DonationForm';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DonorDashboard from './pages/DonorDashboard';
import OrganizationDashboard from './pages/OrganizationDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/organizations" element={<Organizations />} />
              <Route path="/donate/:orgId" element={<DonationForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DonorDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/organization-dashboard"
                element={
                  <PrivateRoute>
                    <OrganizationDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin-dashboard"
                element={
                  <PrivateRoute>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;