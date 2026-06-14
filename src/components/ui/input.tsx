import type * as React from 'react'
import { cn } from '~/lib/utils'

export function Input({ className, type, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        'h-10 w-full rounded-xl border border-border bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-primary/70 focus:ring-2 focus:ring-primary/20 placeholder:text-slate-500',
        className
      )}
      {...props}
    />
  )
}
