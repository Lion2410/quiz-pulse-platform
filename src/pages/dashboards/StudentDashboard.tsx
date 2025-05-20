
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart, BookOpen, Clock, FileText } from "lucide-react";
import { MOCK_QUIZZES, MOCK_COURSES, MOCK_ENROLLMENTS, MOCK_ATTEMPTS, Student } from "@/models/types";

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  // Fix the type casting issue by safely accessing matricNo
  const matricNo = user?.role === "student" ? (user as Student).matricNo : "";
  
  // Get enrolled courses for this student
  const enrolledCourses = MOCK_ENROLLMENTS.filter(
    enrollment => enrollment.studentMatricNo === matricNo
  ).map(enrollment => {
    return MOCK_COURSES.find(course => course.id === enrollment.courseId);
  }).filter(Boolean);
  
  // Get active quizzes for enrolled courses
  const activeQuizzes = MOCK_QUIZZES.filter(quiz => {
    const courseId = enrolledCourses.find(course => course?.id === quiz.courseId)?.id;
    const now = new Date();
    return courseId && quiz.isActive && quiz.startTime <= now && quiz.endTime >= now;
  });
  
  // Get recent attempts
  const recentAttempts = MOCK_ATTEMPTS.filter(
    attempt => attempt.studentMatricNo === matricNo
  ).sort((a, b) => b.attemptTime.getTime() - a.attemptTime.getTime()).slice(0, 3);

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookOpen className="mr-3 text-quiz-primary" />
              <div className="text-3xl font-bold">{enrolledCourses.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileText className="mr-3 text-quiz-secondary" />
              <div className="text-3xl font-bold">{activeQuizzes.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completed Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart className="mr-3 text-quiz-accent" />
              <div className="text-3xl font-bold">{recentAttempts.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Next Quiz Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-3 text-quiz-warning" />
              <div className="text-lg font-semibold">
                {activeQuizzes.length > 0 ? (
                  <span>
                    {new Date(activeQuizzes[0].endTime).toLocaleDateString()}
                  </span>
                ) : (
                  <span className="text-gray-500">No upcoming quizzes</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Available Quizzes</CardTitle>
            <CardDescription>
              Quizzes currently open for attempt
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
                      <Button asChild>
                        <Link to={`/quizzes/${quiz.id}`}>Start Quiz</Link>
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500">No active quizzes available at the moment.</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link to="/quizzes">View All Quizzes</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Results</CardTitle>
            <CardDescription>
              Your latest quiz attempts
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
                        <h3 className="font-medium">{quiz?.title}</h3>
                        <span className={`text-sm font-semibold px-2 py-1 rounded ${
                          attempt.score >= 70 ? "bg-green-100 text-green-800" : 
                          attempt.score >= 50 ? "bg-yellow-100 text-yellow-800" : 
                          "bg-red-100 text-red-800"
                        }`}>
                          {attempt.score}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Attempted on {new Date(attempt.attemptTime).toLocaleDateString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-6 text-center">
                <p className="text-gray-500">No quiz attempts yet.</p>
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

export default StudentDashboard;
