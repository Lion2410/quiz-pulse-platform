
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigate("/", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-quiz-background">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-quiz-primary mb-4">QuizPulse</h1>
        <p className="text-xl text-gray-600 mb-4">Online Quiz Management System</p>
        <div className="animate-spin h-12 w-12 border-4 border-quiz-primary border-t-transparent rounded-full mx-auto"></div>
      </div>
    </div>
  );
};

export default Index;
