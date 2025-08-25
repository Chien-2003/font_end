'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Alert from '@/components/views/Alert';
import { useFileUpload } from '@/hooks/use-file-upload';
import { Category, getAllCategories } from '@/services/categoryApi';
import { createDiscount } from '@/services/discountApi';
import {
  Subcategory,
  getAllSubcategories,
} from '@/services/subcategoryApi';
import { uploadImage } from '@/services/uploadApi';
import { AlertCircleIcon, UploadIcon, XIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type AlertType = 'info' | 'error' | 'success';

export default function CreateDiscountForm() {
  const [form, setForm] = useState<{
    code: string;
    type: 'percentage' | 'fixed' | 'freeship';
    value: string;
    min_order_value: string;
    description: string;
    category_ids: string[];
    subcategory_ids: string[];
  }>({
    code: '',
    type: 'percentage',
    value: '',
    min_order_value: '',
    description: '',
    category_ids: [],
    subcategory_ids: [],
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<AlertType>('info');

  const maxSizeMB = 2;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  const [{ files }, { openFileDialog, removeFile, getInputProps }] =
    useFileUpload({
      accept:
        'image/svg+xml,image/png,image/jpeg,image/jpg,image/gif',
    });

  const imageFile = files[0]?.file;

  useEffect(() => {
    getAllCategories().then(setCategories);
    getAllSubcategories().then(setSubcategories);
  }, []);

  useEffect(() => {
    if (imageFile && imageFile.size > maxSizeBytes) {
      setErrorMsg(`File ảnh không được vượt quá ${maxSizeMB}MB`);
      removeFile(files[0]?.id);
    } else {
      setErrorMsg(null);
    }
  }, [imageFile, maxSizeBytes, removeFile, files]);

  const toggleCategory = (id: string) => {
    setForm((prev) => ({
      ...prev,
      category_ids: prev.category_ids.includes(id)
        ? prev.category_ids.filter((cid) => cid !== id)
        : [...prev.category_ids, id],
    }));
  };

  const toggleSubcategory = (id: string) => {
    setForm((prev) => ({
      ...prev,
      subcategory_ids: prev.subcategory_ids.includes(id)
        ? prev.subcategory_ids.filter((sid) => sid !== id)
        : [...prev.subcategory_ids, id],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !form.code.trim() ||
      !form.type ||
      !form.min_order_value.trim() ||
      !form.description.trim()
    ) {
      setAlertMessage('Vui lòng điền đầy đủ thông tin bắt buộc');
      setAlertType('error');
      return;
    }
    if (form.type !== 'freeship' && !form.value.trim()) {
      setAlertMessage('Vui lòng nhập giá trị giảm');
      setAlertType('error');
      return;
    }

    if (errorMsg) {
      setAlertMessage(errorMsg);
      setAlertType('error');
      return;
    }

    setLoading(true);
    try {
      let image_url: string | null = null;
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (!uploadedUrl) throw new Error('Lỗi upload ảnh');
        image_url = uploadedUrl;
      }

      await createDiscount({
        code: form.code.trim(),
        type: form.type,
        value: form.type !== 'freeship' ? Number(form.value) : null,
        min_order_value: Number(form.min_order_value),
        description: form.description.trim(),
        image_url,
        category_ids: form.category_ids,
        subcategory_ids: form.subcategory_ids,
      });

      setAlertMessage('Tạo mã giảm giá thành công!');
      setAlertType('success');

      setForm({
        code: '',
        type: 'percentage',
        value: '',
        min_order_value: '',
        description: '',
        category_ids: [],
        subcategory_ids: [],
      });
      removeFile(files[0]?.id);
    } catch (err) {
      console.error('Lỗi tạo mã giảm giá:', err);
      setAlertMessage('Tạo mã giảm giá thất bại!');
      setAlertType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full h-full py-8">
      <Card className="max-w-xl mx-auto p-4 space-y-6 dark:bg-gray-900">
        <CardHeader>
          <CardTitle>Tạo mã giảm giá</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 lg:px-6 md:px-2 px-0">
          <Input
            name="code"
            placeholder="Mã giảm giá *"
            value={form.code}
            onChange={handleChange}
          />
          <Select
            value={form.type}
            onValueChange={(value) =>
              setForm((prev) => ({
                ...prev,
                type: value as 'percentage' | 'fixed' | 'freeship',
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn loại giảm giá" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="percentage">Phần trăm</SelectItem>
                <SelectItem value="fixed">Cố định</SelectItem>
                <SelectItem value="freeship">
                  Miễn phí ship
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {form.type !== 'freeship' && (
            <Input
              name="value"
              placeholder="Giá trị giảm *"
              type="number"
              value={form.value}
              onChange={handleChange}
            />
          )}

          <Input
            name="min_order_value"
            placeholder="Giá trị tối thiểu đơn hàng *"
            type="number"
            value={form.min_order_value}
            onChange={handleChange}
          />

          <Input
            name="description"
            placeholder="Mô tả *"
            value={form.description}
            onChange={handleChange}
          />
          <Select value="" onValueChange={() => {}} open={false}>
            <Card className="border rounded-md p-4 dark:bg-gray-900">
              <CardHeader className="lg:px-6 md:px-2 px-0">
                <CardTitle>Chọn danh mục áp dụng</CardTitle>
              </CardHeader>
              <CardContent className="grid lg:grid-cols-2 grid-cols-2 gap-2 max-h-48 overflow-auto [&::-webkit-scrollbar]:hidden scrollbar-hide lg:px-6 md:px-2 px-0">
                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center space-x-1 lg:space-x-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={form.category_ids.includes(cat.id)}
                      onCheckedChange={() => toggleCategory(cat.id)}
                      id={`cat-${cat.id}`}
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </CardContent>
            </Card>
          </Select>
          <Select value="" onValueChange={() => {}} open={false}>
            <Card className="border rounded-md p-4 dark:bg-gray-900">
              <CardHeader className="lg:px-6 md:px-2 px-0">
                <CardTitle>Chọn danh mục con áp dụng</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2 max-h-48 overflow-auto [&::-webkit-scrollbar]:hidden scrollbar-hide lg:px-6 md:px-2 px-0">
                {subcategories.map((subcat) => (
                  <label
                    key={subcat.id}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={form.subcategory_ids.includes(
                        subcat.id,
                      )}
                      onCheckedChange={() =>
                        toggleSubcategory(subcat.id)
                      }
                      id={`subcat-${subcat.id}`}
                    />
                    <span>{subcat.name}</span>
                  </label>
                ))}
              </CardContent>
            </Card>
          </Select>

          <div
            className="border-input relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors"
            onDragEnter={(e) => e.preventDefault()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
          >
            <input
              {...getInputProps()}
              className="sr-only"
              aria-label="Upload image file"
            />
            {files[0]?.preview ? (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <img
                  src={files[0]?.preview}
                  alt={files[0]?.file?.name || 'Uploaded image'}
                  className="mx-auto max-h-full rounded object-contain"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                <p className="mb-1.5 text-sm font-medium">
                  Thả ảnh vào đây
                </p>
                <p className="text-muted-foreground text-xs">
                  SVG, PNG, JPG hoặc GIF (tối đa {maxSizeMB}MB)
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={openFileDialog}
                >
                  <UploadIcon
                    className="-ms-1 size-4 opacity-60"
                    aria-hidden="true"
                  />
                  Chọn ảnh
                </Button>
              </div>
            )}
            {files[0]?.preview && (
              <button
                type="button"
                className="absolute top-4 right-4 focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 focus-visible:ring-[1px]"
                onClick={() => removeFile(files[0]?.id)}
                aria-label="Xóa ảnh"
              >
                <XIcon className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {errorMsg && (
            <div
              className="text-destructive flex items-center gap-1 text-xs mt-2"
              role="alert"
            >
              <AlertCircleIcon className="size-3 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full dark:text-white"
          >
            {loading ? 'Đang gửi...' : 'Tạo mã giảm giá'}
          </Button>
        </CardContent>
      </Card>

      <Alert
        type={alertType}
        message={alertMessage}
        duration={3000}
        onClose={() => setAlertMessage('')}
      />
    </div>
  );
}
