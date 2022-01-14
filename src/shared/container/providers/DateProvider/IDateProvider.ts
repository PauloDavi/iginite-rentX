export interface IDateProvider {
  hoursBetweenDates(start_date: Date, end_date: Date): number;
}
