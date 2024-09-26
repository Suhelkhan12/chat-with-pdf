import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToASCII(str: string) {
  return str
    .split("")
    .map((char) => char.charCodeAt(0))
    .join(" ");
}
