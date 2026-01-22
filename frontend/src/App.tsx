import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import { Sidebar } from "./components/Sidebar";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen w-screen bg-gray-100">
        <Routes>
          {/* Auth Routes: No Sidebar */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {/* Main App Routes: With Sidebar */}
          <Route 
            path="/dashboard" 
            element={
              <div className="flex w-full">
                <Sidebar />
                <main className="flex-1 overflow-auto">
                  <Dashboard />
                </main>
              </div>
            } 
          />

          {/* Redirect root to signin or dashboard */}
          <Route path="/" element={<Navigate to="/signin" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;