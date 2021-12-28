import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PostsPage, LoginPage, SignUpPage } from "./pages";

const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<PostsPage />} exact />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} exact />
      <Route path="/sign-up" element={<SignUpPage />} exact />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default useRoutes;
