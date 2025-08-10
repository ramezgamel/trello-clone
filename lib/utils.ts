import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function closeDialog() {
  const trigger = document.querySelector(
    `[data-state="open"]`
  ) as HTMLButtonElement;
  if (trigger) {
    trigger.click();
  }
}
