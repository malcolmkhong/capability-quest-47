
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import LineItemRow, { LineItem } from "./LineItemRow";
import { Material } from "@/utils/materialDatabase";

interface LineItemsTableProps {
  lineItems: LineItem[];
  editingItemId: string | null;
  onStartEditing: (id: string) => void;
  onFinishEditing: () => void;
  onUpdateLineItem: (id: string, field: keyof LineItem, value: any) => void;
  onRemoveLineItem: (id: string) => void;
  onAddLineItem: () => void;
  onSelectMaterial: (itemId: string, material: Material) => void;
}

const LineItemsTable = ({
  lineItems,
  editingItemId,
  onStartEditing,
  onFinishEditing,
  onUpdateLineItem,
  onRemoveLineItem,
  onAddLineItem,
  onSelectMaterial
}: LineItemsTableProps) => {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category/Subcategory</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[120px]">Qty</TableHead>
              <TableHead className="w-[120px]">Unit</TableHead>
              <TableHead className="w-[150px]">Price</TableHead>
              <TableHead className="text-right w-[120px]">Total</TableHead>
              <TableHead className="w-[140px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lineItems.map((item) => (
              <LineItemRow
                key={item.id}
                item={item}
                editingItemId={editingItemId}
                onStartEditing={onStartEditing}
                onFinishEditing={onFinishEditing}
                onUpdateLineItem={onUpdateLineItem}
                onRemoveLineItem={onRemoveLineItem}
                onSelectMaterial={onSelectMaterial}
                disabled={editingItemId !== null && editingItemId !== item.id}
              />
            ))}
            {lineItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                  No items added yet. Click "Add Item" to begin.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <Button 
        variant="outline" 
        onClick={onAddLineItem}
        className="w-full"
        disabled={editingItemId !== null}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Item
      </Button>
    </div>
  );
};

export default LineItemsTable;
