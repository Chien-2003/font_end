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
import { MapPin } from 'lucide-react';

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
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsFormVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 transform transition-all duration-700 ease-out opacity-100 translate-y-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center transform transition-all duration-500 hover:scale-110 hover:bg-primary/20">
            <MapPin className="w-4 h-4 text-primary transition-colors duration-300" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Địa chỉ nhận hàng
          </h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Cập nhật thông tin địa chỉ để nhận hàng chính xác và nhanh
          chóng
        </p>
      </div>
      <div
        className={`bg-card border border-border rounded-xl p-6 shadow-sm transform transition-all duration-800 ease-out ${
          isFormVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div
            className={`space-y-2 transform transition-all duration-700 delay-100 ${
              isFormVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-4'
            }`}
          >
            <Label
              htmlFor="province"
              className="text-sm font-medium text-card-foreground"
            >
              Tỉnh/Thành phố *
            </Label>
            <div className="relative group">
              <Select
                onValueChange={setProvinceCode}
                value={provinceCode}
              >
                <SelectTrigger
                  id="province"
                  className="w-full h-11 bg-background border-input hover:border-ring focus:border-ring transition-all duration-300 group-hover:shadow-md hover:shadow-ring/20"
                >
                  <SelectValue placeholder="Chọn Tỉnh/TP" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
                  <SelectGroup>
                    {provinces.map((province, index) => (
                      <SelectItem
                        key={province.code}
                        value={province.code}
                        className="hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all duration-200 transform hover:translate-x-1"
                        style={{ animationDelay: `${index * 20}ms` }}
                      >
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div
            className={`space-y-2 transform transition-all duration-700 delay-200 ${
              isFormVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-4'
            }`}
          >
            <Label
              htmlFor="district"
              className="text-sm font-medium text-card-foreground"
            >
              Quận/Huyện *
            </Label>
            <div className="relative group">
              <Select
                onValueChange={setDistrictCode}
                value={districtCode}
                disabled={!provinceCode}
              >
                <SelectTrigger
                  id="district"
                  className="w-full h-11 bg-background border-input hover:border-ring focus:border-ring transition-all duration-300 disabled:opacity-50 group-hover:shadow-md hover:shadow-ring/20"
                >
                  <SelectValue placeholder="Chọn Quận/Huyện" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
                  <SelectGroup>
                    {districts.map((district, index) => (
                      <SelectItem
                        key={district.code}
                        value={district.code}
                        className="hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all duration-200 transform hover:translate-x-1"
                        style={{ animationDelay: `${index * 20}ms` }}
                      >
                        {district.name_with_type}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div
            className={`space-y-2 transform transition-all duration-700 delay-300 ${
              isFormVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-4'
            }`}
          >
            <Label
              htmlFor="ward"
              className="text-sm font-medium text-card-foreground"
            >
              Phường/Xã *
            </Label>
            <div className="relative group">
              <Select
                onValueChange={setWardCode}
                value={wardCode}
                disabled={!districtCode}
              >
                <SelectTrigger
                  id="ward"
                  className="w-full h-11 bg-background border-input hover:border-ring focus:border-ring transition-all duration-300 disabled:opacity-50 group-hover:shadow-md hover:shadow-ring/20"
                >
                  <SelectValue placeholder="Chọn Phường/Xã" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
                  <SelectGroup>
                    {wards.map((ward, index) => (
                      <SelectItem
                        key={ward.code}
                        value={ward.code}
                        className="hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all duration-200 transform hover:translate-x-1"
                        style={{ animationDelay: `${index * 20}ms` }}
                      >
                        {ward.name_with_type}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div
          className={`space-y-2 mb-6 transform transition-all duration-700 delay-400 ${
            isFormVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <Label
            htmlFor="detail"
            className="text-sm font-medium text-card-foreground"
          >
            Địa chỉ cụ thể *
          </Label>
          <div className="relative group">
            <Input
              id="detail"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Số nhà, tên đường, tòa nhà..."
              className="h-11 bg-background border-input hover:border-ring focus:border-ring transition-all duration-300 group-hover:shadow-md hover:shadow-ring/20"
            />
          </div>
        </div>
        {getFullAddress().trim() && (
          <div
            className={`bg-muted/50 border border-border rounded-lg p-4 transform transition-all duration-800 delay-500 ${
              isFormVisible
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0 transform transition-all duration-300 hover:scale-110">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                  Địa chỉ đầy đủ
                  <div className="w-1 h-1 rounded-full bg-primary animate-bounce"></div>
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed break-words">
                  {getFullAddress()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className={`mt-4 text-xs text-muted-foreground transform transition-all duration-700 delay-600 ${
          isFormVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2'
        }`}
      >
        <p>
          * Thông tin bắt buộc. Vui lòng điền đầy đủ để đảm bảo giao
          hàng chính xác.
        </p>
      </div>
    </div>
  );
});

AddressesPage.displayName = 'AddressesPage';

export default AddressesPage;
