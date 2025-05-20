
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import StudentDashboard from "./dashboards/StudentDashboard";
import LecturerDashboard from "./dashboards/LecturerDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";
import { TabView } from "@/components/TabView";
import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
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
  const fallbackTabs = [
    {
      id: "welcome",
      label: "Welcome",
      content: (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-medium mb-4">Welcome to QuizPulse</h2>
            <p>
              This is an online quiz management system for students, lecturers, and administrators.
              Please log in with the appropriate credentials to access your dashboard.
            </p>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "info",
      label: "Information",
      content: (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-medium mb-4">About QuizPulse</h2>
            <p>
              QuizPulse allows students to take quizzes, lecturers to create and manage quizzes,
              and administrators to oversee the system. Please contact support if you're having
              trouble accessing your account.
            </p>
          </CardContent>
        </Card>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <TabView tabs={fallbackTabs} defaultTab="welcome" />
    </div>
  );
};

export default Dashboard;
