import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(value: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    month: 'short',
    day: 'numeric'
  }).format(new Date(value))
}

export function formatRelativeMinutes(minutes: number) {
  if (minutes <= 1) {
    return '1 min ago'
  }

  return `${minutes} mins ago`
}
