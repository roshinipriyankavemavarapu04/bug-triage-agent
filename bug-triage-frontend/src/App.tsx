import { Routes, Route } from "react-router-dom";
import {  Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Bugs from "./pages/Bugs";
import CreateBug from "./pages/CreateBug";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

  <Route path="/" element={<Navigate to="/login" replace />} />

  <Route path="/login" element={<Login />} />

  <Route path="/register" element={<Register />} />

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <MainLayout>
          <Dashboard />
        </MainLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/bugs"
    element={
      <ProtectedRoute>
        <MainLayout>
          <Bugs />
        </MainLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/create"
    element={
      <ProtectedRoute>
        <MainLayout>
          <CreateBug />
        </MainLayout>
      </ProtectedRoute>
    }
  />

</Routes>
  );
}

export default App;