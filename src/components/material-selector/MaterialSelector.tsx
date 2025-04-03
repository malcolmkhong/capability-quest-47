
import { useState, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  getAllMaterials, 
  getMaterialsByCategory, 
  searchMaterials, 
  Material 
} from "@/utils/materialDatabase";
import { MaterialSearchBar } from "./MaterialSearchBar";
import { CategoryFilter } from "./CategoryFilter";
import { MaterialsTable } from "./MaterialsTable";
import { formatCurrency } from "./utils";

interface MaterialSelectorProps {
  onSelectMaterial: (material: Material) => void;
  selectedCategory?: string;
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  buttonText?: string;
}

const MaterialSelector = ({ 
  onSelectMaterial, 
  selectedCategory, 
  buttonVariant = "outline",
  buttonText = "Select Material" 
}: MaterialSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>(selectedCategory || "all_categories");
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Initialize with all materials or category-filtered materials
    const initialMaterials = selectedCategory 
      ? getMaterialsByCategory(selectedCategory)
      : getAllMaterials();
      
    setMaterials(initialMaterials);
    setFilteredMaterials(initialMaterials);
  }, [selectedCategory]);
  
  useEffect(() => {
    // When category filter changes
    if (categoryFilter && categoryFilter !== "all_categories") {
      setFilteredMaterials(getMaterialsByCategory(categoryFilter));
    } else {
      setFilteredMaterials(getAllMaterials());
    }
  }, [categoryFilter]);
  
  useEffect(() => {
    // When search query changes
    if (searchQuery.trim() === "") {
      // If no search query, show category-filtered or all materials
      if (categoryFilter && categoryFilter !== "all_categories") {
        setFilteredMaterials(getMaterialsByCategory(categoryFilter));
      } else {
        setFilteredMaterials(getAllMaterials());
      }
    } else {
      // If there's a search query, search within current category filter
      const searchResults = searchMaterials(searchQuery);
      
      if (categoryFilter && categoryFilter !== "all_categories") {
        setFilteredMaterials(
          searchResults.filter(material => material.category === categoryFilter)
        );
      } else {
        setFilteredMaterials(searchResults);
      }
    }
  }, [searchQuery, categoryFilter]);
  
  const handleSelectMaterial = (material: Material) => {
    // Ensure the material has a unit value before selecting
    const materialWithUnit = {
      ...material,
      unit: material.unit || "unit" // Default to "unit" if no unit is specified
    };
    
    onSelectMaterial(materialWithUnit);
    setIsOpen(false);
    // Clear search after selection
    setSearchQuery("");
  };
  
  const handleClearSearch = () => {
    setSearchQuery("");
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} className="w-full">
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Material Database</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2">
            <MaterialSearchBar 
              searchQuery={searchQuery}
              onChange={setSearchQuery}
              onClear={handleClearSearch}
            />
            
            <CategoryFilter
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
            />
          </div>
          
          <ScrollArea className="h-[400px] rounded-md border">
            <MaterialsTable
              materials={filteredMaterials}
              onSelectMaterial={handleSelectMaterial}
              formatCurrency={formatCurrency}
            />
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MaterialSelector;
