
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

// Helper function to add empty rows
const addEmptyRows = (count: number) => Array(count).fill(['']);

export const exportToXLSX = (data: QuotationExportData) => {
  const { 
    clientData, 
    lineItems, 
    quotationNumber,
    subtotal, 
    taxRate, 
    discount
  } = data;

  // Company logo and header information
  const worksheet = [
    [''], // A1
    ['', '', '', 'Soterra Zenith'], // B2-E2
    ['', '', '', 'Turning idea into Structure Builder'], // B3-E3
    ['', '', '', 'CA0397550-H'], // B4-E4
    [''], // A5
    ['Level 3A, Sunway Visio Tower, Lingkaran'], // A6
    ['SV, Sunway Velocity, 55100 Kuala Lumpur.'], // A7
    [''], // A8
    ['', '', '', '', '', '', '', 'Quotation'], // A9-I9
    [''], // A10
    ['Name:', clientData.clientName], // A11-B11
    ['H/P:', clientData.clientPhone || ''], // A12-B12
    ['Email:', clientData.clientEmail], // A13-B13
    [''], // A14
    ['', '', '', '', '', '', '', 'Ref:', quotationNumber], // A15-I15
    ['', '', '', '', '', '', '', 'Date:', new Date().toLocaleDateString('en-MY')], // A16-I16
    [''], // A17
    ['ATTN TO:', clientData.clientName], // A18-B18
    ['', clientData.projectName], // A19-B19
    ['', clientData.projectAddress], // A20-B20
    [''], // A21
    ['', clientData.projectDescription], // A22-B22
    [''], // A23
    // Table header
    ['No', 'DESCRIPTION', 'Size', 'QTY', 'Price', 'AMOUNT'], // A24-F24
    // Line items
    ...lineItems.map((item, index) => [
      index + 1,
      item.description,
      '',
      item.quantity,
      item.unitPrice,
      item.total
    ]),
    [''], // Empty row after items
    ['', '', '', '', 'Subtotal:', subtotal], // Subtotal row
    ['', '', '', '', 'Tax Rate:', `${taxRate}%`], // Tax rate row
    ['', '', '', '', 'Tax Amount:', subtotal * (taxRate / 100)], // Tax amount row
    ['', '', '', '', 'Discount:', `${discount}%`], // Discount row
    ['', '', '', '', 'Discount Amount:', subtotal * (discount / 100)], // Discount amount row
    ['', '', '', '', 'Total:', subtotal * (1 + taxRate / 100) * (1 - discount / 100)] // Total row
  ];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(worksheet);

  // Set column widths
  const cols = [
    { wch: 5 },  // A
    { wch: 40 }, // B
    { wch: 10 }, // C
    { wch: 8 },  // D
    { wch: 12 }, // E
    { wch: 12 }  // F
  ];
  ws['!cols'] = cols;

  XLSX.utils.book_append_sheet(wb, ws, 'Quotation');
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
    discount
  } = data;

  // Create CSV data with the same layout as XLSX
  const csvData = [
    [''],
    ['', '', '', 'Soterra Zenith'],
    ['', '', '', 'Turning idea into Structure Builder'],
    ['', '', '', 'CA0397550-H'],
    [''],
    ['Level 3A, Sunway Visio Tower, Lingkaran'],
    ['SV, Sunway Velocity, 55100 Kuala Lumpur.'],
    [''],
    ['', '', '', '', '', '', '', 'Quotation'],
    [''],
    ['Name:', clientData.clientName],
    ['H/P:', clientData.clientPhone || ''],
    ['Email:', clientData.clientEmail],
    [''],
    ['', '', '', '', '', '', '', 'Ref:', quotationNumber],
    ['', '', '', '', '', '', '', 'Date:', new Date().toLocaleDateString('en-MY')],
    [''],
    ['ATTN TO:', clientData.clientName],
    ['', clientData.projectName],
    ['', clientData.projectAddress],
    [''],
    ['', clientData.projectDescription],
    [''],
    // Table header
    ['No', 'DESCRIPTION', 'Size', 'QTY', 'Price', 'AMOUNT'],
    // Line items
    ...lineItems.map((item, index) => [
      index + 1,
      item.description,
      '',
      item.quantity,
      item.unitPrice,
      item.total
    ]),
    [''],
    ['', '', '', '', 'Subtotal:', subtotal],
    ['', '', '', '', 'Tax Rate:', `${taxRate}%`],
    ['', '', '', '', 'Tax Amount:', subtotal * (taxRate / 100)],
    ['', '', '', '', 'Discount:', `${discount}%`],
    ['', '', '', '', 'Discount Amount:', subtotal * (discount / 100)],
    ['', '', '', '', 'Total:', subtotal * (1 + taxRate / 100) * (1 - discount / 100)]
  ];

  // Convert to CSV string
  const csvContent = csvData.map(row => 
    row.map(cell => 
      typeof cell === 'string' ? `"${cell.replace(/"/g, '""')}"` : cell
    ).join(',')
  ).join('\n');

  // Create and save CSV file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `Quotation_${quotationNumber}.csv`);
};

