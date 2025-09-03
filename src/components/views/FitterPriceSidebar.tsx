'use client';

import {
  Check,
  DollarSign,
  Filter,
  Palette,
  PlusIcon,
  Star,
  X,
} from 'lucide-react';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { items } from '@/data/product-fitter';
import { Button } from '../ui/button';

const getFilterIcon = (filterId: string) => {
  const iconMap = {
    price: <DollarSign className="w-4 h-4 text-green-600" />,
    color: <Palette className="w-4 h-4 text-purple-600" />,
    size: (
      <div className="w-4 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
        S
      </div>
    ),
    rating: <Star className="w-4 h-4 text-yellow-600" />,
  };
  return (
    iconMap[filterId as keyof typeof iconMap] || (
      <Filter className="w-4 h-4" />
    )
  );
};

export default function EnhancedFilterSidebar() {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [openSections, setOpenSections] = useState<string>('price');
  const handleFilterChange = (
    filterId: string,
    optionId: string,
    checked: boolean,
  ) => {
    setSelectedFilters((prev) => {
      const current = prev[filterId] || [];
      if (checked) {
        return { ...prev, [filterId]: [...current, optionId] };
      } else {
        return {
          ...prev,
          [filterId]: current.filter((id) => id !== optionId),
        };
      }
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  const removeFilter = (filterId: string, optionId: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterId]: (prev[filterId] || []).filter(
        (id) => id !== optionId,
      ),
    }));
  };

  const totalActiveFilters =
    Object.values(selectedFilters).flat().length;

  return (
    <Sidebar className="border-r border-border/50 bg-gradient-to-b from-card to-accent/5">
      <SidebarContent className="space-y-6">
        <SidebarGroup>
          <div className="mb-6 pt-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-br from-primary/10 to-accent/20 rounded-xl">
                <Filter className="w-5 h-5 text-primary" />
              </div>
              <SidebarGroupLabel className="text-lg font-bold text-foreground">
                Bộ lọc sản phẩm
              </SidebarGroupLabel>
            </div>
            {totalActiveFilters > 0 && (
              <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-xl">
                <span className="text-sm font-medium text-primary">
                  {totalActiveFilters} bộ lọc đang áp dụng
                </span>
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-destructive hover:text-destructive/80 font-medium underline transition-colors"
                >
                  Xóa tất cả
                </button>
              </div>
            )}
          </div>
          <SidebarGroupContent>
            {totalActiveFilters > 0 && (
              <div className="mb-4 space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Đang áp dụng
                </p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(selectedFilters).map(
                    ([filterId, options]) =>
                      options.map((optionId) => {
                        const filter = items.find(
                          (f) => f.id === filterId,
                        );
                        const option = filter?.options.find(
                          (o) => o.id === optionId,
                        );
                        if (!option) return null;
                        return (
                          <div
                            key={`${filterId}-${optionId}`}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                          >
                            {option.color && (
                              <div
                                className={`w-3 h-3 rounded-full ${option.color}`}
                              ></div>
                            )}
                            <span>{option.label}</span>
                            <button
                              onClick={() =>
                                removeFilter(filterId, optionId)
                              }
                              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      }),
                  )}
                </div>
              </div>
            )}
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-3"
              value={openSections}
              onValueChange={setOpenSections}
            >
              {items.map((item) => {
                const activeCount =
                  selectedFilters[item.id]?.length || 0;

                return (
                  <AccordionItem
                    value={item.id}
                    key={item.id}
                    className="bg-card rounded-xl border border-border/30 px-4 py-2 transition-all duration-200"
                  >
                    <AccordionPrimitive.Header className="flex">
                      <AccordionPrimitive.Trigger className="focus-visible:ring-ring/50 flex flex-1 items-center justify-between rounded-lg py-3 text-left outline-none focus-visible:ring-2 transition-all group [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
                        <div className="flex items-center gap-3">
                          {getFilterIcon(item.id)}
                          <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </span>
                          {activeCount > 0 && (
                            <div className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                              {activeCount}
                            </div>
                          )}
                        </div>
                        <PlusIcon
                          size={16}
                          className="shrink-0 text-muted-foreground group-hover:text-primary transition-all cursor-pointer duration-200"
                          aria-hidden="true"
                        />
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>

                    <AccordionContent className="pb-4">
                      <div className="space-y-3 pt-2">
                        {item.options?.map((option) => {
                          const isSelected =
                            selectedFilters[item.id]?.includes(
                              option.id,
                            ) || false;

                          return (
                            <label
                              key={option.id}
                              className={`
                                flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-all duration-200 group
                                ${
                                  isSelected
                                    ? 'bg-primary/10 border border-primary/20'
                                    : 'hover:bg-accent/50 border border-transparent'
                                }
                              `}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) =>
                                  handleFilterChange(
                                    item.id,
                                    option.id,
                                    e.target.checked,
                                  )
                                }
                                className="sr-only"
                              />
                              <div
                                className={` w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                                  isSelected
                                    ? 'bg-primary border-primary'
                                    : 'border-muted-foreground/30 group-hover:border-primary/50'
                                }
                              `}
                              >
                                {isSelected && (
                                  <Check className="w-3 h-3 text-primary-foreground" />
                                )}
                              </div>
                              {option.color && (
                                <div
                                  className={`w-6 h-6 rounded-full ${option.color} ring-1 ring-offset-2 ${isSelected ? 'ring-primary' : 'ring-foreground'} transition-all duration-200`}
                                ></div>
                              )}
                              <span
                                className={`
                                text-sm font-medium transition-colors duration-200
                                ${isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'}
                              `}
                              >
                                {option.label}
                              </span>
                              {item.id === 'rating' && (
                                <div className="flex items-center gap-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i <
                                        parseInt(option.id.charAt(0))
                                          ? 'fill-yellow-400 text-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              )}
                            </label>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
            <div className="mt-8 space-y-3">
              <button
                onClick={clearAllFilters}
                disabled={totalActiveFilters === 0}
                className="w-full py-3 px-4 border-2 border-border rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-destructive hover:text-destructive hover:bg-destructive/5"
              >
                Xóa bộ lọc ({totalActiveFilters})
              </button>

              <Button
                size="lg"
                type="button"
                className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-semibold hover:shadow-primary/25 hover:scale-105 transition-all duration-200"
              >
                Áp dụng bộ lọc
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
