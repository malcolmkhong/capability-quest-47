
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { Material } from "@/utils/materialDatabase";
import { ClientFormData } from "./QuotationClient";
import LineItemsTable from "./quotation-items/LineItemsTable";
import QuotationSummary from "./quotation-items/QuotationSummary";
import PageNavigation from "./quotation-items/PageNavigation";
import ClientInfoSummary from "./quotation-items/ClientInfoSummary";
import { LineItem } from "./quotation-items/LineItemRow";

const QuotationItemsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [clientData, setClientData] = useState<ClientFormData | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null);
  
  useEffect(() => {
    const savedClientData = localStorage.getItem('quotationClientData');
    if (!savedClientData) {
      toast({
        title: "No client data found",
        description: "Please complete the client information first",
        variant: "destructive"
      });
      navigate("/quotation/client");
      return;
    }
    
    setClientData(JSON.parse(savedClientData));
    
    const savedLineItems = localStorage.getItem('quotationLineItems');
    if (savedLineItems) {
      setLineItems(JSON.parse(savedLineItems));
    }
    
    const savedTaxRate = localStorage.getItem('quotationTaxRate');
    const savedDiscount = localStorage.getItem('quotationDiscount');
    
    if (savedTaxRate) setTaxRate(JSON.parse(savedTaxRate));
    if (savedDiscount) setDiscount(JSON.parse(savedDiscount));
  }, [navigate, toast]);
  
  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      category: "",
      subcategory: "",
      description: "",
      quantity: 1,
      unit: "sq.ft",
      unitPrice: 0,
      total: 0,
    };
    const updatedItems = [...lineItems, newItem];
    setLineItems(updatedItems);
    localStorage.setItem('quotationLineItems', JSON.stringify(updatedItems));
    setEditingItemId(newItem.id);
    setLastAddedItem(newItem.id);
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    const updatedItems = lineItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        if (field === 'category') {
          updatedItem.subcategory = "";
          setSelectedCategory(value);
        }
        
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
        }
        
        return updatedItem;
      }
      return item;
    });
    
    setLineItems(updatedItems);
    localStorage.setItem('quotationLineItems', JSON.stringify(updatedItems));
    calculateSubtotal(updatedItems);
  };

  const removeLineItem = (id: string) => {
    const filteredItems = lineItems.filter(item => item.id !== id);
    setLineItems(filteredItems);
    localStorage.setItem('quotationLineItems', JSON.stringify(filteredItems));
    calculateSubtotal(filteredItems);
    
    if (editingItemId === id) {
      setEditingItemId(null);
    }
  };

  const calculateSubtotal = (items: LineItem[]) => {
    const total = items.reduce((sum, item) => sum + item.total, 0);
    setSubtotal(total);
  };
  
  const handleContinue = () => {
    if (lineItems.length === 0) {
      toast({
        title: "No line items",
        description: "Please add at least one item to the quotation",
        variant: "destructive"
      });
      return;
    }
    
    localStorage.setItem('quotationTaxRate', JSON.stringify(taxRate));
    localStorage.setItem('quotationDiscount', JSON.stringify(discount));
    
    navigate("/quotation/export");
  };
  
  const startEditing = (itemId: string) => {
    setEditingItemId(itemId);
  };
  
  const finishEditing = () => {
    setEditingItemId(null);
  };
  
  const handleSelectMaterial = (itemId: string, material: Material) => {
    const updatedItems = lineItems.map(item => {
      if (item.id === itemId) {
        const category = material.category || item.category;
        const subcategory = material.subcategory || item.subcategory;
        const unit = material.unit || "unit";
        
        return {
          ...item,
          category,
          subcategory,
          unit,
          unitPrice: material.unitPrice,
          total: item.quantity * material.unitPrice,
          description: item.description || material.description || "",
          materialId: material.id,
          materialName: material.name
        };
      }
      return item;
    });
    
    setLineItems(updatedItems);
    localStorage.setItem('quotationLineItems', JSON.stringify(updatedItems));
    calculateSubtotal(updatedItems);
    
    toast({
      title: "Material added",
      description: `Added ${material.name} to your quotation`,
    });
  };

  useEffect(() => {
    if (lastAddedItem) {
      const element = document.getElementById(`item-${lastAddedItem}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setLastAddedItem(null);
    }
  }, [lastAddedItem]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto py-8 px-4">
        <PageNavigation 
          onContinue={handleContinue} 
          disableContinue={editingItemId !== null} 
        />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Line Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <ClientInfoSummary clientData={clientData} />
              
              <LineItemsTable
                lineItems={lineItems}
                editingItemId={editingItemId}
                onStartEditing={startEditing}
                onFinishEditing={finishEditing}
                onUpdateLineItem={updateLineItem}
                onRemoveLineItem={removeLineItem}
                onAddLineItem={addLineItem}
                onSelectMaterial={handleSelectMaterial}
              />
              
              <QuotationSummary
                subtotal={subtotal}
                taxRate={taxRate}
                discount={discount}
                onTaxRateChange={setTaxRate}
                onDiscountChange={setDiscount}
              />
              
              <div className="flex justify-end pt-4">
                <Button onClick={handleContinue} disabled={editingItemId !== null}>
                  Continue to Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default QuotationItemsPage;
