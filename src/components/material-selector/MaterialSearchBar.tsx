
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MaterialSearchBarProps {
  searchQuery: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export const MaterialSearchBar = ({ 
  searchQuery, 
  onChange, 
  onClear 
}: MaterialSearchBarProps) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search materials..."
        value={searchQuery}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8"
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full"
          onClick={onClear}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
