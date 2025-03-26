
import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import Navigation from "@/components/Navigation";

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <ClerkSignUp 
            path="/sign-up" 
            routing="path" 
            signInUrl="/sign-in"
            appearance={{
              elements: {
                footerAction: "hidden",
                card: "shadow-lg"
              }
            }}
            afterSignUpUrl="/"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
