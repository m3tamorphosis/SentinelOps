import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import { cn } from '~/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'border-border bg-slate-900 text-slate-200',
        primary: 'border-primary/40 bg-primary/10 text-blue-300',
        success: 'border-success/40 bg-success/10 text-green-300',
        warning: 'border-warning/40 bg-warning/10 text-amber-300',
        error: 'border-error/40 bg-error/10 text-red-300',
        muted: 'border-border bg-slate-950 text-slate-400'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />
}
