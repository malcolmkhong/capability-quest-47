
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import Navigation from "@/components/Navigation";

const SignIn = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <ClerkSignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
