import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names and resolves Tailwind conflicts.
 * @param inputs - The class names to merge.
 * @returns A properly merged class string.
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
