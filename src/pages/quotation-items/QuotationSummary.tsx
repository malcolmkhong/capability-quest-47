
import { Input } from "@/components/ui/input";
import { formatCurrency, calculateTax, calculateDiscount, calculateTotal } from "./utils";

interface QuotationSummaryProps {
  subtotal: number;
  taxRate: number;
  discount: number;
  onTaxRateChange: (value: number) => void;
  onDiscountChange: (value: number) => void;
}

const QuotationSummary = ({
  subtotal,
  taxRate,
  discount,
  onTaxRateChange,
  onDiscountChange
}: QuotationSummaryProps) => {
  return (
    <div className="space-y-2 border-t pt-4">
      <div className="flex justify-between">
        <span>Subtotal:</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <span>Tax Rate (%):</span>
        <Input 
          type="number" 
          value={taxRate}
          onChange={(e) => onTaxRateChange(Number(e.target.value))}
          className="w-32"
          min="0"
          max="100"
        />
      </div>
      
      <div className="flex justify-between">
        <span>Tax Amount:</span>
        <span>{formatCurrency(calculateTax(subtotal, taxRate))}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <span>Discount (%):</span>
        <Input 
          type="number" 
          value={discount}
          onChange={(e) => onDiscountChange(Number(e.target.value))}
          className="w-32"
          min="0"
          max="100"
        />
      </div>
      
      <div className="flex justify-between">
        <span>Discount Amount:</span>
        <span>-{formatCurrency(calculateDiscount(subtotal, discount))}</span>
      </div>
      
      <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
        <span>Total:</span>
        <span>{formatCurrency(calculateTotal(subtotal, taxRate, discount))}</span>
      </div>
    </div>
  );
};

export default QuotationSummary;
