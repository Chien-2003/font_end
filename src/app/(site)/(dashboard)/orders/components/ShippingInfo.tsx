'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Mail,
  MapPin,
  Phone,
  Truck,
  User,
} from 'lucide-react';
import { useState } from 'react';

interface ShippingInfoProps {
  name: string;
  setName: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  email: string;
  detail: string;
  setDetail: (val: string) => void;
  provinceCode: string;
  setProvinceCode: (val: string) => void;
  districtCode: string;
  setDistrictCode: (val: string) => void;
  wardCode: string;
  setWardCode: (val: string) => void;
  provinces: any[];
  districts: any[];
  wards: any[];
}

export default function ShippingInfo({
  name,
  setName,
  phone,
  setPhone,
  email,
  detail,
  setDetail,
  provinceCode,
  setProvinceCode,
  districtCode,
  setDistrictCode,
  wardCode,
  setWardCode,
  provinces,
  districts,
  wards,
}: ShippingInfoProps) {
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'name':
        newErrors.name = !value.trim() || value.trim().length < 2;
        break;
      case 'phone':
        newErrors.phone = !/^[0-9]{10,11}$/.test(
          value.replace(/\s/g, ''),
        );
        break;
      case 'detail':
        newErrors.detail = !value.trim() || value.trim().length < 10;
        break;
    }

    setErrors(newErrors);
  };

  const isFormValid =
    name &&
    phone &&
    detail &&
    provinceCode &&
    districtCode &&
    wardCode &&
    !errors.name &&
    !errors.phone &&
    !errors.detail;

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/20 rounded-2xl">
            <Truck className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Thông tin giao hàng
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Vui lòng cung cấp thông tin chính xác để đảm bảo giao
              hàng thành công
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <div
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              isFormValid ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
          ></div>
          <div className="text-sm font-medium text-muted-foreground">
            {isFormValid
              ? 'Thông tin đã hoàn tất'
              : 'Vui lòng điền đầy đủ thông tin'}
          </div>
          {isFormValid && (
            <CheckCircle2 className="w-5 h-5 text-primary ml-2" />
          )}
        </div>
      </div>
      <div className="bg-card dark:bg-gray rounded-2xl border border-border/50 p-6 space-y-6 hover:shadow transition-shadow duration-300">
        <div className="flex items-center gap-3 border-b border-border/30 pb-4">
          <User className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg text-foreground">
            Thông tin cá nhân
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-foreground flex items-center gap-2"
            >
              <User className="w-4 h-4 text-primary" />
              Họ và tên <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="name"
                placeholder="Nhập họ và tên đầy đủ"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  validateField('name', e.target.value);
                }}
                className={`h-12 pl-4 transition-all duration-200 ${
                  errors.name
                    ? 'border-destructive/50 focus:border-destructive'
                    : name
                      ? 'border-primary/50 focus:border-primary'
                      : 'border-border/50 focus:border-primary/50'
                } hover:border-primary/30`}
              />
              {name && !errors.name && (
                <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
              )}
              {errors.name && (
                <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
              )}
            </div>
            {errors.name && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Họ tên phải có ít nhất 2 ký tự
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-foreground flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-primary" />
              Số điện thoại{' '}
              <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="phone"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  validateField('phone', e.target.value);
                }}
                className={`h-12 pl-4 transition-all duration-200 ${
                  errors.phone
                    ? 'border-destructive/50 focus:border-destructive'
                    : phone
                      ? 'border-primary/50 focus:border-primary'
                      : 'border-border/50 focus:border-primary/50'
                } hover:border-primary/30`}
              />
              {phone && !errors.phone && (
                <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
              )}
              {errors.phone && (
                <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
              )}
            </div>
            {errors.phone && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Số điện thoại không hợp lệ (10-11 số)
              </p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-foreground flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-muted-foreground" />
            Email
          </Label>
          <div className="relative">
            <Input
              id="email"
              placeholder="Email đã được liên kết với tài khoản"
              value={email}
              disabled
              className="h-12 pl-4 bg-muted/30 border-muted-foreground/20 text-muted-foreground"
            />
            <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
          </div>
        </div>
      </div>
      <div className="bg-card dark:bg-gray rounded-2xl border border-border/50 p-6 space-y-6 hover:shadow transition-shadow duration-300">
        <div className="flex items-center gap-3 border-b border-border/30 pb-4">
          <MapPin className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg text-foreground">
            Địa chỉ giao hàng
          </h3>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="detail"
            className="text-sm font-medium text-foreground flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-primary" />
            Số nhà, tên đường{' '}
            <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="detail"
              placeholder="Ví dụ: 123 Nguyễn Văn A, Phường 1"
              value={detail}
              onChange={(e) => {
                setDetail(e.target.value);
                validateField('detail', e.target.value);
              }}
              className={`h-12 pl-4 transition-all duration-200 ${
                errors.detail
                  ? 'border-destructive/50 focus:border-destructive'
                  : detail
                    ? 'border-primary/50 focus:border-primary'
                    : 'border-border/50 focus:border-primary/50'
              } hover:border-primary/30`}
            />
            {detail && !errors.detail && (
              <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
            )}
            {errors.detail && (
              <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
            )}
          </div>
          {errors.detail && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Địa chỉ phải có ít nhất 10 ký tự
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Tỉnh/Thành phố{' '}
              <span className="text-destructive">*</span>
            </Label>
            <Select
              onValueChange={setProvinceCode}
              value={provinceCode}
            >
              <SelectTrigger
                className={`h-12 transition-all duration-200 ${
                  provinceCode
                    ? 'border-primary/50 focus:border-primary'
                    : 'border-border/50 focus:border-primary/50'
                } hover:border-primary/30`}
              >
                <SelectValue placeholder="Chọn tỉnh/thành" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((p) => (
                  <SelectItem
                    key={p.code}
                    value={p.code}
                    className="hover:bg-accent/50"
                  >
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Quận/Huyện <span className="text-destructive">*</span>
            </Label>
            <Select
              onValueChange={setDistrictCode}
              value={districtCode}
              disabled={!provinceCode}
            >
              <SelectTrigger
                className={`h-12 transition-all duration-200 ${
                  !provinceCode
                    ? 'bg-muted/30 border-muted-foreground/20'
                    : districtCode
                      ? 'border-primary/50 focus:border-primary'
                      : 'border-border/50 focus:border-primary/50'
                } hover:border-primary/30`}
              >
                <SelectValue placeholder="Chọn quận/huyện" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((d) => (
                  <SelectItem
                    key={d.code}
                    value={d.code}
                    className="hover:bg-accent/50"
                  >
                    {d.name_with_type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Phường/Xã <span className="text-destructive">*</span>
            </Label>
            <Select
              onValueChange={setWardCode}
              value={wardCode}
              disabled={!districtCode}
            >
              <SelectTrigger
                className={`h-12 transition-all duration-200 ${
                  !districtCode
                    ? 'bg-muted/30 border-muted-foreground/20'
                    : wardCode
                      ? 'border-primary/50 focus:border-primary'
                      : 'border-border/50 focus:border-primary/50'
                } hover:border-primary/30`}
              >
                <SelectValue placeholder="Chọn phường/xã" />
              </SelectTrigger>
              <SelectContent>
                {wards.map((w) => (
                  <SelectItem
                    key={w.code}
                    value={w.code}
                    className="hover:bg-accent/50"
                  >
                    {w.name_with_type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="bg-card dark:bg-gray rounded-2xl border border-border/50 p-6 space-y-6 hover:shadow transition-shadow duration-300">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-primary" />
          <Label
            htmlFor="note"
            className="text-sm font-medium text-foreground"
          >
            Ghi chú đặc biệt (Tùy chọn)
          </Label>
        </div>
        <Textarea
          id="note"
          placeholder="Ví dụ: Giao hàng sau 6h chiều, gọi trước khi đến..."
          className="min-h-24 resize-none border-border/50 focus:border-primary/50 hover:border-primary/30 transition-all duration-200"
        />
        <p className="text-xs text-muted-foreground">
          Nhập các yêu cầu đặc biệt về thời gian và cách thức giao
          hàng
        </p>
      </div>
      <div className="relative max-lg:hidden">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gradient-to-r from-transparent via-border to-transparent"></div>
        </div>
        <div className="relative flex my-5 justify-center">
          <div className="bg-background dark:bg-gray px-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary/40"></div>
              <div className="w-3 h-3 rounded-full bg-primary/60"></div>
              <div className="w-2 h-2 rounded-full bg-primary/40"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
