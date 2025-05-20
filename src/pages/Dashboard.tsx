
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import StudentDashboard from "./dashboards/StudentDashboard";
import LecturerDashboard from "./dashboards/LecturerDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Render specific dashboard based on user role
  if (user?.role === "student") {
    return <StudentDashboard />;
  }

  if (user?.role === "lecturer") {
    return <LecturerDashboard />;
  }

  if (user?.role === "admin") {
    return <AdminDashboard />;
  }

  // Fallback if role is not recognized
  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <p>Welcome to the QuizPulse platform!</p>
    </div>
  );
};

export default Dashboard;
