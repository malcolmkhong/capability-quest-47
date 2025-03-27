import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Send, Save, FileCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { ClientFormData } from "./QuotationClient";
import { constructionCategories } from "@/utils/constructionCategories";

interface LineItem {
  id: string;
  category: string;
  subcategory: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

const QuotationExportPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [clientData, setClientData] = useState<ClientFormData | null>(null);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [quotationNumber, setQuotationNumber] = useState("");
  
  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    setQuotationNumber(`Q${year}${month}-${random}`);
    
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
    if (!savedLineItems) {
      toast({
        title: "No line items found",
        description: "Please add items to your quotation first",
        variant: "destructive"
      });
      navigate("/quotation/items");
      return;
    }
    
    const items = JSON.parse(savedLineItems);
    setLineItems(items);
    
    const total = items.reduce((sum: number, item: LineItem) => sum + item.total, 0);
    setSubtotal(total);
    
    const savedTaxRate = localStorage.getItem('quotationTaxRate');
    const savedDiscount = localStorage.getItem('quotationDiscount');
    
    if (savedTaxRate) setTaxRate(JSON.parse(savedTaxRate));
    if (savedDiscount) setDiscount(JSON.parse(savedDiscount));
  }, [navigate, toast]);
  
  const calculateTax = () => {
    return subtotal * (taxRate / 100);
  };

  const calculateDiscount = () => {
    return subtotal * (discount / 100);
  };

  const calculateTotal = () => {
    return subtotal + calculateTax() - calculateDiscount();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-MY', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  
  const handleSaveQuotation = () => {
    toast({
      title: "Quotation saved",
      description: `Quotation ${quotationNumber} has been saved successfully`,
    });
  };
  
  const handleEmailToClient = () => {
    toast({
      title: "Email sent",
      description: `Quotation sent to ${clientData?.clientEmail}`,
    });
  };
  
  const handleDownloadPDF = () => {
    toast({
      title: "PDF generated",
      description: "Your quotation PDF is downloading",
    });
  };
  
  const handleNewQuotation = () => {
    localStorage.removeItem('quotationClientData');
    localStorage.removeItem('quotationLineItems');
    localStorage.removeItem('quotationTaxRate');
    localStorage.removeItem('quotationDiscount');
    
    navigate("/quotation/client");
    
    toast({
      title: "New quotation",
      description: "Starting a new quotation",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/quotation/items")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Line Items
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground opacity-50 flex items-center justify-center text-sm font-medium">1</div>
              <span className="ml-2 text-muted-foreground">Client Info</span>
            </div>
            <div className="h-px w-8 bg-border"></div>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground opacity-50 flex items-center justify-center text-sm font-medium">2</div>
              <span className="ml-2 text-muted-foreground">Line Items</span>
            </div>
            <div className="h-px w-8 bg-border"></div>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">3</div>
              <span className="ml-2 font-medium">Export</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-6 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">Quotation #{quotationNumber}</CardTitle>
                  <CardDescription>Review and export your quotation</CardDescription>
                </div>
                <div className="text-right">
                  <p className="font-semibold">TOTAL</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(calculateTotal())}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {clientData && (
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-medium mb-2">Client Information</h3>
                    <div className="bg-muted p-4 rounded-md space-y-2">
                      <p><span className="font-medium">Name:</span> {clientData.clientName}</p>
                      <p><span className="font-medium">Email:</span> {clientData.clientEmail}</p>
                      {clientData.clientPhone && (
                        <p><span className="font-medium">Phone:</span> {clientData.clientPhone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Project Information</h3>
                    <div className="bg-muted p-4 rounded-md space-y-2">
                      <p><span className="font-medium">Project:</span> {clientData.projectName}</p>
                      <p><span className="font-medium">Address:</span> {clientData.projectAddress}</p>
                      <p className="text-sm text-muted-foreground">{clientData.projectDescription}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Quotation Details</h3>
                    <div className="bg-muted p-4 rounded-md space-y-2">
                      <p><span className="font-medium">Quotation Number:</span> {quotationNumber}</p>
                      <p><span className="font-medium">Date:</span> {new Date().toLocaleDateString()}</p>
                      <p><span className="font-medium">Valid Until:</span> {formatDate(clientData.validUntil)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Payment Terms</h3>
                    <div className="bg-muted p-4 rounded-md">
                      <p>{clientData.paymentTerms}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-6">
                <h3 className="font-medium mb-4">Line Items</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lineItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="align-top">
                            <div>
                              <p className="font-medium">{constructionCategories.find(cat => cat.value === item.category)?.label}</p>
                              {item.subcategory && (
                                <p className="text-sm text-muted-foreground">
                                  {constructionCategories
                                    .find(cat => cat.value === item.category)
                                    ?.subcategories.find(sub => sub.value === item.subcategory)?.label}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.total)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-4 space-y-2 border-t pt-4 max-w-xs ml-auto">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax ({taxRate}%):</span>
                    <span>{formatCurrency(calculateTax())}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Discount ({discount}%):</span>
                    <span>-{formatCurrency(calculateDiscount())}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                    <span>Total:</span>
                    <span>{formatCurrency(calculateTotal())}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={handleSaveQuotation} 
              className="flex-1 max-w-60"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Quotation
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 max-w-60"
              onClick={handleEmailToClient}
            >
              <Send className="mr-2 h-4 w-4" />
              Email to Client
            </Button>
            <Button 
              variant="secondary" 
              className="flex-1 max-w-60"
              onClick={handleDownloadPDF}
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
          
          <div className="flex justify-center mt-8">
            <Button 
              variant="outline" 
              onClick={handleNewQuotation}
            >
              <FileCheck className="mr-2 h-4 w-4" />
              Create New Quotation
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuotationExportPage;
