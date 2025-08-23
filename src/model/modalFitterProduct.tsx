'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { SortType } from '@/types/sort';
import { FunnelPlus } from 'lucide-react';
import { useState } from 'react';
interface ModalFitterProductProps {
  sort: SortType;
  onSortChange: (value: SortType) => void;
}

export default function ModalFitterProduct({
  sort,
  onSortChange,
}: ModalFitterProductProps) {
  const [selected, setSelected] = useState<SortType>(sort);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-white hover:bg-primary/90 bg-primary rounded-full transform transition-colors"
        >
          <FunnelPlus className="w-6 h-6" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Bộ lọc sản phẩm</AlertDialogTitle>
          <AlertDialogDescription>
            Chọn sắp xếp để hiển thị sản phẩm phù hợp.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Sort options */}
        <div className="py-4 space-y-4">
          <RadioGroup
            value={selected}
            onValueChange={(val) => setSelected(val as SortType)} // ép kiểu
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="newest" id="newest" />
              <Label htmlFor="newest">Mới nhất</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="oldest" id="oldest" />
              <Label htmlFor="oldest">Cũ nhất</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price_asc" id="price_asc" />
              <Label htmlFor="price_asc">Giá tăng dần</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price_desc" id="price_desc" />
              <Label htmlFor="price_desc">Giá giảm dần</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="name_asc" id="name_asc" />
              <Label htmlFor="name_asc">Tên A → Z</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="name_desc" id="name_desc" />
              <Label htmlFor="name_desc">Tên Z → A</Label>
            </div>
          </RadioGroup>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="rounded">
            Đóng
          </AlertDialogCancel>
          <AlertDialogAction
            className="rounded"
            onClick={() => onSortChange(selected)}
          >
            Xác nhận
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
