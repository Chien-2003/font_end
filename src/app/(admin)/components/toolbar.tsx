import React from 'react';

interface ToolbarProps {
  children: React.ReactNode;
  variant?: 'default' | 'minimal';
}

export function Toolbar({
  children,
  variant = 'default',
}: ToolbarProps) {
  const baseClass = 'flex flex-wrap gap-1 border-b p-2 rounded-t-md';
  const variantClass =
    variant === 'default'
      ? 'bg-gray-800'
      : 'bg-white border-gray-200';

  return (
    <div className={`${baseClass} ${variantClass}`}>{children}</div>
  );
}

export function ToolbarGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex gap-1">{children}</div>;
}

export function ToolbarSeparator() {
  return <div className="w-px mx-2" />;
}
