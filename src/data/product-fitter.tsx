export type FilterOption = {
  id: string;
  label: string;
  color?: string;
};

export type FilterItem = {
  id: string;
  title: string;
  options: FilterOption[];
};
export const items: FilterItem[] = [
  {
    id: 'price',
    title: 'Khoảng giá',
    options: [
      { id: 'under-200k', label: 'Dưới 200.000đ' },
      { id: '200k-500k', label: '200.000đ - 500.000đ' },
      { id: '500k-1m', label: '500.000đ - 1.000.000đ' },
      { id: 'above-1m', label: 'Trên 1.000.000đ' },
    ],
  },
  {
    id: 'color',
    title: 'Màu sắc',
    options: [
      { id: 'black', label: 'Đen', color: 'bg-black' },
      {
        id: 'white',
        label: 'Trắng',
        color: 'bg-white border border-gray-300',
      },
      { id: 'gray', label: 'Xám', color: 'bg-gray-500' },
      { id: 'blue', label: 'Xanh dương', color: 'bg-blue-500' },
      { id: 'red', label: 'Đỏ', color: 'bg-red-500' },
      { id: 'green', label: 'Xanh lá', color: 'bg-green-500' },
    ],
  },
  {
    id: 'size',
    title: 'Kích thước',
    options: [
      { id: 'xs', label: 'XS' },
      { id: 's', label: 'S' },
      { id: 'm', label: 'M' },
      { id: 'l', label: 'L' },
      { id: 'xl', label: 'XL' },
      { id: 'xxl', label: 'XXL' },
    ],
  },
  {
    id: 'rating',
    title: 'Đánh giá',
    options: [
      { id: '5-star', label: '5 sao' },
      { id: '4-star', label: '4 sao trở lên' },
      { id: '3-star', label: '3 sao trở lên' },
    ],
  },
];
