'use client';

import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion, useAnimation } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export function ModeToggle() {
  const { setTheme } = useTheme();
  const controls = useAnimation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative group">
          <motion.div animate={controls}>
            <Button
              variant="ghost"
              size="sm"
              className="relative p-3 h-auto rounded-xl hover:bg-card backdrop-blur-sm transition-all duration-300 ease-in-out group-hover:scale-105"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              </div>
            </Button>
          </motion.div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="bg-background dark:bg-gray"
      >
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
