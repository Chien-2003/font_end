'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import Breadcrumbs from '@/components/views/Breadcrumbs';
import { items } from '@/data/policy';
import { PlusIcon } from 'lucide-react';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { Fragment, useState } from 'react';

export default function Page() {
  const [openItem, setOpenItem] = useState<string | undefined>('');

  return (
    <Fragment>
      <div className="mt-6 px-3">
        <Breadcrumbs />
      </div>
      <div className="mx-auto max-w-6xl w-full h-full py-8 px-2 sm:px-2 md:px-4 lg:px-8 xl:px-12 2xl:px-16 flex flex-col gap-5">
        <h1 className="text-2xl font-bold text-center">
          Chương trình và chính sách khuyến mãi
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-5">
            <div className="space-y-2 sticky top-5">
              {items.map((item) => (
                <h2
                  key={item.id}
                  onClick={() => setOpenItem(item.id)}
                  className={`text-base font-semibold uppercase cursor-pointer transition-colors duration-200 hover:text-primary ${
                    openItem === item.id
                      ? 'text-primary'
                      : 'text-black dark:text-white'
                  }`}
                >
                  {item.title}
                </h2>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start gap-2">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-2"
              value={openItem}
              onValueChange={(value) =>
                setOpenItem(value || undefined)
              }
            >
              {items.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className={`rounded border px-4 py-1 outline-none last:border-b transition-colors duration-200 cursor-pointer
                    hover:border-primary focus-within:border-primary
                    has-focus-visible:border-ring has-focus-visible:ring-ring/50 has-focus-visible:ring-[1px]
                    ${openItem === item.id ? 'border-primary' : 'border'}
                  `}
                >
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger
                      className={`flex flex-1 items-center justify-between rounded-md py-2 text-left text-[15px] leading-6 font-semibold uppercase transition-all outline-none focus-visible:ring-0
                        cursor-pointer
                        [&>svg>path:last-child]:origin-center
                        [&>svg>path:last-child]:transition-all
                        [&>svg>path:last-child]:duration-200
                        [&[data-state=open]>svg]:rotate-180
                        [&[data-state=open]>svg>path:last-child]:rotate-90
                        [&[data-state=open]>svg>path:last-child]:opacity-0
                      `}
                    >
                      {item.title}
                      <PlusIcon
                        size={22}
                        className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
                        aria-hidden="true"
                      />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionContent className="text-sm text-muted-foreground pb-2 space-y-2">
                    {Array.isArray(item.content) ? (
                      item.content.map((section, index) => (
                        <div
                          key={index}
                          className="text-black dark:text-white"
                        >
                          <strong className="text-black dark:text-white">
                            {section.label}
                          </strong>{' '}
                          {section.value}
                        </div>
                      ))
                    ) : (
                      <div className="text-black dark:text-white">
                        {item.content}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
