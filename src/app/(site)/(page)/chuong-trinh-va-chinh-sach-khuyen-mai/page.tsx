'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import Breadcrumbs from '@/components/views/Breadcrumbs';
import { items } from '@/data/policy';
import { PlusIcon, SparklesIcon } from 'lucide-react';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { Fragment, useState } from 'react';

export default function Page() {
  const [openItem, setOpenItem] = useState<string | undefined>('');

  return (
    <Fragment>
      <div className="mt-6 px-3 animate-in fade-in duration-300">
        <Breadcrumbs />
      </div>
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/10 dark:to-accent/10" />
      <div className="mx-auto max-w-6xl w-full h-full py-8 px-2 sm:px-2 md:px-4 lg:px-8 xl:px-12 2xl:px-16 flex flex-col gap-8">
        <div className="text-center space-y-4 animate-in slide-in-from-top duration-500">
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <SparklesIcon className="w-8 h-8 text-primary animate-pulse" />
              <div className="absolute inset-0 w-8 h-8 bg-primary/20 rounded-full blur-md animate-ping" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Chương trình và chính sách khuyến mãi
            </h1>
            <div className="relative">
              <SparklesIcon className="w-8 h-8 text-primary animate-pulse" />
              <div className="absolute inset-0 w-8 h-8 bg-primary/20 rounded-full blur-md animate-ping" />
            </div>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="space-y-3 sticky top-5">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Danh mục chính sách
                </h2>
                <div className="space-y-2">
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className="group relative animate-in fade-in slide-in-from-left duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div
                        onClick={() => setOpenItem(item.id)}
                        className={`relative text-sm font-medium cursor-pointer transition-all duration-300 p-3 rounded-lg border ${
                          openItem === item.id
                            ? 'bg-primary/10 border-primary/30 text-primary shadow-md transform scale-[1.02]'
                            : 'bg-card/30 border-border/30 text-foreground hover:bg-primary/5 hover:border-primary/20 hover:text-primary hover:transform hover:scale-[1.01]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              openItem === item.id
                                ? 'bg-primary'
                                : 'bg-muted-foreground/30'
                            }`}
                          />
                          <span className="leading-relaxed">
                            {item.title}
                          </span>
                        </div>
                        {openItem === item.id && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-r-full animate-in slide-in-from-left duration-300" />
                        )}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 flex flex-col items-center lg:items-start gap-4">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-4"
              value={openItem}
              onValueChange={(value) =>
                setOpenItem(value || undefined)
              }
            >
              {items.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className={`group relative rounded-xl border backdrop-blur-sm transition-all duration-300 overflow-hidden
                    animate-in fade-in slide-in-from-right
                    ${
                      openItem === item.id
                        ? 'border-primary/40 bg-card/80 shadow-xl shadow-primary/10'
                        : 'border-border/40 bg-card/40 hover:border-primary/30 hover:bg-card/60 hover:shadow-lg'
                    }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
                  />
                  <AccordionPrimitive.Header className="flex px-6 py-4">
                    <AccordionPrimitive.Trigger
                      className={`flex flex-1 items-center justify-between text-left text-base font-semibold transition-all duration-300 outline-none focus-visible:ring-0 group-hover:text-primary [&>svg]:transition-all [&>svg]:duration-300 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg]:text-primary`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            openItem === item.id
                              ? 'bg-primary'
                              : 'bg-muted-foreground/40 group-hover:bg-primary/60'
                          }`}
                        />
                        <span className="leading-relaxed">
                          {item.title}
                        </span>
                      </div>
                      <div className="relative">
                        <PlusIcon
                          size={20}
                          className={`absolute shrink-0 transition-all duration-300 transform origin-center ${
                            openItem === item.id
                              ? 'opacity-0 rotate-180 scale-75'
                              : 'opacity-70 group-hover:opacity-100 rotate-0 scale-100'
                          }`}
                          aria-hidden="true"
                        />
                        <SparklesIcon
                          size={20}
                          className={`shrink-0 transition-all duration-300 transform origin-center ${
                            openItem === item.id
                              ? 'opacity-100 rotate-0 scale-100 text-primary animate-pulse'
                              : 'opacity-0 rotate-180 scale-75'
                          }`}
                          aria-hidden="true"
                        />
                        {openItem === item.id && (
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-ping" />
                        )}
                      </div>
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionContent className="px-6 pb-6 pt-0">
                    <div className="border-t border-border/20 pt-4 space-y-4">
                      {Array.isArray(item.content) ? (
                        item.content.map((section, sectionIndex) => (
                          <div
                            key={sectionIndex}
                            className="flex flex-col sm:flex-row gap-2 sm:gap-4 p-4 rounded-lg bg-muted/30 border border-border/20 hover:bg-muted/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom"
                            style={{
                              animationDelay: `${sectionIndex * 100}ms`,
                            }}
                          >
                            <div className="sm:min-w-[140px]">
                              <strong className="text-primary font-semibold text-sm">
                                {section.label}:
                              </strong>
                            </div>
                            <div className="text-foreground/80 text-sm leading-relaxed flex-1">
                              {section.value}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 rounded-lg bg-muted/30 border border-border/20 text-foreground/80 leading-relaxed animate-in fade-in slide-in-from-bottom">
                          {item.content}
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {!openItem && (
              <div className="text-center py-12 animate-in fade-in duration-500">
                <div className="relative mb-4">
                  <SparklesIcon className="w-16 h-16 text-muted-foreground/30 mx-auto" />
                  <div className="absolute inset-0 w-16 h-16 bg-primary/10 rounded-full blur-xl mx-auto animate-pulse" />
                </div>
                <p className="text-muted-foreground text-lg">
                  Chọn một chính sách để xem chi tiết
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
