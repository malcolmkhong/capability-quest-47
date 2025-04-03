
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { constructionCategories } from "@/utils/constructionCategories";

interface CategoryFilterProps {
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({ 
  categoryFilter, 
  onCategoryChange 
}: CategoryFilterProps) => {
  return (
    <Select value={categoryFilter} onValueChange={onCategoryChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all_categories">All Categories</SelectItem>
        {constructionCategories.map(category => (
          <SelectItem key={category.value} value={category.value}>
            {category.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
