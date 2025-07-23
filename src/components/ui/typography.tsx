import { cn } from '@/utils/utils';

interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small';
}

export function Typography({
  variant = 'p',
  className,
  ...props
}: TypographyProps) {
  const Comp = variant;
  return (
    <Comp
      className={cn('leading-snug dark:text-white', className)}
      {...props}
    />
  );
}
