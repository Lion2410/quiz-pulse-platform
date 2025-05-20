
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import NotAuthorized from "@/pages/NotAuthorized";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<NotAuthorized />} />
            
            {/* Protected routes */}
            <Route element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              {/* Common routes available to all authenticated users */}
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            
            {/* Student routes */}
            <Route element={<AppLayout requiredRole="student" />}>
              <Route path="/courses" element={<Dashboard />} />
              <Route path="/quizzes" element={<Dashboard />} />
              <Route path="/quizzes/:quizId" element={<Dashboard />} />
              <Route path="/results" element={<Dashboard />} />
            </Route>
            
            {/* Lecturer routes */}
            <Route element={<AppLayout requiredRole="lecturer" />}>
              <Route path="/courses" element={<Dashboard />} />
              <Route path="/quizzes/create" element={<Dashboard />} />
              <Route path="/quizzes/manage" element={<Dashboard />} />
              <Route path="/quizzes/manage/:quizId" element={<Dashboard />} />
              <Route path="/results" element={<Dashboard />} />
            </Route>
            
            {/* Admin routes */}
            <Route element={<AppLayout requiredRole="admin" />}>
              <Route path="/users" element={<Dashboard />} />
              <Route path="/courses" element={<Dashboard />} />
              <Route path="/settings" element={<Dashboard />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
