
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart, BookOpen, Calendar, Settings, Users } from "lucide-react";
import { MOCK_QUIZZES, MOCK_COURSES, MOCK_ENROLLMENTS, MOCK_ATTEMPTS } from "@/models/types";

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Count statistics
  const totalStudents = 2; // From MOCK_USERS in AuthContext
  const totalLecturers = 2; // From MOCK_USERS in AuthContext
  const totalCourses = MOCK_COURSES.length;
  const totalQuizzes = MOCK_QUIZZES.length;
  const totalAttempts = MOCK_ATTEMPTS.length;

  return (
    <div className="container mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
        </div>
        <Button asChild>
          <Link to="/settings">
            <Settings className="mr-2 h-4 w-4" />
            System Settings
          </Link>
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-3 text-quiz-primary" />
              <div className="text-3xl font-bold">{totalStudents}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Lecturers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-3 text-quiz-secondary" />
              <div className="text-3xl font-bold">{totalLecturers}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookOpen className="mr-3 text-quiz-accent" />
              <div className="text-3xl font-bold">{totalCourses}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="mr-3 text-quiz-warning" />
              <div className="text-3xl font-bold">{totalQuizzes}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart className="mr-3 text-quiz-error" />
              <div className="text-3xl font-bold">{totalAttempts}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Platform performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Server Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Online
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Database Connection</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Connected
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">School DB Sync</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Last sync: 2 hrs ago
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">System Load</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Normal (25%)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Storage Space</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  75% Available
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Manage platform settings and users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <Button className="justify-start" variant="outline" asChild>
                <Link to="/users">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Link>
              </Button>
              <Button className="justify-start" variant="outline" asChild>
                <Link to="/courses">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Manage Courses
                </Link>
              </Button>
              <Button className="justify-start" variant="outline" asChild>
                <Link to="/settings/sync">
                  <Calendar className="mr-2 h-4 w-4" />
                  Sync School Database
                </Link>
              </Button>
              <Button className="justify-start" variant="outline" asChild>
                <Link to="/settings/backup">
                  <Calendar className="mr-2 h-4 w-4" />
                  Database Backup
                </Link>
              </Button>
              <Button className="justify-start" variant="outline" asChild>
                <Link to="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  General Settings
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
