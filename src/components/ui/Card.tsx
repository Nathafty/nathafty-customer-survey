import { cn } from '@/lib/utils';

export function Card({
  as: Tag = 'div',
  className,
  padding = true,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: 'div' | 'article'; padding?: boolean }) {
  return (
    <Tag
      className={cn(
        'bg-white rounded-xl shadow-sm border border-gray-100',
        padding && 'p-4 sm:p-6',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
