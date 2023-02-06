import { addDays } from 'date-fns';

export function generateExpirationDate(): Date {
  return addDays(new Date(), 1);
}
