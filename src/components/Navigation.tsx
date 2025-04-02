
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CalculatorIcon, FileText, LogIn, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const { currentUser, signInWithGoogle, signOut } = useAuth();

  return (
    <header className="border-b sticky top-0 z-40 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-medium">
            Minimalist
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link 
              to="/quotation/client" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center"
            >
              <CalculatorIcon className="h-4 w-4 mr-1" />
              New Quotation
            </Link>
            <a 
              href="#features" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Features
            </a>
            <a 
              href="#about" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Contact
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {currentUser.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt="Profile" 
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <User className="h-5 w-5" />
                )}
                <span className="text-sm font-medium hidden md:inline">
                  {currentUser.displayName || currentUser.email}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={signOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Sign Out</span>
              </Button>
            </div>
          ) : (
            <Button 
              size="sm" 
              onClick={signInWithGoogle}
              className="flex items-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              Sign in with Google
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
