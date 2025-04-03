
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PageNavigationProps {
  onContinue: () => void;
  disableContinue: boolean;
}

const PageNavigation = ({ onContinue, disableContinue }: PageNavigationProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/quotation/client")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Client Info
      </Button>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground opacity-50 flex items-center justify-center text-sm font-medium">1</div>
          <span className="ml-2 text-muted-foreground">Client Info</span>
        </div>
        <div className="h-px w-8 bg-border"></div>
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">2</div>
          <span className="ml-2 font-medium">Line Items</span>
        </div>
        <div className="h-px w-8 bg-border"></div>
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">3</div>
          <span className="ml-2 text-muted-foreground">Export</span>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={onContinue} disabled={disableContinue}>
          Continue to Export
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PageNavigation;
