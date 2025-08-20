// utils/dateUtils.ts
export const ensureDate = (date: Date | string | null): Date | null => {
  if (!date) return null;
  if (date instanceof Date) return date;
  const d = new Date(date);
  return isNaN(d.getTime()) ? null : d;
};

export const toISODateString = (date: Date | string | null): string | null => {
  const d = ensureDate(date);
  return d ? d.toISOString() : null;
};
