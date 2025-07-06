"use client";

import Select from "react-select";
import type { SingleValue } from "react-select";

export type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  value?: Option | null;
  onChange: (value: Option | null) => void;
  placeholder?: string;
};

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Chọn...",
}: Props) {
  const handleChange = (selected: SingleValue<Option>) => {
    onChange(selected ?? null);
  };

  return (
    <Select
      options={options}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      isClearable
    />
  );
}
