'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUser } from '@/contexts/UserContext';
import {
  updateProfile,
  UpdateProfileResponse,
} from '@/services/profileApi';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

import { useLocation } from '@/hooks/useLocation';

export interface AddressesPageRef {
  handleUpdate: () => Promise<UpdateProfileResponse>;
}

const AddressesPage = forwardRef<AddressesPageRef>((_, ref) => {
  const { user } = useUser();

  const {
    provinces,
    districts,
    wards,
    provinceCode,
    setProvinceCode,
    districtCode,
    setDistrictCode,
    wardCode,
    setWardCode,
  } = useLocation();

  const [detail, setDetail] = useState<string>('');
  useEffect(() => {
    if (user?.order_address) {
      const { codes, detail } = user.order_address;
      setProvinceCode(codes?.province_code ?? '');
      setDetail(detail ?? '');
    }
  }, [user, setProvinceCode, setDetail]);
  useEffect(() => {
    if (user?.order_address && districts.length > 0) {
      const districtCodeFromUser =
        user.order_address.codes?.district_code ?? '';
      if (districtCodeFromUser) {
        const foundDistrict = districts.find(
          (d) => d.code === districtCodeFromUser,
        );
        if (foundDistrict) {
          setDistrictCode(districtCodeFromUser);
        }
      }
    }
  }, [districts, user, setDistrictCode]);
  useEffect(() => {
    if (user?.order_address && wards.length > 0) {
      const wardCodeFromUser =
        user.order_address.codes?.ward_code ?? '';
      if (wardCodeFromUser) {
        const foundWard = wards.find(
          (w) => w.code === wardCodeFromUser,
        );
        if (foundWard) {
          setWardCode(wardCodeFromUser);
        }
      }
    }
  }, [wards, user, setWardCode]);

  const getFullAddress = () => {
    const province =
      provinces.find((p) => p.code === provinceCode)?.name ?? '';
    const district =
      districts.find((d) => d.code === districtCode)
        ?.name_with_type ?? '';
    const ward =
      wards.find((w) => w.code === wardCode)?.name_with_type ?? '';
    return `${detail}, ${ward}, ${district}, ${province}`
      .replace(/^(,\s)+|(\s,)+$/g, '')
      .replace(/(,\s){2,}/g, ', ');
  };

  useImperativeHandle(ref, () => ({
    handleUpdate: async () => {
      return await updateProfile({
        order_address: {
          province_code: provinceCode,
          district_code: districtCode,
          ward_code: wardCode,
          detail,
        },
      });
    },
  }));

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Địa chỉ nhận hàng</h2>

      <div className="flex lg:flex-row flex-col flex-wrap gap-4">
        <div className="flex-1">
          <Label htmlFor="province">Tỉnh/Thành phố</Label>
          <Select
            onValueChange={setProvinceCode}
            value={provinceCode}
          >
            <SelectTrigger id="province" className="w-full">
              <SelectValue placeholder="Chọn Tỉnh/TP" />
            </SelectTrigger>
            <SelectContent className="bg-background dark:bg-gray-900">
              <SelectGroup>
                {provinces.map((province) => (
                  <SelectItem
                    key={province.code}
                    value={province.code}
                  >
                    {province.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {provinceCode && (
          <div className="flex-1">
            <Label htmlFor="district">Quận/Huyện</Label>
            <Select
              onValueChange={setDistrictCode}
              value={districtCode}
            >
              <SelectTrigger id="district" className="w-full">
                <SelectValue placeholder="Chọn Quận/Huyện" />
              </SelectTrigger>
              <SelectContent className="bg-background dark:bg-gray-900">
                <SelectGroup>
                  {districts.map((district) => (
                    <SelectItem
                      key={district.code}
                      value={district.code}
                    >
                      {district.name_with_type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
        {provinceCode && districtCode && (
          <div className="flex-1">
            <Label htmlFor="ward">Phường/Xã</Label>
            <Select onValueChange={setWardCode} value={wardCode}>
              <SelectTrigger id="ward" className="w-full">
                <SelectValue placeholder="Chọn Phường/Xã" />
              </SelectTrigger>
              <SelectContent className="bg-background dark:bg-gray-900">
                <SelectGroup>
                  {wards.map((ward) => (
                    <SelectItem key={ward.code} value={ward.code}>
                      {ward.name_with_type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="detail">Địa chỉ cụ thể</Label>
          <Input
            id="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="Số nhà, tên đường..."
          />
        </div>
        <div className="mt-2 lg:mt-5 text-gray-500">
          <strong className="dark:text-white">Địa chỉ đầy đủ:</strong>{' '}
          {getFullAddress()}
        </div>
      </div>
    </div>
  );
});

export default AddressesPage;
