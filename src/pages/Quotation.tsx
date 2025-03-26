
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Calculator, 
  PlusCircle, 
  Trash2, 
  Save, 
  Send, 
  Download,
  ArrowLeft,
  ListFilter
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Navigation from "@/components/Navigation";
import { constructionCategories, constructionUnits, CategoryOption } from "@/utils/constructionCategories";
import { useToast } from "@/hooks/use-toast";

// Define the schema for the form
const formSchema = z.object({
  clientName: z.string().min(2, { message: "Client name is required" }),
  clientEmail: z.string().email({ message: "Valid email is required" }),
  clientPhone: z.string().optional(),
  projectName: z.string().min(2, { message: "Project name is required" }),
  projectAddress: z.string().min(2, { message: "Project address is required" }),
  projectDescription: z.string().min(10, { message: "Please provide more details about the project" }),
  validUntil: z.string(),
  paymentTerms: z.string(),
});

// Define the schema for line items
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

const QuotationPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [availableSubcategories, setAvailableSubcategories] = useState<{ label: string; value: string }[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      projectName: "",
      projectAddress: "",
      projectDescription: "",
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10), // 30 days from now
      paymentTerms: "50% upfront, 50% on completion",
    },
  });

  // Update subcategories when category changes
  useEffect(() => {
    if (selectedCategory) {
      const category = constructionCategories.find(cat => cat.value === selectedCategory);
      if (category) {
        setAvailableSubcategories(category.subcategories);
      }
    }
  }, [selectedCategory]);

  // Add a new line item
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
    setLineItems([...lineItems, newItem]);
  };

  // Update a line item
  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    const updatedItems = lineItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // If category changes, reset subcategory
        if (field === 'category') {
          updatedItem.subcategory = "";
          setSelectedCategory(value);
        }
        
        // Recalculate total if quantity or unitPrice changes
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
        }
        
        return updatedItem;
      }
      return item;
    });
    
    setLineItems(updatedItems);
    calculateSubtotal(updatedItems);
  };

  // Remove a line item
  const removeLineItem = (id: string) => {
    const filteredItems = lineItems.filter(item => item.id !== id);
    setLineItems(filteredItems);
    calculateSubtotal(filteredItems);
  };

  // Calculate subtotal
  const calculateSubtotal = (items: LineItem[]) => {
    const total = items.reduce((sum, item) => sum + item.total, 0);
    setSubtotal(total);
  };

  // Calculate tax
  const calculateTax = () => {
    return subtotal * (taxRate / 100);
  };

  // Calculate discount amount
  const calculateDiscount = () => {
    return subtotal * (discount / 100);
  };

  // Calculate grand total
  const calculateTotal = () => {
    return subtotal + calculateTax() - calculateDiscount();
  };

  // Format currency in Malaysian Ringgit
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (lineItems.length === 0) {
      toast({
        title: "No line items",
        description: "Please add at least one item to the quotation",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would typically save the quotation or send it
    console.log("Form data:", data);
    console.log("Line items:", lineItems);
    console.log("Total amount:", calculateTotal());
    
    toast({
      title: "Quotation created",
      description: "Your quotation has been saved successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto py-8 px-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Client and Project Information Form */}
          <div className="w-full lg:w-1/2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">New Construction Quotation</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Client Information</h3>
                      <FormField
                        control={form.control}
                        name="clientName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Client Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter client name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="clientEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Client Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="client@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="clientPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Client Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="Phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Project Information</h3>
                      <FormField
                        control={form.control}
                        name="projectName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter project name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="projectAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Project location" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="projectDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe the construction project and scope of work" 
                                className="h-24"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Quotation Terms</h3>
                      <FormField
                        control={form.control}
                        name="validUntil"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Valid Until</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="paymentTerms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Payment Terms</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select payment terms" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="On completion">On completion</SelectItem>
                                <SelectItem value="50% upfront, 50% on completion">50% upfront, 50% on completion</SelectItem>
                                <SelectItem value="30% upfront, 30% midway, 40% on completion">30% upfront, 30% midway, 40% on completion</SelectItem>
                                <SelectItem value="Progress payment">Progress payment</SelectItem>
                                <SelectItem value="14 days after invoice date">14 days after invoice date</SelectItem>
                                <SelectItem value="30 days after invoice date">30 days after invoice date</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          {/* Line Items and Totals */}
          <div className="w-full lg:w-1/2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Line Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Category/Subcategory</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="w-[80px]">Qty</TableHead>
                          <TableHead className="w-[80px]">Unit</TableHead>
                          <TableHead className="w-[100px]">Price</TableHead>
                          <TableHead className="text-right w-[100px]">Total</TableHead>
                          <TableHead className="w-[40px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lineItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="space-y-2">
                                <Select
                                  value={item.category}
                                  onValueChange={(value) => updateLineItem(item.id, 'category', value)}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {constructionCategories.map((category) => (
                                      <SelectItem key={category.value} value={category.value}>
                                        {category.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                
                                {item.category && (
                                  <Select
                                    value={item.subcategory}
                                    onValueChange={(value) => updateLineItem(item.id, 'subcategory', value)}
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Subcategory" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {constructionCategories
                                        .find(cat => cat.value === item.category)
                                        ?.subcategories.map((subcat) => (
                                          <SelectItem key={subcat.value} value={subcat.value}>
                                            {subcat.label}
                                          </SelectItem>
                                        ))}
                                    </SelectContent>
                                  </Select>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Input 
                                value={item.description} 
                                onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                                placeholder="Enter description"
                              />
                            </TableCell>
                            <TableCell>
                              <Input 
                                type="number" 
                                value={item.quantity}
                                onChange={(e) => updateLineItem(item.id, 'quantity', Number(e.target.value))}
                                min="1"
                              />
                            </TableCell>
                            <TableCell>
                              <Select 
                                value={item.unit}
                                onValueChange={(value) => updateLineItem(item.id, 'unit', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {constructionUnits.map((unit) => (
                                    <SelectItem key={unit.value} value={unit.value}>
                                      {unit.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <span className="mr-1">RM</span>
                                <Input 
                                  type="number" 
                                  value={item.unitPrice}
                                  onChange={(e) => updateLineItem(item.id, 'unitPrice', Number(e.target.value))}
                                  min="0"
                                  step="0.01"
                                />
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {formatCurrency(item.total)}
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => removeLineItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
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
                    onClick={addLineItem}
                    className="w-full"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                  
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
                        onChange={(e) => setTaxRate(Number(e.target.value))}
                        className="w-24"
                        min="0"
                        max="100"
                      />
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Tax Amount:</span>
                      <span>{formatCurrency(calculateTax())}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Discount (%):</span>
                      <Input 
                        type="number" 
                        value={discount}
                        onChange={(e) => setDiscount(Number(e.target.value))}
                        className="w-24"
                        min="0"
                        max="100"
                      />
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Discount Amount:</span>
                      <span>-{formatCurrency(calculateDiscount())}</span>
                    </div>
                    
                    <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                      <span>Total:</span>
                      <span>{formatCurrency(calculateTotal())}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Button 
                      onClick={form.handleSubmit(onSubmit)} 
                      className="flex-1"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Quotation
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Email to Client
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="flex-1"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuotationPage;
