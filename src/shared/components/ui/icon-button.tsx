import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

const iconButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        large: 'h-10 w-10 [&_svg]:size-4',
        small: 'h-6 w-6 [&_svg]:size-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'large',
    },
  },
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  isLoading?: boolean;
  disabled?: boolean;
  size?: 'large' | 'small';
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { isLoading = false, disabled, size, variant, className, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={iconButtonVariants({ size, variant, className })}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <Loader2 className='h-6 w-6 animate-spin' />
        ) : (
          <span>{props.children}</span>
        )}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';

export { IconButton };
