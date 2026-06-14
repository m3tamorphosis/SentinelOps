import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import { cn } from '~/lib/utils'

const buttonVariants = cva(
  'inline-flex h-10 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-primary/60 bg-primary text-white shadow-sm shadow-primary/20 hover:bg-primary/90',
        secondary: 'border-border bg-card text-slate-100 hover:bg-slate-800',
        ghost: 'border-transparent bg-transparent text-slate-300 hover:bg-slate-900 hover:text-white',
        destructive: 'border-error/50 bg-error/15 text-error hover:bg-error/20'
      },
      size: {
        default: 'px-4',
        sm: 'h-8 rounded-lg px-3 text-xs',
        icon: 'size-10 p-0'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
}
