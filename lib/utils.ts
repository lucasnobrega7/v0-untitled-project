import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names with Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

/**
 * Formats a currency value
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

/**
 * Truncates a string to a specified length
 */
export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str
  return `${str.slice(0, length)}...`
}
