
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { 
  Home, 
  BookOpen, 
  Calendar, 
  FileText, 
  BarChart, 
  Settings,
  Users
} from "lucide-react";

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  
  // Define navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { to: "/", label: "Dashboard", icon: <Home size={20} /> }
    ];
    
    if (user?.role === "student") {
      return [
        ...commonItems,
        { to: "/courses", label: "My Courses", icon: <BookOpen size={20} /> },
        { to: "/quizzes", label: "Available Quizzes", icon: <FileText size={20} /> },
        { to: "/results", label: "My Results", icon: <BarChart size={20} /> },
      ];
    }
    
    if (user?.role === "lecturer") {
      return [
        ...commonItems,
        { to: "/courses", label: "My Courses", icon: <BookOpen size={20} /> },
        { to: "/quizzes/create", label: "Create Quiz", icon: <FileText size={20} /> },
        { to: "/quizzes/manage", label: "Manage Quizzes", icon: <Calendar size={20} /> },
        { to: "/results", label: "Student Results", icon: <BarChart size={20} /> },
      ];
    }
    
    if (user?.role === "admin") {
      return [
        ...commonItems,
        { to: "/users", label: "Manage Users", icon: <Users size={20} /> },
        { to: "/courses", label: "Manage Courses", icon: <BookOpen size={20} /> },
        { to: "/settings", label: "System Settings", icon: <Settings size={20} /> },
      ];
    }
    
    return commonItems;
  };
  
  const navItems = getNavItems();
  
  return (
    <aside className="hidden md:block w-64 bg-white border-r h-full">
      <div className="h-full flex flex-col">
        <div className="border-b h-16 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-quiz-primary">QuizPulse</h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-4 py-3 rounded-md transition-all",
                    isActive 
                      ? "bg-quiz-primary text-white font-medium" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t">
          <div className="px-4 py-2">
            <p className="text-sm text-gray-500">Logged in as</p>
            <p className="font-medium">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize mt-1">{user?.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
