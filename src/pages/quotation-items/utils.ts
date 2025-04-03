
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ms-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 2
  }).format(amount);
};

export const calculateTax = (subtotal: number, taxRate: number) => {
  return subtotal * (taxRate / 100);
};

export const calculateDiscount = (subtotal: number, discount: number) => {
  return subtotal * (discount / 100);
};

export const calculateTotal = (subtotal: number, taxRate: number, discount: number) => {
  return subtotal + calculateTax(subtotal, taxRate) - calculateDiscount(subtotal, discount);
};
