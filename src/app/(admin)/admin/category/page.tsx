'use client';

import Alert from '@/components/shared/Alert';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Category,
  getAllCategories,
  updateCategory,
} from '@/services/categoryApi';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [editing, setEditing] = useState<
    Record<string, Partial<Category>>
  >({});
  const [alert, setAlert] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;

    getAllCategories().then((data) => {
      if (isMounted) setCategories(data);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
    const category = categories.find((c) => c.id === id);
    if (category) {
      setEditing((prev) => ({
        ...prev,
        [id]: {
          name: category.name,
          slug_category: category.slug_category,
          category_type: category.category_type,
          image: category.image,
        },
      }));
    }
  };

  const handleChange = (
    id: string,
    field: keyof Category,
    value: string,
  ) => {
    setEditing((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSave = async (id: string) => {
    const updatedData = editing[id];
    try {
      if (!updatedData) throw new Error('No data to update');

      const updated = await updateCategory(id, updatedData);

      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? updated : cat)),
      );

      setAlert({ type: 'success', message: 'Cập nhật thành công' });
    } catch (error) {
      console.error('Update failed:', error);
      setAlert({ type: 'error', message: 'Cập nhật thất bại' });
    }
  };

  return (
    <Fragment>
      <div className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full h-full py-8">
        <div className="text-2xl font-semibold mb-4">
          Danh sách danh mục
        </div>
        <div className="grid gap-4">
          {categories.map((category) => (
            <Accordion
              key={category.id}
              type="single"
              collapsible
              value={openId === category.id ? category.id : ''}
              onValueChange={() => handleToggle(category.id)}
            >
              <AccordionItem value={category.id}>
                <div className="border p-4 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-bold text-lg">
                          Name: {category.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          Type: {category.category_type}
                        </div>
                        <div className="text-sm text-gray-500">
                          Slug: {category.slug_category}
                        </div>
                      </div>
                    </div>

                    <AccordionTrigger className="px-4 py-2 border rounded-md text-sm font-medium cursor-pointer">
                      Chỉnh sửa
                    </AccordionTrigger>
                  </div>

                  <AccordionContent>
                    <div className="mt-4 grid gap-4 mx-auto w-full">
                      <Input
                        value={editing[category.id]?.name || ''}
                        onChange={(e) =>
                          handleChange(
                            category.id,
                            'name',
                            e.target.value,
                          )
                        }
                        placeholder="Tên danh mục"
                      />
                      <Input
                        value={
                          editing[category.id]?.slug_category || ''
                        }
                        onChange={(e) =>
                          handleChange(
                            category.id,
                            'slug_category',
                            e.target.value,
                          )
                        }
                        placeholder="Slug"
                      />
                      <Input
                        value={
                          editing[category.id]?.category_type || ''
                        }
                        onChange={(e) =>
                          handleChange(
                            category.id,
                            'category_type',
                            e.target.value,
                          )
                        }
                        placeholder="category_type"
                      />
                      <Input
                        value={editing[category.id]?.image || ''}
                        onChange={(e) =>
                          handleChange(
                            category.id,
                            'image',
                            e.target.value,
                          )
                        }
                        placeholder="URL hình ảnh"
                      />
                      <div className="flex w-full justify-center">
                        <Button
                          variant="default"
                          className="w-auto text-white"
                          onClick={() => handleSave(category.id)}
                        >
                          Lưu
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </div>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
    </Fragment>
  );
}
