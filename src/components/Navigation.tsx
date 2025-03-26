
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CalculatorIcon, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useUser, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

const Navigation = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

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
              to="/quotation" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center"
            >
              <CalculatorIcon className="h-4 w-4 mr-1" />
              Quotation
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
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-sm hidden md:inline-block">
                {user?.primaryEmailAddress?.emailAddress}
              </span>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="outline" size="sm">
                  Log In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Sign Up</Button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
