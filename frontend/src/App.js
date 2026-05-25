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

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/stores"
          element={<Stores />}
        />

        <Route
          path="/admin"
          element={
            <AdminDashboard />
          }
        />

        <Route
          path="/admin/stores"
          element={
            <AdminStores />
          }
        />

        <Route
          path="/admin/create-store"
          element={
            <CreateStore />
          }
        />

        <Route
          path="/admin/edit-store/:id"
          element={
            <EditStore />
          }
        />

        <Route
          path="/admin/users"
          element={
            <ManageUsers />
          }
        />

        <Route
          path="/admin/ratings"
          element={
            <Ratings />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;