'use client';

import { useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';

import { createProduct, CreateProductData } from '@/lib/productsApi';
import { getAllCategories, Category } from '@/lib/categoryApi';
import {
  getAllSubcategories,
  Subcategory,
} from '@/lib/subcategoryApi';
import { showError, showSuccess } from '@/lib/swal';
import { Typography } from '@/components/ui/typography';

interface ProductForm {
  name: string;
  description: string;
  price: string;
  image_url: string;
  image_hover_url: string;
  category_id: string;
  subcategory_id: string;
}

interface Variant {
  color: string;
  size: string;
  quantity: number;
}

export default function CreateProductPage() {
  const [product, setProduct] = useState<ProductForm>({
    name: '',
    description: '',
    price: '',
    image_url: '',
    image_hover_url: '',
    category_id: '',
    subcategory_id: '',
  });

  const [variants, setVariants] = useState<Variant[]>([
    { color: '', size: '', quantity: 1 },
  ]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>(
    [],
  );

  useEffect(() => {
    getAllCategories().then(setCategories).catch(console.error);
    getAllSubcategories().then(setSubcategories).catch(console.error);
  }, []);

  const filteredSubcategories = useMemo(
    () =>
      subcategories.filter(
        (sc) => sc.categoryId === Number(product.category_id),
      ),
    [subcategories, product.category_id],
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'category_id' ? { subcategory_id: '' } : {}),
    }));
  };

  const handleVariantChange = (
    index: number,
    field: keyof Variant,
    value: string,
  ) => {
    setVariants((prev) =>
      prev.map((v, i) =>
        i === index
          ? {
              ...v,
              [field]: field === 'quantity' ? Number(value) : value,
            }
          : v,
      ),
    );
  };

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { color: '', size: '', quantity: 0 },
    ]);
  };

  const removeVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!product.name || !product.price || !product.category_id) {
      showError('Vui lòng điền đầy đủ tên, giá và danh mục.');
      return;
    }
    const payload: CreateProductData = {
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      image_url: product.image_url,
      image_hover_url: product.image_hover_url,
      category_id: Number(product.category_id),
      subcategory_id: product.subcategory_id
        ? Number(product.subcategory_id)
        : undefined,
      variants,
    };
    try {
      await createProduct(payload);
      showSuccess('Tạo sản phẩm thành công!');
      setProduct({
        name: '',
        description: '',
        price: '',
        image_url: '',
        image_hover_url: '',
        category_id: '',
        subcategory_id: '',
      });
      setVariants([{ color: '', size: '', quantity: 0 }]);
    } catch {
      showError('Tạo sản phẩm thất bại!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Typography variant="h1" className="text-2xl font-bold mb-6">
        Tạo sản phẩm mới
      </Typography>

      <Card className="mb-6">
        <CardHeader className="grid gap-4">
          <Input
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Tên sản phẩm"
          />
          <Textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Mô tả"
            rows={5}
          />
          <Input
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Giá"
            type="number"
          />
          <Input
            name="image_url"
            value={product.image_url}
            onChange={handleChange}
            placeholder="Ảnh chính"
          />
          <Input
            name="image_hover_url"
            value={product.image_hover_url}
            onChange={handleChange}
            placeholder="Ảnh hover"
          />
          <Select
            value={product.category_id}
            onValueChange={(val) =>
              handleChange({
                target: { name: 'category_id', value: val },
              } as any)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id.toString()}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={product.subcategory_id}
            onValueChange={(val) =>
              handleChange({
                target: { name: 'subcategory_id', value: val },
              } as any)
            }
            disabled={!product.category_id}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn danh mục con" />
            </SelectTrigger>
            <SelectContent>
              {filteredSubcategories.map((sc) => (
                <SelectItem key={sc.id} value={sc.id.toString()}>
                  {sc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-lg font-semibold">Biến thể sản phẩm</h2>
        </CardHeader>
        <CardContent className="grid gap-4">
          {variants.map((variant, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-2 items-end"
            >
              <Input
                placeholder="Màu"
                value={variant.color}
                onChange={(e) =>
                  handleVariantChange(index, 'color', e.target.value)
                }
              />
              <Input
                placeholder="Kích cỡ"
                value={variant.size}
                onChange={(e) =>
                  handleVariantChange(index, 'size', e.target.value)
                }
              />
              <Input
                type="number"
                placeholder="Số lượng"
                value={variant.quantity.toString()}
                onChange={(e) =>
                  handleVariantChange(
                    index,
                    'quantity',
                    e.target.value,
                  )
                }
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeVariant(index)}
                disabled={variants.length === 1}
              >
                <Trash2 className="w-4 h-4 mr-2" /> Xoá
              </Button>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            onClick={addVariant}
            variant="outline"
          >
            <Plus className="w-4 h-4 mr-2" /> Thêm biến thể
          </Button>
        </CardFooter>
      </Card>

      <div className="text-right">
        <Button onClick={handleSubmit} className="px-6">
          Tạo sản phẩm
        </Button>
      </div>
    </div>
  );
}
