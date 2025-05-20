
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="px-4 py-3 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              className="md:hidden mr-2" 
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            <h1 className="text-xl font-semibold text-quiz-primary">QuizPulse</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="relative"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-quiz-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-quiz-primary"></span>
              </span>
            </Button>
            
            <div className="hidden md:flex items-center gap-2">
              <div className="bg-quiz-primary text-white rounded-full p-2">
                <User size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={logout}
              className="hidden md:inline-flex"
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden absolute w-full bg-white z-50 border-b shadow-lg transition-all duration-300",
        isMobileMenuOpen ? "max-h-64" : "max-h-0 invisible"
      )}>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b">
            <div className="bg-quiz-primary text-white rounded-full p-2">
              <User size={16} />
            </div>
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
          
          <ul className="space-y-3">
            <li>
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={logout}
              >
                Log Out
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
