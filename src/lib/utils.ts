import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Função de deep merge
export const deepMerge = <T>(target: T, source: T): T => {
  if (Array.isArray(target) && Array.isArray(source)) {
    // Combina dois arrays
    return [...target, ...source] as T;
  }

  if (
    typeof target === 'object' &&
    typeof source === 'object' &&
    target !== null &&
    source !== null
  ) {
    // Se ambos são objetos, merge recursivo
    const result = { ...target } as T;
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        result[key] = deepMerge(result[key], source[key]);
      }
    }
    return result;
  }

  // Caso base: retorna o valor do source
  return source;
};
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
