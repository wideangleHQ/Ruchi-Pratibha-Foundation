import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-manrope font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-foundation-sm hover:brightness-95 hover:-translate-y-[2px] hover:shadow-foundation-md',
        destructive: 'bg-destructive text-destructive-foreground shadow-foundation-sm hover:brightness-95 hover:-translate-y-[2px]',
        outline: 'border border-heritage-maroon text-heritage-maroon bg-transparent hover:bg-heritage-maroon hover:text-white',
        secondary: 'bg-secondary text-secondary-foreground shadow-foundation-sm hover:brightness-95 hover:-translate-y-[2px]',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-destructive underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-5 text-[16px] rounded-[12px] [&_svg]:size-4',
        sm: 'h-8 px-3.5 text-[14px] rounded-[10px] [&_svg]:size-3.5',
        lg: 'h-11 px-8 text-[16px] rounded-[12px] [&_svg]:size-5',
        icon: 'h-10 w-10 rounded-[12px] [&_svg]:size-4',
        'icon-sm': 'h-8 w-8 rounded-[10px] [&_svg]:size-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
