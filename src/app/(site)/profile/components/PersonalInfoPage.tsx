'use client';

import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  XIcon,
  CircleUserRoundIcon,
  CalendarIcon,
} from 'lucide-react';
import { format } from 'date-fns';
import dayjs from 'dayjs';

import { useUser } from '@/contexts/UserContext';
import {
  updateProfile,
  UpdateProfileResponse,
} from '@/lib/profileApi';
import { uploadImage } from '@/lib/uploadApi';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DropdownNavProps, DropdownProps } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { useFileUpload } from '@/hooks/use-file-upload';
import Image from 'next/image';

export interface PersonalInfoPageRef {
  handleUpdate: () => Promise<UpdateProfileResponse>;
}

const PersonalInfoPage = forwardRef<PersonalInfoPageRef>((_, ref) => {
  const { user } = useUser();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [birthDate, setBirthDate] = useState<Date | undefined>(
    undefined,
  );
  const [gender, setGender] = useState<'0' | '1' | '2'>('0');
  const [avatar, setAvatar] = useState<string | null>(null);

  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({ accept: 'image/*' });

  useEffect(() => {
    if (files.length > 0) {
      uploadImage(files[0].file).then((url) => {
        if (url) setAvatar(url);
      });
    }
  }, [files]);
  useEffect(() => {
    if (user) {
      setFullName(user.full_name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
      setBirthDate(
        user.birth_date ? new Date(user.birth_date) : undefined,
      );
      setGender(String(user.gender ?? 0) as '0' | '1' | '2');
      setAvatar(user.avatar || null);
    }
  }, [user]);

  useImperativeHandle(ref, () => ({
    handleUpdate: async () => {
      return await updateProfile({
        full_name: user?.full_name ?? '',
        phone,
        address,
        birth_date: birthDate
          ? dayjs(birthDate).format('YYYY-MM-DD')
          : null,
        gender: Number(gender) as 0 | 1 | 2,
        avatar,
      });
    },
  }));
  const previewUrl =
    files[0]?.preview || avatar || user?.avatar || null;
  const fileName = files[0]?.file.name || null;

  const handleCalendarChange = (
    _value: string | number,
    _e: React.ChangeEventHandler<HTMLSelectElement>,
  ) => {
    const _event = {
      target: {
        value: String(_value),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    _e(_event);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-2">
        <div className="relative inline-flex">
          <Button
            variant="outline"
            className="relative size-24 overflow-hidden p-0 rounded-full shadow-none"
            onClick={openFileDialog}
            aria-label={previewUrl ? 'Change image' : 'Upload image'}
          >
            {previewUrl ? (
              <Image
                className="size-full object-cover h-full w-full rounded-full"
                src={previewUrl}
                alt="Preview"
                width={96}
                height={96}
              />
            ) : (
              <CircleUserRoundIcon className="size-6 opacity-60" />
            )}
          </Button>

          {files.length > 0 && (
            <Button
              onClick={() => removeFile(files[0]?.id)}
              size="icon"
              className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
              aria-label="Remove image"
            >
              <XIcon className="size-3.5" />
            </Button>
          )}

          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload image"
            tabIndex={-1}
          />
        </div>

        {fullName && (
          <h2 className="text-xl font-semibold">{fullName}</h2>
        )}
        {fileName && (
          <p className="text-muted-foreground text-xs">{fileName}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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
                  'w-full justify-start text-left font-normal',
                  !birthDate && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {birthDate
                  ? format(birthDate, 'dd/MM/yyyy')
                  : 'Chọn ngày'}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 dark:bg-gray-900"
              align="start"
            >
              <Calendar
                mode="single"
                selected={birthDate}
                onSelect={setBirthDate}
                captionLayout="dropdown"
                defaultMonth={birthDate || new Date(2000, 0)}
                startMonth={new Date(1900, 0)}
                className="rounded-md border p-2"
                classNames={{ month_caption: 'mx-0' }}
                components={{
                  DropdownNav: (props: DropdownNavProps) => (
                    <div className="flex w-full items-center gap-2">
                      {props.children}
                    </div>
                  ),
                  Dropdown: (props: DropdownProps) => (
                    <Select
                      value={String(props.value)}
                      onValueChange={(value) => {
                        if (props.onChange) {
                          handleCalendarChange(value, props.onChange);
                        }
                      }}
                    >
                      <SelectTrigger className="h-8 w-fit font-medium first:grow">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))]">
                        {props.options?.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={String(option.value)}
                            disabled={option.disabled}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ),
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label className="mb-2">Giới tính</Label>
          <RadioGroup
            defaultValue={gender}
            onValueChange={(val) => setGender(val as '0' | '1' | '2')}
            className="mt-1 flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="0"
                id="nam"
                className="h-5 w-5"
              />
              <Label htmlFor="nam">Nam</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="nu" className="h-5 w-5" />
              <Label htmlFor="nu">Nữ</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="2"
                id="khac"
                className="h-5 w-5"
              />
              <Label htmlFor="khac">Khác</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
});

export default PersonalInfoPage;
