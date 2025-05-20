
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Login: React.FC = () => {
  const [matricOrStaffId, setMatricOrStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!matricOrStaffId || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await login(matricOrStaffId, password);
      if (success) {
        navigate("/");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-quiz-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-quiz-primary mb-2">QuizPulse</h1>
          <p className="text-gray-600">Online Quiz Management System</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your matric number (for students), staff ID (for lecturers), or "admin" (for admin).
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="id">Matric No / Staff ID</Label>
                <Input
                  id="id"
                  type="text"
                  placeholder="Enter your ID"
                  value={matricOrStaffId}
                  onChange={(e) => setMatricOrStaffId(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use "password" for demo access
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-quiz-primary hover:bg-quiz-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo Login Credentials:</p>
          <p>Student: S12345 / password</p>
          <p>Lecturer: L001 / password</p>
          <p>Admin: admin / password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
