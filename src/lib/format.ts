export function formatCurrency(value: string | number): string {
  const numberValue =
    typeof value === 'string' ? Number(value) : value;
  if (isNaN(numberValue)) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(numberValue);
}
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('vi-VN').format(value);
}
