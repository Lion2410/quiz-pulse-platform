
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotAuthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-xl text-gray-600 mb-8">
          You don't have permission to access this page.
        </p>
        <Button asChild>
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotAuthorized;
