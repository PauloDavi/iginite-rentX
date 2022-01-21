export interface IDateProvider {
  hoursBetweenDates(start_date: Date, end_date: Date): number;
  daysBetweenDates(start_date: Date, end_date: Date): number;
  compareIsBefore(start_date: Date, end_date: Date): boolean;
  addDays(days: number): Date;
  addHours(hours: number): Date;
}
