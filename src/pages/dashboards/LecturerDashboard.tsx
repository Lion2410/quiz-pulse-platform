
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart, BookOpen, Clock, FileText, Plus, Users } from "lucide-react";
import { MOCK_QUIZZES, MOCK_COURSES, MOCK_ENROLLMENTS, MOCK_ATTEMPTS, Lecturer } from "@/models/types";

const LecturerDashboard: React.FC = () => {
  const { user } = useAuth();
  // Fix the type casting issue by safely accessing staffId
  const staffId = user?.role === "lecturer" ? (user as Lecturer).staffId : "";
  
  // Get courses for this lecturer
  const lecturerCourses = MOCK_COURSES.filter(
    course => course.lecturerId === user?.id
  );
  
  // Get quizzes for lecturer's courses
  const lecturerQuizzes = MOCK_QUIZZES.filter(quiz => {
    return lecturerCourses.some(course => course.id === quiz.courseId);
  });
  
  // Get active quizzes
  const activeQuizzes = lecturerQuizzes.filter(quiz => {
    const now = new Date();
    return quiz.isActive && quiz.startTime <= now && quiz.endTime >= now;
  });
  
  // Get total students enrolled in lecturer's courses
  const enrolledStudentsCount = new Set(
    MOCK_ENROLLMENTS
      .filter(enrollment => lecturerCourses.some(course => course.id === enrollment.courseId))
      .map(enrollment => enrollment.studentMatricNo)
  ).size;
  
  // Get recent quiz attempts
  const recentAttempts = MOCK_ATTEMPTS.filter(attempt => {
    return lecturerQuizzes.some(quiz => quiz.id === attempt.quizId);
  }).sort((a, b) => b.attemptTime.getTime() - a.attemptTime.getTime()).slice(0, 5);

  return (
    <div className="container mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Lecturer Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
        </div>
        <Button asChild>
          <Link to="/quizzes/create">
            <Plus className="mr-2 h-4 w-4" />
            Create New Quiz
          </Link>
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">My Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookOpen className="mr-3 text-quiz-primary" />
              <div className="text-3xl font-bold">{lecturerCourses.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileText className="mr-3 text-quiz-secondary" />
              <div className="text-3xl font-bold">{lecturerQuizzes.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-3 text-quiz-accent" />
              <div className="text-3xl font-bold">{activeQuizzes.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Enrolled Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-3 text-quiz-warning" />
              <div className="text-3xl font-bold">{enrolledStudentsCount}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Active Quizzes</CardTitle>
            <CardDescription>
              Currently running quizzes for your courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeQuizzes.length > 0 ? (
              <div className="space-y-4">
                {activeQuizzes.map(quiz => {
                  const course = MOCK_COURSES.find(c => c.id === quiz.courseId);
                  return (
                    <div key={quiz.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{quiz.title}</h3>
                        <p className="text-sm text-gray-500">{course?.title} • {quiz.duration} mins</p>
                        <p className="text-xs text-gray-500">
                          Closes: {new Date(quiz.endTime).toLocaleString()}
                        </p>
                      </div>
                      <Button variant="outline" asChild>
                        <Link to={`/quizzes/manage/${quiz.id}`}>View Details</Link>
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500">No active quizzes at the moment.</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link to="/quizzes/create">Create New Quiz</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Attempts</CardTitle>
            <CardDescription>
              Latest quiz attempts by students
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentAttempts.length > 0 ? (
              <div className="space-y-4">
                {recentAttempts.map(attempt => {
                  const quiz = MOCK_QUIZZES.find(q => q.id === attempt.quizId);
                  return (
                    <div key={attempt.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium truncate max-w-[150px]">{quiz?.title}</h3>
                        <span className={`text-sm font-semibold px-2 py-1 rounded ${
                          attempt.score >= 70 ? "bg-green-100 text-green-800" : 
                          attempt.score >= 50 ? "bg-yellow-100 text-yellow-800" : 
                          "bg-red-100 text-red-800"
                        }`}>
                          {attempt.score}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Student: {attempt.studentMatricNo}
                      </p>
                      <p className="text-xs text-gray-500">
                        Taken on {new Date(attempt.attemptTime).toLocaleDateString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-6 text-center">
                <p className="text-gray-500">No recent quiz attempts.</p>
              </div>
            )}
            
            {recentAttempts.length > 0 && (
              <div className="mt-4 text-center">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/results">View All Results</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LecturerDashboard;
