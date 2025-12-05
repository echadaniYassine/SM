import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const truncate = (str, length = 50) => {
  return str.length > length ? str.substring(0, length) + '...' : str
}

// export const cn = (...classes) => {
//   return classes.filter(Boolean).join(' ')
// }

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}