import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ClientFormData } from '@/pages/QuotationClient';

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

interface QuotationExportData {
  clientData: ClientFormData;
  lineItems: LineItem[];
  quotationNumber: string;
  subtotal: number;
  taxRate: number;
  discount: number;
  termsAndConditions: string;
}

export const exportToXLSX = (data: QuotationExportData) => {
  const { 
    clientData, 
    lineItems, 
    quotationNumber, 
    subtotal, 
    taxRate, 
    discount, 
    termsAndConditions 
  } = data;

  // Company Information Worksheet
  const companySheet = [
    ['Soterra Construction Quotation'],
    ['Quotation Number', quotationNumber],
    ['Date', new Date().toLocaleDateString()],
    [],
    ['Client Information'],
    ['Name', clientData.clientName],
    ['Email', clientData.clientEmail],
    ['Phone', clientData.clientPhone || 'N/A'],
    ['Project Name', clientData.projectName],
    ['Project Address', clientData.projectAddress],
    [],
    ['Quotation Details'],
    ['Valid Until', new Date(clientData.validUntil).toLocaleDateString()],
    ['Payment Terms', clientData.paymentTerms]
  ];

  // Line Items Worksheet
  const lineItemsSheet = [
    ['Category', 'Subcategory', 'Description', 'Quantity', 'Unit', 'Unit Price', 'Total'],
    ...lineItems.map(item => [
      item.category,
      item.subcategory,
      item.description,
      item.quantity,
      item.unit,
      item.unitPrice,
      item.total
    ])
  ];

  // Financial Summary Worksheet
  const financialSheet = [
    ['Financial Summary'],
    ['Subtotal', subtotal],
    ['Tax Rate', `${taxRate}%`],
    ['Tax Amount', subtotal * (taxRate / 100)],
    ['Discount', `${discount}%`],
    ['Discount Amount', subtotal * (discount / 100)],
    ['Total', subtotal * (1 + taxRate / 100) * (1 - discount / 100)]
  ];

  // Terms & Conditions Worksheet
  const termsSheet = termsAndConditions.split('\n').map(term => [term]);

  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(companySheet), 'Company Info');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(lineItemsSheet), 'Line Items');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(financialSheet), 'Financial Summary');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(termsSheet), 'Terms & Conditions');

  // Generate and save XLSX file
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `Quotation_${quotationNumber}.xlsx`);
};

export const exportToCSV = (data: QuotationExportData) => {
  const { 
    clientData, 
    lineItems, 
    quotationNumber, 
    subtotal, 
    taxRate, 
    discount, 
    termsAndConditions 
  } = data;

  // Combine all data into a single CSV
  const csvData = [
    // Company & Client Info
    ['Soterra Construction Quotation'],
    ['Quotation Number', quotationNumber],
    ['Date', new Date().toLocaleDateString()],
    [''],
    ['Client Information'],
    ['Name', clientData.clientName],
    ['Email', clientData.clientEmail],
    ['Phone', clientData.clientPhone || 'N/A'],
    ['Project Name', clientData.projectName],
    ['Project Address', clientData.projectAddress],
    [''],
    ['Quotation Details'],
    ['Valid Until', new Date(clientData.validUntil).toLocaleDateString()],
    ['Payment Terms', clientData.paymentTerms],
    [''],
    // Line Items
    ['Line Items'],
    ['Category', 'Subcategory', 'Description', 'Quantity', 'Unit', 'Unit Price', 'Total'],
    ...lineItems.map(item => [
      item.category,
      item.subcategory,
      item.description,
      item.quantity,
      item.unit,
      item.unitPrice,
      item.total
    ]),
    [''],
    // Financial Summary
    ['Financial Summary'],
    ['Subtotal', subtotal],
    ['Tax Rate', `${taxRate}%`],
    ['Tax Amount', subtotal * (taxRate / 100)],
    ['Discount', `${discount}%`],
    ['Discount Amount', subtotal * (discount / 100)],
    ['Total', subtotal * (1 + taxRate / 100) * (1 - discount / 100)],
    [''],
    // Terms & Conditions
    ['Terms & Conditions'],
    ...termsAndConditions.split('\n').map(term => [term])
  ];

  // Convert to CSV
  const csvContent = csvData.map(row => 
    row.map(cell => 
      typeof cell === 'string' ? `"${cell.replace(/"/g, '""')}"` : cell
    ).join(',')
  ).join('\n');

  // Create and save CSV file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `Quotation_${quotationNumber}.csv`);
};
