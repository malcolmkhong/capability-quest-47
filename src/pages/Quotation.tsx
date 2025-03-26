
import { useState } from "react";
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
  ArrowLeft 
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
import Navigation from "@/components/Navigation";

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
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

const QuotationPage = () => {
  const navigate = useNavigate();
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  
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
      paymentTerms: "14 days after invoice date",
    },
  });

  // Add a new line item
  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      unit: "hours",
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Here you would typically save the quotation or send it
    console.log("Form data:", data);
    console.log("Line items:", lineItems);
    console.log("Total amount:", calculateTotal());
    
    // For demonstration, we'll just show an alert
    alert("Quotation created successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
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
                <CardTitle className="text-2xl">New Quotation</CardTitle>
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
                            <FormLabel>Client Phone (Optional)</FormLabel>
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
                                placeholder="Describe the project and scope of work" 
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
                          <TableHead>Description</TableHead>
                          <TableHead className="w-[100px]">Qty</TableHead>
                          <TableHead className="w-[100px]">Unit</TableHead>
                          <TableHead className="w-[120px]">Price</TableHead>
                          <TableHead className="text-right w-[120px]">Total</TableHead>
                          <TableHead className="w-[40px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lineItems.map((item) => (
                          <TableRow key={item.id}>
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
                                  <SelectItem value="hours">Hours</SelectItem>
                                  <SelectItem value="days">Days</SelectItem>
                                  <SelectItem value="sq.ft">Sq. Ft.</SelectItem>
                                  <SelectItem value="units">Units</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Input 
                                type="number" 
                                value={item.unitPrice}
                                onChange={(e) => updateLineItem(item.id, 'unitPrice', Number(e.target.value))}
                                min="0"
                                step="0.01"
                              />
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              ${item.total.toFixed(2)}
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
                            <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
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
                      <span>${subtotal.toFixed(2)}</span>
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
                      <span>${calculateTax().toFixed(2)}</span>
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
                      <span>-${calculateDiscount().toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
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
