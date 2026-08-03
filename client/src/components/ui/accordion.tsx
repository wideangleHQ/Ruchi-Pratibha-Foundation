'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib';

interface AccordionContextValue {
  activeItem: string | null;
  toggleItem: (_itemVal: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue>({
  activeItem: null,
  toggleItem: () => {},
});

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange?: (_val: string | null) => void;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      children,
      type = 'single',
      collapsible = true,
      defaultValue,
      value,
      onValueChange,
      ...props
    },
    ref
  ) => {
    void type;
    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string | null>(defaultValue ?? null);
    const activeItem = isControlled ? (value ?? null) : uncontrolledValue;

    const toggleItem = React.useCallback(
      (itemVal: string) => {
        const nextVal = activeItem === itemVal ? (collapsible ? null : activeItem) : itemVal;
        if (!isControlled) {
          setUncontrolledValue(nextVal);
        }
        onValueChange?.(nextVal);
      },
      [activeItem, collapsible, isControlled, onValueChange]
    );

    return (
      <AccordionContext.Provider value={{ activeItem, toggleItem }}>
        <div ref={ref} className={cn('space-y-1', className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = 'Accordion';

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-state={useAccordionContext().activeItem === value ? 'open' : 'closed'}
        className={cn('border-b border-white/10 last:border-b-0', className)}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<{ itemValue?: string }>, {
              itemValue: value,
            });
          }
          return child;
        })}
      </div>
    );
  }
);
AccordionItem.displayName = 'AccordionItem';

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion provider');
  }
  return context;
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  itemValue?: string;
  tag?: string;
}

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, itemValue, tag, ...props }, ref) => {
    const { activeItem, toggleItem } = useAccordionContext();
    const isOpen = activeItem === itemValue;

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={isOpen}
        onClick={() => itemValue && toggleItem(itemValue)}
        className={cn(
          'flex w-full items-center justify-between py-3.5 text-left font-cormorant text-xl font-bold tracking-tight text-white transition-all duration-200 hover:text-institutional-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-institutional-accent min-h-[48px] cursor-pointer group',
          isOpen && 'text-institutional-accent',
          className
        )}
        {...props}
      >
        <div className="flex flex-col items-start gap-0.5">
          {tag && (
            <span className="text-[9px] uppercase tracking-widest font-space font-semibold text-institutional-accent/80 group-hover:text-institutional-accent">
              {tag}
            </span>
          )}
          <span>{children}</span>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-institutional-accent/80 transition-transform duration-200 ease-out group-hover:text-institutional-accent',
            isOpen && 'rotate-180 text-institutional-accent'
          )}
        />
      </button>
    );
  }
);
AccordionTrigger.displayName = 'AccordionTrigger';

export interface AccordionContentProps {
  className?: string;
  children?: React.ReactNode;
  itemValue?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  className,
  children,
  itemValue,
}) => {
  const { activeItem } = useAccordionContext();
  const isOpen = activeItem === itemValue;

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className={cn('pb-4 pt-1 pl-3 space-y-1', className)}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
AccordionContent.displayName = 'AccordionContent';
