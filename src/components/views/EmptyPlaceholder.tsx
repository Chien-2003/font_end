import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface EmptyPlaceholderProps {
  className?: string;
  description?: string;
  imageUrl?: string;
  showButton?: boolean;
  buttonText?: string;
  onClick?: () => void;
}

export function EmptyPlaceholder({
  className,
  description,
  imageUrl = '/empty.svg',
  showButton = false,
  buttonText,
  onClick,
}: EmptyPlaceholderProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-2 text-muted-foreground w-full',
        className,
      )}
    >
      <Image
        src={imageUrl}
        alt="Empty"
        width={120}
        height={120}
        className="mb-4"
      />
      {description && (
        <div className="text-sm text-foreground">{description}</div>
      )}
      {showButton && onClick && (
        <Button onClick={onClick} className="mt-4">
          {buttonText}
        </Button>
      )}
    </div>
  );
}
