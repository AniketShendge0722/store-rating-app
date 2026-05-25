import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Stores from "./pages/Stores";

import AdminDashboard from "./pages/admin/AdminDashboard";

import AdminStores from "./pages/admin/AdminStores";

import CreateStore from "./pages/admin/CreateStore";

import EditStore from "./pages/admin/EditStore";

import ManageUsers from "./pages/admin/ManageUsers";

import Ratings from "./pages/admin/Ratings";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />



        {/* USER ROUTES */}

        <Route
          path="/stores"
          element={
            <ProtectedRoute>
              <Stores />
            </ProtectedRoute>
          }
        />



        {/* ADMIN ROUTES */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/stores"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminStores />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-store"
          element={
            <ProtectedRoute role="ADMIN">
              <CreateStore />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-store/:id"
          element={
            <ProtectedRoute role="ADMIN">
              <EditStore />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="ADMIN">
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/ratings"
          element={
            <ProtectedRoute role="ADMIN">
              <Ratings />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;