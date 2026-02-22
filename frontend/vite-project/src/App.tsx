import {BrowserRouter,Routes,Route}  from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/DashBoard";
import Register from "./pages/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoutes";
import AdminRoute from "./routes/AdminRoutes";
import UsersPage from "./pages/UsersPage";
import ProjectsPage from "./pages/ProjectPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import InvitePage from "./pages/InvitePage";


interface AppProps {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

function App({ toggleTheme, mode }: AppProps) {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} theme={mode} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard toggleTheme={toggleTheme} mode={mode} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <UsersPage toggleTheme={toggleTheme} mode={mode} />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectsPage toggleTheme={toggleTheme} mode={mode} />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/invite"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <InvitePage />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;