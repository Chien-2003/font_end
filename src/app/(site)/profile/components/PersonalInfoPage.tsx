"use client";

import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/contexts/UserContext";
import { updateProfile, UpdateProfileResponse } from "@/lib/profileApi";
import dayjs from "dayjs";

export interface PersonalInfoPageRef {
  handleUpdate: () => Promise<UpdateProfileResponse>;
}

const PersonalInfoPage = forwardRef<PersonalInfoPageRef>((_, ref) => {
  const { user } = useUser();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [gender, setGender] = useState<"0" | "1" | "2">("0");

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setBirthDate(user.birth_date ? new Date(user.birth_date) : undefined);
      setGender(String(user.gender ?? 0) as "0" | "1" | "2");
    }
  }, [user]);

  useImperativeHandle(ref, () => ({
    handleUpdate: async () => {
      return await updateProfile({
        full_name: fullName,
        phone,
        address,
        birth_date: birthDate ? dayjs(birthDate).format("YYYY-MM-DD") : null,
        gender: Number(gender) as 0 | 1 | 2,
      });
    },
  }));

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Avatar className="mx-auto w-24 h-24">
          <AvatarImage src="/image.webp" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold mt-2">
          {fullName || "Chưa có tên"}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName" className="mb-2">
            Họ và tên
          </Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="address" className="mb-2">
            Địa chỉ thường trú
          </Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="email" className="mb-2">
            Email
          </Label>
          <Input id="email" value={email} disabled />
        </div>
        <div>
          <Label htmlFor="phone" className="mb-2">
            Số điện thoại
          </Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="birthDate" className="mb-2">
            Ngày sinh
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !birthDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {birthDate ? format(birthDate, "dd/MM/yyyy") : "Chọn ngày"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={birthDate}
                onSelect={setBirthDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label className="mb-2">Giới tính</Label>
          <RadioGroup
            defaultValue={gender}
            onValueChange={(val) => setGender(val as "0" | "1" | "2")}
            className="flex gap-4 mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0" id="nam" />
              <Label htmlFor="nam">Nam</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="nu" />
              <Label htmlFor="nu">Nữ</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="khac" />
              <Label htmlFor="khac">Khác</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
});

export default PersonalInfoPage;
