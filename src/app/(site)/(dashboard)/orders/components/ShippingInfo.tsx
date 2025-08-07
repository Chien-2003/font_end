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
  return (
    <div className="space-y-4">
      <h2 className="mb-2 font-criteria text-xl leading-6 lg:mb-5 lg:text-[28px] lg:leading-10">
        Thông tin vận chuyển
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Họ và tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <Input placeholder="Email" value={email} disabled />
      <Input
        placeholder="Số nhà, tên đường..."
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
      />
      <div className="flex flex-row gap-2">
        <Select onValueChange={setProvinceCode} value={provinceCode}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn tỉnh/thành" />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((p) => (
              <SelectItem key={p.code} value={p.code}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={setDistrictCode}
          value={districtCode}
          disabled={!provinceCode}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn quận/huyện" />
          </SelectTrigger>
          <SelectContent>
            {districts.map((d) => (
              <SelectItem key={d.code} value={d.code}>
                {d.name_with_type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={setWardCode}
          value={wardCode}
          disabled={!districtCode}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn phường/xã" />
          </SelectTrigger>
          <SelectContent>
            {wards.map((w) => (
              <SelectItem key={w.code} value={w.code}>
                {w.name_with_type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid w-full gap-2">
        <Label id="note" htmlFor="note">
          Nhập ghi chú
        </Label>
        <Textarea placeholder="Nhập ghi chú" id="note" />
      </div>
      <div className="relative h-[1px] w-full my-5 bg-neutral-900/10 dark:bg-gray-500 max-lg:hidden"></div>
    </div>
  );
}
