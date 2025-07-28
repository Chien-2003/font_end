'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { showError, showSuccess } from '@/lib/swal';
import { Switch } from '@/components/ui/switch';
import { Trash2, Plus } from 'lucide-react';
import { BannerFormData, createBanner } from '@/lib/bannerApi';

export default function BannerAdminPage() {
  const [bannerForm, setBannerForm] = useState<BannerFormData>({
    title: '',
    image_url: [''],
    link: '',
    description: '',
    is_active: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBannerForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUrlChange = (index: number, value: string) => {
    setBannerForm((prev) => {
      const newImages = [...prev.image_url];
      newImages[index] = value;
      return { ...prev, image_url: newImages };
    });
  };

  const addImageUrl = () => {
    setBannerForm((prev) => ({
      ...prev,
      image_url: [...prev.image_url, ''],
    }));
  };

  const removeImageUrl = (index: number) => {
    if (bannerForm.image_url.length <= 1) return;
    setBannerForm((prev) => ({
      ...prev,
      image_url: prev.image_url.filter((_, i) => i !== index),
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setBannerForm((prev) => ({
      ...prev,
      is_active: checked,
    }));
  };

  const handleSubmit = async () => {
    if (!bannerForm.title) {
      showError('Vui lòng nhập tiêu đề banner.');
      return;
    }
    const filteredImages = bannerForm.image_url.filter(
      (url) => url.trim() !== '',
    );
    if (filteredImages.length === 0) {
      showError('Vui lòng nhập ít nhất một URL ảnh hợp lệ.');
      return;
    }

    const data: BannerFormData = {
      ...bannerForm,
      image_url: filteredImages,
    };

    try {
      await createBanner(data);
      showSuccess('Tạo banner thành công!');
      setBannerForm({
        title: '',
        image_url: [''],
        link: '',
        description: '',
        is_active: true,
      });
    } catch (err) {
      console.error(err);
      showError('Tạo banner thất bại!');
    }
  };

  return (
    <div className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full lg:w-[70%] h-full py-8">
      <Typography variant="h1" className="text-2xl font-bold mb-6">
        Tạo quản lý Banner
      </Typography>
      <Card className="col-start-1 col-end-8 dark:bg-gray-900">
        <CardContent className="space-y-4">
          <Input
            name="title"
            value={bannerForm.title}
            onChange={handleChange}
            placeholder="Tiêu đề banner"
          />
          <div>
            <label className="block mb-1 font-medium">
              URL ảnh banner
            </label>
            {bannerForm.image_url.map((url, index) => (
              <div
                key={index}
                className="flex items-center gap-2 mb-2"
              >
                <Input
                  placeholder="URL ảnh"
                  value={url}
                  onChange={(e) =>
                    handleImageUrlChange(index, e.target.value)
                  }
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeImageUrl(index)}
                  disabled={bannerForm.image_url.length === 1}
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addImageUrl}
              className="mt-2"
            >
              <Plus /> Thêm ảnh
            </Button>
          </div>
          <Input
            name="link"
            value={bannerForm.link}
            onChange={handleChange}
            placeholder="Đường dẫn liên kết (nếu có)"
          />
          <Textarea
            name="description"
            value={bannerForm.description}
            onChange={handleChange}
            placeholder="Mô tả banner"
            rows={4}
          />
          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={bannerForm.is_active}
              onCheckedChange={(checked) => {
                if (typeof checked === 'boolean') {
                  handleCheckboxChange(checked);
                }
              }}
            />
            <label htmlFor="is_active" className="select-none">
              {bannerForm.is_active ? 'Bật' : 'Tắt'}
            </label>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleSubmit}
            className="w-full text-white"
          >
            Tạo banner
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
