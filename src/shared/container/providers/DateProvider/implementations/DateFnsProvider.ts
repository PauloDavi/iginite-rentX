import { differenceInDays, differenceInHours } from "date-fns";

import { IDateProvider } from "../IDateProvider";

export class DateFnsProvider implements IDateProvider {
  hoursBetweenDates(start_date: Date, end_date: Date): number {
    return differenceInHours(end_date, start_date);
  }

  daysBetweenDates(start_date: Date, end_date: Date): number {
    return differenceInDays(end_date, start_date);
  }
}
