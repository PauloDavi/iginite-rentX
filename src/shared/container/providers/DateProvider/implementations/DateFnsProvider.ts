import {
  addDays,
  addHours,
  differenceInDays,
  differenceInHours,
  isBefore,
} from "date-fns";

import { IDateProvider } from "../IDateProvider";

export class DateFnsProvider implements IDateProvider {
  hoursBetweenDates(start_date: Date, end_date: Date): number {
    return differenceInHours(end_date, start_date);
  }

  daysBetweenDates(start_date: Date, end_date: Date): number {
    return differenceInDays(end_date, start_date);
  }

  compareIsBefore(start_date: Date, end_date: Date): boolean {
    return isBefore(start_date, end_date);
  }

  addDays(days: number): Date {
    return addDays(new Date(), days);
  }

  addHours(hours: number): Date {
    return addHours(new Date(), hours);
  }
}
