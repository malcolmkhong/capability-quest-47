import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Send, Save, FileCheck, Edit, FileText, Mail, Upload, X } from "lucide-react";
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { ClientFormData } from "./QuotationClient";
import { constructionCategories } from "@/utils/constructionCategories";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmailDialog from "@/components/EmailDialog";

interface LineItem {
  id: string;
  category: string;
  subcategory: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  materialId?: string;
  materialName?: string;
}

interface SectionTotal {
  title: string;
  amount: number;
}

const MAX_LOGO_SIZE_MB = 5;
const MAX_LOGO_SIZE_BYTES = MAX_LOGO_SIZE_MB * 1024 * 1024;

const QuotationExportPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [clientData, setClientData] = useState<ClientFormData | null>(null);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [quotationNumber, setQuotationNumber] = useState("");
  const [editingTerms, setEditingTerms] = useState(false);
  const [editingTAndC, setEditingTAndC] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState<string>("");
  const [companyDetails, setCompanyDetails] = useState({
    name: "Your Company Name",
    address: "Company Address Line 1\nAddress Line 2, City, ZIP",
    phone: "+123 456 7890",
    email: "contact@yourcompany.com",
    website: "www.yourcompany.com",
    registrationNumber: "REG12345678"
  });
  const [editingCompanyDetails, setEditingCompanyDetails] = useState(false);
  const [editingPaymentDetails, setEditingPaymentDetails] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    bankName: "MAYBANK",
    accountName: "YOUR COMPANY NAME",
    accountNumber: "5648 4715 8502"
  });
  const [sections, setSections] = useState<{ [key: string]: LineItem[] }>({});
  const [sectionTotals, setSectionTotals] = useState<SectionTotal[]>([]);
  const [activeTab, setActiveTab] = useState("preview");
  
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [editingLineItem, setEditingLineItem] = useState<string | null>(null);
  const [editedDescriptions, setEditedDescriptions] = useState<{[key: string]: string}>({});
  
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  
  useEffect(() => {
    const savedLogo = localStorage.getItem('quotationLogo');
    if (savedLogo) {
      setLogoUrl(savedLogo);
    }
    
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
    
    const initialDescriptions: {[key: string]: string} = {};
    items.forEach((item: LineItem) => {
      initialDescriptions[item.id] = item.description;
    });
    setEditedDescriptions(initialDescriptions);
    
    const groupedSections: { [key: string]: LineItem[] } = {};
    items.forEach((item: LineItem) => {
      const category = item.category;
      if (!groupedSections[category]) {
        groupedSections[category] = [];
      }
      groupedSections[category].push(item);
    });
    setSections(groupedSections);
    
    const totals: SectionTotal[] = [];
    Object.entries(groupedSections).forEach(([key, items]) => {
      const categoryObj = constructionCategories.find(cat => cat.value === key);
      const sectionTotal = items.reduce((sum, item) => sum + item.total, 0);
      totals.push({
        title: categoryObj?.label || key,
        amount: sectionTotal
      });
    });
    setSectionTotals(totals);
    
    const total = items.reduce((sum: number, item: LineItem) => sum + item.total, 0);
    setSubtotal(total);
    
    const savedTaxRate = localStorage.getItem('quotationTaxRate');
    const savedDiscount = localStorage.getItem('quotationDiscount');
    
    if (savedTaxRate) setTaxRate(JSON.parse(savedTaxRate));
    if (savedDiscount) setDiscount(JSON.parse(savedDiscount));
    
    const savedCompanyDetails = localStorage.getItem('companyDetails');
    if (savedCompanyDetails) {
      setCompanyDetails(JSON.parse(savedCompanyDetails));
    }
    
    const savedPaymentDetails = localStorage.getItem('paymentDetails');
    if (savedPaymentDetails) {
      setPaymentDetails(JSON.parse(savedPaymentDetails));
    }
    
    const savedTAndC = localStorage.getItem('quotationTermsAndConditions');
    if (savedTAndC) {
      setTermsAndConditions(savedTAndC);
    } else {
      setTermsAndConditions(
`1. VALIDITY: This quotation is valid for 30 days from the date of issue.

2. PAYMENT TERMS: 
   - 50% deposit upon acceptance of quotation
   - 40% upon completion of major work, prior to final finishing
   - 10% upon project completion and final inspection

3. SCOPE OF WORK: Only works specified in this quotation are included. Any additional work will be charged separately.

4. MATERIALS: All materials supplied will be of good quality and as per specifications. Any changes must be agreed in writing.

5. TIMING: Completion dates are estimates only and subject to site conditions, weather, and material availability.

6. VARIATIONS: Any variations or additional works requested by the client will be subject to additional charges and may affect completion timeline.

7. DISPUTES: Any disputes arising shall be resolved through negotiation in good faith before any legal action.

8. WARRANTY: Workmanship is guaranteed for 6 months from completion date. Material warranties as per manufacturer terms.

9. SITE ACCESS: Client must provide reasonable access to site, water, and electricity for construction purposes.

10. PERMITS & APPROVALS: Client is responsible for obtaining necessary permits unless specifically included in this quotation.

11. SITE SAFETY: All reasonable safety precautions will be taken during construction. Site visitors must adhere to safety guidelines.

12. CLEAN-UP: Basic clean-up is included, but not detailed or professional cleaning services.
`);
    }
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
  
  const generateXLSX = () => {
    const wb = XLSX.utils.book_new();
    
    // Create a worksheet for company info, title, and header
    const wsInfo = XLSX.utils.aoa_to_sheet([
      ["", ""],
      [companyDetails.name, ""],
      [companyDetails.address.split('\n').join(', '), ""],
      ["Phone: " + companyDetails.phone, ""],
      ["Email: " + companyDetails.email, ""],
      ["Registration: " + companyDetails.registrationNumber, ""],
      ["Website: " + companyDetails.website, ""],
      ["", ""],
      ["QUOTATION", ""],
      ["Ref: " + quotationNumber, "Date: " + new Date().toLocaleDateString()],
      ["Valid Until: " + (clientData?.validUntil ? formatDate(clientData.validUntil) : "N/A"), ""],
      ["", ""],
      ["Client: " + clientData?.clientName, ""],
      ["Project: " + clientData?.projectName, ""],
      ["Address: " + clientData?.projectAddress, ""],
      ["Email: " + clientData?.clientEmail, ""],
      ["Phone: " + clientData?.clientPhone, ""],
      ["", ""]
    ]);
    
    // Create header and style for title
    const headerStyle = {
      font: { bold: true, sz: 14 },
      alignment: { horizontal: "center" }
    };
    
    // Apply styling to the title row
    wsInfo['!cols'] = [{ wch: 40 }, { wch: 40 }];
    
    // Add info worksheet
    XLSX.utils.book_append_sheet(wb, wsInfo, "Info");
    
    // Create line items worksheet with detailed data
    const headers = ["No", "Category", "Description", "Quantity", "Unit", "Unit Price", "Amount"];
    
    const data = lineItems.map((item, index) => {
      const category = constructionCategories.find(cat => cat.value === item.category);
      const subcategory = category?.subcategories.find(sub => sub.value === item.subcategory);
      return [
        index + 1,
        category?.label || item.category,
        subcategory?.label + " - " + (editedDescriptions[item.id] || item.description),
        item.quantity,
        item.unit,
        item.unitPrice,
        item.total
      ];
    });
    
    // Add section totals to the data
    sectionTotals.forEach((section, index) => {
      data.push(["", "", "", "", "", section.title + " Total:", section.amount]);
    });
    
    // Add calculation rows
    data.push(
      ["", "", "", "", "", "Subtotal", subtotal],
      ["", "", "", "", "", `Tax (${taxRate}%)`, calculateTax()],
      ["", "", "", "", "", `Discount (${discount}%)`, calculateDiscount()],
      ["", "", "", "", "", "Total", calculateTotal()]
    );
    
    const wsItems = XLSX.utils.aoa_to_sheet([headers, ...data]);
    XLSX.utils.book_append_sheet(wb, wsItems, "Line Items");
    
    // Create Terms & Conditions worksheet
    const wsTAndC = XLSX.utils.aoa_to_sheet([
      ["TERMS AND CONDITIONS"],
      [""],
      ...termsAndConditions.split('\n').map(line => [line])
    ]);
    
    // Add T&C worksheet
    XLSX.utils.book_append_sheet(wb, wsTAndC, "Terms & Conditions");
    
    // Create Payment Details worksheet
    const wsPayment = XLSX.utils.aoa_to_sheet([
      ["PAYMENT DETAILS"],
      [""],
      ["Bank Name:", paymentDetails.bankName],
      ["Account Name:", paymentDetails.accountName],
      ["Account Number:", paymentDetails.accountNumber],
      [""],
      ["PAYMENT SCHEDULE"],
      [""],
      ["50% deposit upon acceptance of quotation"],
      ["40% upon completion of major work, prior to final finishing"],
      ["10% upon project completion and final inspection"]
    ]);
    
    // Add Payment Details worksheet
    XLSX.utils.book_append_sheet(wb, wsPayment, "Payment Details");
    
    // Save the workbook
    XLSX.writeFile(wb, `Quotation_${quotationNumber}.xlsx`);
  };

  const generateCSV = () => {
    // Create header rows with company info and title
    const headerRows = [
      [companyDetails.name, "", "", "", "", "", ""],
      ["QUOTATION " + quotationNumber, "", "", "", "", "Date:", new Date().toLocaleDateString()],
      ["Valid Until:", clientData?.validUntil ? formatDate(clientData.validUntil) : "N/A", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["Client:", clientData?.clientName, "", "", "", "", ""],
      ["Project:", clientData?.projectName, "", "", "", "", ""],
      ["Address:", clientData?.projectAddress?.split('\n').join(', '), "", "", "", "", ""],
      ["Email:", clientData?.clientEmail, "", "", "", "", ""],
      ["Phone:", clientData?.clientPhone, "", "", "", "", ""],
      ["", "", "", "", "", "", ""]
    ];
    
    // Column headers for line items
    const tableHeaders = ["No", "Category", "Description", "Quantity", "Unit", "Unit Price", "Amount"];
    
    // Line item data
    const data = lineItems.map((item, index) => {
      const category = constructionCategories.find(cat => cat.value === item.category);
      const subcategory = category?.subcategories.find(sub => sub.value === item.subcategory);
      return [
        index + 1,
        category?.label || item.category,
        subcategory?.label + " - " + (editedDescriptions[item.id] || item.description),
        item.quantity,
        item.unit,
        item.unitPrice,
        item.total
      ];
    });
    
    // Section totals
    Object.entries(sections).forEach(([categoryKey, items], index) => {
      const category = constructionCategories.find(cat => cat.value === categoryKey);
      const sectionTotal = items.reduce((sum, item) => sum + item.total, 0);
      data.push(["", "", "", "", "", category?.label + " Total:", sectionTotal]);
    });
    
    // Calculation rows
    data.push(
      ["", "", "", "", "", "Subtotal", subtotal],
      ["", "", "", "", "", `Tax (${taxRate}%)`, calculateTax()],
      ["", "", "", "", "", `Discount (${discount}%)`, calculateDiscount()],
      ["", "", "", "", "", "Total", calculateTotal()]
    );
    
    // Payment info
    const paymentRows = [
      ["", "", "", "", "", "", ""],
      ["PAYMENT DETAILS", "", "", "", "", "", ""],
      ["Bank Name:", paymentDetails.bankName, "", "", "", "", ""],
      ["Account Name:", paymentDetails.accountName, "", "", "", "", ""],
      ["Account Number:", paymentDetails.accountNumber, "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["Terms and Conditions:", "Please refer to the attached terms and conditions document", "", "", "", "", ""]
    ];
    
    // Combine all rows
    const allRows = [
      ...headerRows,
      tableHeaders,
      ...data,
      ...paymentRows
    ];
    
    // Create a worksheet with all the data
    const ws = XLSX.utils.aoa_to_sheet(allRows);
    
    // Convert to CSV
    const csv = XLSX.utils.sheet_to_csv(ws);
    
    // Download the CSV file
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Quotation_${quotationNumber}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    if (logoUrl) {
      doc.addImage(logoUrl, 'JPEG', 140, 10, 50, 25);
    }
    
    doc.setFontSize(18);
    doc.text('QUOTATION', 105, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.text(companyDetails.name, 10, 30);
    const addressLines = companyDetails.address.split('\n');
    addressLines.forEach((line, index) => {
      doc.text(line, 10, 35 + (index * 5));
    });
    doc.text(`Phone: ${companyDetails.phone}`, 10, 35 + (addressLines.length * 5));
    doc.text(`Email: ${companyDetails.email}`, 10, 40 + (addressLines.length * 5));
    doc.text(`Registration: ${companyDetails.registrationNumber}`, 10, 45 + (addressLines.length * 5));
    
    doc.text(`Ref: ${quotationNumber}`, 150, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 35);
    
    doc.setFontSize(11);
    doc.text('Bill To:', 10, 65);
    doc.setFontSize(10);
    doc.text(`${clientData?.clientName || ''}`, 10, 70);
    doc.text(`${clientData?.projectName || ''}`, 10, 75);
    const clientAddressLines = (clientData?.projectAddress || '').split('\n');
    clientAddressLines.forEach((line, index) => {
      doc.text(line, 10, 80 + (index * 5));
    });
    doc.text(`Email: ${clientData?.clientEmail || ''}`, 10, 80 + (clientAddressLines.length * 5));
    doc.text(`Phone: ${clientData?.clientPhone || ''}`, 10, 85 + (clientAddressLines.length * 5));
    
    const tableColumn = ["No", "Description", "Qty", "Unit", "Unit Price", "Amount"];
    
    const tableRows: any[] = [];
    
    Object.entries(sections).forEach(([categoryKey, items]) => {
      const category = constructionCategories.find(cat => cat.value === categoryKey);
      
      tableRows.push([
        "", 
        { content: category?.label || categoryKey, colSpan: 5, styles: { fontStyle: 'bold' } }
      ]);
      
      items.forEach((item, index) => {
        const subcategory = category?.subcategories.find(sub => sub.value === item.subcategory);
        tableRows.push([
          index + 1,
          `${subcategory?.label || ''} - ${editedDescriptions[item.id] || item.description}`,
          item.quantity,
          item.unit,
          formatCurrency(item.unitPrice).replace('RM', ''),
          formatCurrency(item.total).replace('RM', '')
        ]);
      });
    });
    
    tableRows.push(
      [
        "",
        { content: "Subtotal:", colSpan: 4, styles: { fontStyle: 'bold', halign: 'right' } },
        formatCurrency(subtotal).replace('RM', '')
      ],
      [
        "",
        { content: `Tax (${taxRate}%):`, colSpan: 4, styles: { halign: 'right' } },
        formatCurrency(calculateTax()).replace('RM', '')
      ],
      [
        "",
        { content: `Discount (${discount}%):`, colSpan: 4, styles: { halign: 'right' } },
        formatCurrency(calculateDiscount()).replace('RM', '')
      ],
      [
        "",
        { content: "Total:", colSpan: 4, styles: { fontStyle: 'bold', halign: 'right' } },
        { content: formatCurrency(calculateTotal()).replace('RM', ''), styles: { fontStyle: 'bold' } }
      ]
    );
    
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 100,
      theme: 'striped',
      headStyles: { fillColor: [60, 60, 60] },
      margin: { top: 10 },
      styles: { overflow: 'linebreak' },
      columnStyles: {
        0: { cellWidth: 10 }, 
        1: { cellWidth: 'auto' },
        2: { cellWidth: 15, halign: 'center' },
        3: { cellWidth: 15, halign: 'center' },
        4: { cellWidth: 25, halign: 'right' },
        5: { cellWidth: 25, halign: 'right' }
      }
    });
    
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    
    doc.setFontSize(11);
    doc.text('Payment Terms:', 10, finalY);
    doc.setFontSize(10);
    doc.text('50% deposit upon acceptance of quotation', 10, finalY + 5);
    doc.text('40% upon completion of major work, prior to final finishing', 10, finalY + 10);
    doc.text('10% upon project completion and final inspection', 10, finalY + 15);
    
    doc.text(`All payments to be made to:`, 10, finalY + 25);
    doc.text(`${paymentDetails.accountName}`, 10, finalY + 30);
    doc.text(`${paymentDetails.bankName}`, 10, finalY + 35);
    doc.text(`Account: ${paymentDetails.accountNumber}`, 10, finalY + 40);
    
    const signatureY = finalY + 60;
    
    if (signatureY < 270) {
      doc.line(10, signatureY, 80, signatureY);
      doc.line(120, signatureY, 190, signatureY);
      
      doc.text('Client Signature', 10, signatureY + 5);
      doc.text('Authorized Signature', 120, signatureY + 5);
      
      doc.text('Date: ________________', 10, signatureY + 15);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 120, signatureY + 15);
    }
    
    doc.save(`Quotation_${quotationNumber}.pdf`);
  };
  
  const handleSaveQuotation = () => {
    localStorage.setItem('quotationTermsAndConditions', termsAndConditions);
    localStorage.setItem('companyDetails', JSON.stringify(companyDetails));
    localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
    
    if (logoUrl) {
      localStorage.setItem('quotationLogo', logoUrl);
    }
    
    const updatedLineItems = lineItems.map(item => ({
      ...item,
      description: editedDescriptions[item.id] || item.description
    }));
    
    localStorage.setItem('quotationLineItems', JSON.stringify(updatedLineItems));
    setLineItems(updatedLineItems);
    
    generateXLSX();
    generateCSV();
    
    toast({
      title: "Quotation saved",
      description: `Quotation ${quotationNumber} has been saved as XLSX and CSV files`,
    });
  };
  
  const handleEmailToClient = () => {
    handleSaveQuotation();
    
    setEmailDialogOpen(true);
  };
  
  const handleSendEmail = (to: string, subject: string, message: string) => {
    toast({
      title: "Email sent",
      description: `Quotation sent to ${to}`,
    });
  };
  
  const handleDownloadPDF = () => {
    localStorage.setItem('quotationTermsAndConditions', termsAndConditions);
    localStorage.setItem('companyDetails', JSON.stringify(companyDetails));
    localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
    
    generatePDF();
    
    toast({
      title: "PDF generated",
      description: "Your quotation PDF has been downloaded",
    });
  };
  
  const handleNewQuotation = () => {
    localStorage.removeItem('quotationClientData');
    localStorage.removeItem('quotationLineItems');
    localStorage.removeItem('quotationTaxRate');
    localStorage.removeItem('quotationDiscount');
    localStorage.removeItem('quotationTermsAndConditions');
    
    navigate("/quotation/client");
    
    toast({
      title: "New quotation",
      description: "Starting a new quotation",
    });
  };

  const handleSaveTerms = () => {
    setEditingTerms(false);
    toast({
      title: "Payment terms updated",
      description: "Payment terms have been updated successfully",
    });
  };

  const handleSaveTAndC = () => {
    setEditingTAndC(false);
    localStorage.setItem('quotationTermsAndConditions', termsAndConditions);
    toast({
      title: "Terms & Conditions updated",
      description: "Terms & Conditions have been updated successfully",
    });
  };
  
  const handleSaveCompanyDetails = () => {
    setEditingCompanyDetails(false);
    localStorage.setItem('companyDetails', JSON.stringify(companyDetails));
    toast({
      title: "Company details updated",
      description: "Company details have been updated successfully",
    });
  };
  
  const handleSavePaymentDetails = () => {
    setEditingPaymentDetails(false);
    localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
    toast({
      title: "Payment details updated",
      description: "Bank details have been updated successfully",
    });
  };
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > MAX_LOGO_SIZE_BYTES) {
      toast({
        title: "File too large",
        description: `Logo must be less than ${MAX_LOGO_SIZE_MB}MB`,
        variant: "destructive"
      });
      return;
    }
    
    setUploadingLogo(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setLogoUrl(result);
      setUploadingLogo(false);
      
      localStorage.setItem('quotationLogo', result);
      
      toast({
        title: "Logo uploaded",
        description: "Company logo has been updated successfully",
      });
    };
    
    reader.onerror = () => {
      setUploadingLogo(false);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your logo",
        variant: "destructive"
      });
    };
    
    reader.readAsDataURL(file);
  };
  
  const handleRemoveLogo = () => {
    setLogoUrl(null);
    localStorage.removeItem('quotationLogo');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    toast({
      title: "Logo removed",
      description: "Company logo has been removed",
    });
  };
  
  const handleEditDescription = (itemId: string, description: string) => {
    setEditedDescriptions({
      ...editedDescriptions,
      [itemId]: description
    });
  };
  
  const handleEditLineItemInPreview = (itemId: string) => {
    setEditingLineItem(itemId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto py-6 px-4">
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="edit">Edit Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="mt-4">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden print:shadow-none">
              <div className="p-8 border-b">
                <div className="flex flex-col items-center mb-6">
                  {logoUrl ? (
                    <div className="relative mb-4">
                      <img 
                        src={logoUrl} 
                        alt="Company Logo" 
                        className="max-h-24 max-w-full object-contain" 
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center mb-4">
                      <input 
                        type="file" 
                        id="preview-logo-upload" 
                        accept="image/*"
                        className="hidden" 
                        onChange={handleLogoUpload}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => document.getElementById('preview-logo-upload')?.click()}
                        disabled={uploadingLogo}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {uploadingLogo ? "Uploading..." : "Add Logo"}
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">Max size: 5MB</p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-start">
                  <div className="mb-6 md:mb-0">
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold text-gray-900">{companyDetails.name}</h1>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0"
                        onClick={() => setEditingCompanyDetails(true)}
                      >
                        <Edit className="h-3 w-3" />
                        <span className="sr-only">Edit Company Details</span>
                      </Button>
                    </div>
                    <p className="text-gray-600 whitespace-pre-line mt-1">{companyDetails.address}</p>
                    <p className="text-gray-600 mt-1">
                      Phone: {companyDetails.phone} | Email: {companyDetails.email}
                    </p>
                    <p className="text-gray-600 mt-1">
                      Registration: {companyDetails.registrationNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-3xl font-bold text-primary mb-2">QUOTATION</h2>
                    <p className="text-gray-700">
                      <span className="font-semibold">Ref:</span> {quotationNumber}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Date:</span> {new Date().toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Valid Until:</span> {clientData?.validUntil ? formatDate(clientData.validUntil) : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              
              {clientData && (
                <div className="p-8 border-b">
                  <div className="flex justify-between flex-col md:flex-row">
                    <div>
                      <h3 className="text-gray-500 text-sm uppercase font-semibold mb-2">From</h3>
                      <p className="font-semibold">{companyDetails.name}</p>
                      <p className="text-sm">{companyDetails.phone}</p>
                      <p className="text-sm">{companyDetails.email}</p>
                    </div>
                    
                    <div className="mt-4 md:mt-0">
                      <h3 className="text-gray-500 text-sm uppercase font-semibold mb-2">To</h3>
                      <p className="font-semibold">ATTN TO: {clientData.clientName}</p>
                      <p className="font-semibold">{clientData.projectName}</p>
                      <p className="whitespace-pre-line">{clientData.projectAddress}</p>
                      <p className="text-sm">{clientData.clientEmail}</p>
                      {clientData.clientPhone && (
                        <p className="text-sm">{clientData.clientPhone}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">SCOPE OF WORK</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("edit")}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit All Details
                  </Button>
                </div>
                {Object.entries(sections).map(([categoryKey, items], sectionIndex) => {
                  const category = constructionCategories.find(cat => cat.value === categoryKey);
                  return (
                    <div key={categoryKey} className="mb-8">
                      <h4 className="text-lg font-semibold mb-3">{category?.label || categoryKey}</h4>
                      <Table className="w-full border-collapse">
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="w-12">No</TableHead>
                            <TableHead className="w-1/3">Description</TableHead>
                            <TableHead>Size/Quantity</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead>Unit Price</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {items.map((item, index) => {
                            const subcategory = category?.subcategories.find(sub => sub.value === item.subcategory);
                            return (
                              <TableRow key={item.id} className="border-b">
                                <TableCell className="align-top font-medium">{index + 1}</TableCell>
                                <TableCell className="align-top">
                                  <div>
                                    <p className="font-medium">{subcategory?.label || item.description}</p>
                                    {editingLineItem === item.id ? (
                                      <div className="mt-1">
                                        <Textarea
                                          value={editedDescriptions[item.id] || item.description}
                                          onChange={(e) => handleEditDescription(item.id, e.target.value)}
                                          className="min-h-[60px] text-sm"
                                          autoFocus
                                        />
                                        <div className="flex justify-end mt-1 gap-2">
                                          <Button 
                                            size="sm" 
                                            variant="outline" 
                                            onClick={() => setEditingLineItem(null)}
                                          >
                                            Done
                                          </Button>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="flex items-start mt-1 group">
                                        <p className="text-sm text-gray-600 flex-grow">
                                          {editedDescriptions[item.id] || item.description}
                                        </p>
                                        <Button 
                                          size="sm" 
                                          variant="ghost" 
                                          className="h-6 px-2 invisible group-hover:visible"
                                          onClick={() => handleEditLineItemInPreview(item.id)}
                                        >
                                          <Edit className="h-3 w-3" />
                                          <span className="sr-only">Edit Description</span>
                                        </Button>
                                      </div>
                                    )}
                                    {item.materialName && (
                                      <p className="text-xs text-primary mt-1">
                                        Material: {item.materialName}
                                      </p>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell className="align-top">{item.quantity}</TableCell>
                                <TableCell className="align-top">{item.unit}</TableCell>
                                <TableCell className="align-top">{formatCurrency(item.unitPrice)}</TableCell>
                                <TableCell className="text-right align-top font-medium">{formatCurrency(item.total)}</TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                            <TableCell colSpan={5} className="text-right font-semibold">
                              Section Total:
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                              {formatCurrency(sectionTotals[sectionIndex]?.amount || 0)}
                            </TableCell>
                          </TableRow>
                        </TableFooter>
                      </Table>
                    </div>
                  );
                })}
                
                <div className="mt-8 border-t pt-4">
                  <div className="flex flex-col items-end">
                    <div className="w-full max-w-xs space-y-2">
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
                </div>
              </div>
              
              <div className="p-8 border-t">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Payment Terms</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingPaymentDetails(true)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">Payment Schedule:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>50% deposit upon acceptance of quotation</li>
                    <li>40% upon completion of major work, prior to final finishing</li>
                    <li>10% upon project completion and final inspection</li>
                  </ul>
                  
                  <p className="font-semibold mt-4">All payments to be made to:</p>
                  <p>{paymentDetails.accountName}</p>
                  <p>{paymentDetails.bankName}</p>
                  <p>Account: {paymentDetails.accountNumber}</p>
                </div>
              </div>
              
              <div className="p-8 border-t">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Terms and Conditions</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingTAndC(true)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
                <div className="whitespace-pre-line text-sm">
                  {termsAndConditions}
                </div>
              </div>
              
              <div className="p-8 border-t">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="md:w-1/2 mb-6 md:mb-0">
                    <p className="font-semibold mb-4">Client Acceptance:</p>
                    <div className="border-b border-dashed border-gray-400 pb-6 mb-2"></div>
                    <p>Name: ________________________________</p>
                    <p className="mt-2">Date: ________________________________</p>
                  </div>
                  
                  <div className="md:w-1/2 md:text-right">
                    <p className="font-semibold mb-4">Authorized by:</p>
                    <div className="border-b border-dashed border-gray-400 pb-6 mb-2"></div>
                    <p>Name: ________________________________</p>
                    <p className="mt-2">Date: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="edit" className="mt-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Logo</CardTitle>
                <CardDescription>Upload your company logo to appear on the quotation (max 5MB)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  {logoUrl ? (
                    <div className="relative">
                      <img 
                        src={logoUrl} 
                        alt="Company Logo" 
                        className="max-h-32 max-w-full object-contain border p-2 rounded-md" 
                      />
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="absolute -top-2 -right-2 rounded-full p-1 h-auto"
                        onClick={handleRemoveLogo}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-300 rounded-md p-8 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Upload a logo (max {MAX_LOGO_SIZE_MB}MB)</p>
                    </div>
                  )}
                  
                  <div>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      id="logo-upload" 
                      accept="image/*"
                      className="hidden" 
                      onChange={handleLogoUpload}
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingLogo}
                    >
                      {uploadingLogo ? "Uploading..." : "Upload Logo"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Edit your company details that appear on the quotation</CardDescription>
              </CardHeader>
              <CardContent>
                {editingCompanyDetails ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input 
                        id="companyName" 
                        value={companyDetails.name}
                        onChange={(e) => setCompanyDetails({...companyDetails, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="companyAddress">Company Address</Label>
                      <Textarea 
                        id="companyAddress" 
                        value={companyDetails.address}
                        onChange={(e) => setCompanyDetails({...companyDetails, address: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyPhone">Phone</Label>
                        <Input 
                          id="companyPhone" 
                          value={companyDetails.phone}
                          onChange={(e) => setCompanyDetails({...companyDetails, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="companyEmail">Email</Label>
                        <Input 
                          id="companyEmail" 
                          value={companyDetails.email}
                          onChange={(e) => setCompanyDetails({...companyDetails, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyWebsite">Website</Label>
                        <Input 
                          id="companyWebsite" 
                          value={companyDetails.website}
                          onChange={(e) => setCompanyDetails({...companyDetails, website: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="companyReg">Registration Number</Label>
                        <Input 
                          id="companyReg" 
                          value={companyDetails.registrationNumber}
                          onChange={(e) => setCompanyDetails({...companyDetails, registrationNumber: e.target.value})}
                        />
                      </div>
                    </div>
                    <Button onClick={handleSaveCompanyDetails}>Save Company Details</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{companyDetails.name}</h3>
                        <p className="whitespace-pre-line text-gray-600">{companyDetails.address}</p>
                        <p className="text-gray-600">Phone: {companyDetails.phone}</p>
                        <p className="text-gray-600">Email: {companyDetails.email}</p>
                        <p className="text-gray-600">Website: {companyDetails.website}</p>
                        <p className="text-gray-600">Registration: {companyDetails.registrationNumber}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditingCompanyDetails(true)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Banking Details</CardTitle>
                <CardDescription>Edit payment information for your clients</CardDescription>
              </CardHeader>
              <CardContent>
                {editingPaymentDetails ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input 
                        id="bankName" 
                        value={paymentDetails.bankName}
                        onChange={(e) => setPaymentDetails({...paymentDetails, bankName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="accountName">Account Name</Label>
                      <Input 
                        id="accountName" 
                        value={paymentDetails.accountName}
                        onChange={(e) => setPaymentDetails({...paymentDetails, accountName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input 
                        id="accountNumber" 
                        value={paymentDetails.accountNumber}
                        onChange={(e) => setPaymentDetails({...paymentDetails, accountNumber: e.target.value})}
                      />
                    </div>
                    <Button onClick={handleSavePaymentDetails}>Save Payment Details</Button>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div>
                      <p><span className="font-semibold">Bank Name:</span> {paymentDetails.bankName}</p>
                      <p><span className="font-semibold">Account Name:</span> {paymentDetails.accountName}</p>
                      <p><span className="font-semibold">Account Number:</span> {paymentDetails.accountNumber}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingPaymentDetails(true)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
                <CardDescription>Edit the terms and conditions that appear on your quotation</CardDescription>
              </CardHeader>
              <CardContent>
                {editingTAndC ? (
                  <div className="space-y-4">
                    <Textarea 
                      value={termsAndConditions}
                      onChange={(e) => setTermsAndConditions(e.target.value)}
                      className="min-h-[300px] font-mono text-sm"
                    />
                    <Button onClick={handleSaveTAndC}>Save Terms & Conditions</Button>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div className="whitespace-pre-line text-sm max-h-[300px] overflow-y-auto w-full">
                      {termsAndConditions}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingTAndC(true)}
                      className="ml-4 flex-shrink-0"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Line Item Descriptions</CardTitle>
                <CardDescription>Edit descriptions for each line item in your quotation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(sections).map(([categoryKey, items]) => {
                    const category = constructionCategories.find(cat => cat.value === categoryKey);
                    return (
                      <div key={categoryKey} className="border-b pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
                        <h4 className="font-semibold mb-3">{category?.label || categoryKey}</h4>
                        <div className="space-y-4">
                          {items.map((item, index) => {
                            const subcategory = category?.subcategories.find(sub => sub.value === item.subcategory);
                            return (
                              <div key={item.id} className="relative p-4 border rounded-md">
                                <div className="flex justify-between items-start">
                                  <div className="w-full">
                                    <p className="font-medium">
                                      {index + 1}. {subcategory?.label || item.subcategory || "Item"}
                                      {item.materialName ? ` - ${item.materialName}` : ""}
                                    </p>
                                    <Label htmlFor={`description-${item.id}`} className="text-sm text-gray-600 mt-2 block">
                                      Description
                                    </Label>
                                    <Textarea 
                                      id={`description-${item.id}`}
                                      value={editedDescriptions[item.id] || item.description}
                                      onChange={(e) => handleEditDescription(item.id, e.target.value)}
                                      className="mt-1"
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  <Button onClick={handleSaveQuotation}>Save All Descriptions</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Button 
            onClick={handleSaveQuotation} 
            className="flex-1 max-w-60"
          >
            <Save className="mr-2 h-4 w-4" />
            Save as XLSX/CSV
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 max-w-60"
            onClick={handleEmailToClient}
          >
            <Mail className="mr-2 h-4 w-4" />
            Email to Client
          </Button>
          <Button 
            variant="secondary" 
            className="flex-1 max-w-60"
            onClick={handleDownloadPDF}
          >
            <FileText className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
        
        <div className="flex justify-center mt-6">
          <Button 
            variant="outline" 
            onClick={handleNewQuotation}
          >
            <FileCheck className="mr-2 h-4 w-4" />
            Create New Quotation
          </Button>
        </div>
      </main>
      
      <EmailDialog
        open={emailDialogOpen}
        onOpenChange={setEmailDialogOpen}
        clientEmail={clientData?.clientEmail}
        clientName={clientData?.clientName}
        quotationNumber={quotationNumber}
        onSendEmail={handleSendEmail}
      />
    </div>
  );
};

export default QuotationExportPage;
