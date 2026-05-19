import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import ApplicationPage from './pages/Application/ApplicationPage';
import PaymentPage from './pages/Payment/PaymentPage';

const AppRoutes = ({ handleShiftButton }) => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage handleShiftButton={handleShiftButton} />}
      />
      <Route
        path="/application"
        element={<ApplicationPage handleShiftButton={handleShiftButton} />}
      />
      <Route
        path="/payment"
        element={<PaymentPage />}
      />
      {/* Catch-all redirect to Login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
