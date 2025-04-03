
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { constructionCategories } from "@/utils/constructionCategories";
import { Material } from "@/utils/materialDatabase";

interface MaterialsTableProps {
  materials: Material[];
  onSelectMaterial: (material: Material) => void;
  formatCurrency: (amount: number) => string;
}

export const MaterialsTable = ({
  materials,
  onSelectMaterial,
  formatCurrency,
}: MaterialsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Material</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Price</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {materials.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
              No materials found. Try changing your search or filter.
            </TableCell>
          </TableRow>
        ) : (
          materials.map((material) => (
            <TableRow key={material.id}>
              <TableCell>
                <div className="font-medium">{material.name}</div>
                <Badge variant="outline" className="mt-1">
                  {constructionCategories.find(c => c.value === material.category)?.label || material.category}
                </Badge>
              </TableCell>
              <TableCell className="max-w-[300px]">
                {material.description || "No description available"}
              </TableCell>
              <TableCell>{material.unit || "unit"}</TableCell>
              <TableCell className="font-medium">
                {formatCurrency(material.unitPrice)}
              </TableCell>
              <TableCell>
                <Button 
                  size="sm" 
                  onClick={() => onSelectMaterial(material)}
                >
                  Select
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
