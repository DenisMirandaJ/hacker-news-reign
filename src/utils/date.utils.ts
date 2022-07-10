import { MonthNameType } from '../types/miscellanius.type';

export const monthIndex = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

export const monthNames = Object.keys(monthIndex);

/**
 * Returns the first last days of the last instance of a given month
 * @param month - string name of a month
 */
export const getDateRangeByLastMonth = (month: MonthNameType) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  let dateRange =
    month !== 'december'
      ? {
          monthFirstDate: new Date(currentYear, monthIndex[month], 1),
          monthLastDate: new Date(currentYear, monthIndex[month] + 1, 0),
        }
      : {
          monthFirstDate: new Date(currentYear, 11, 1),
          monthLastDate: new Date(currentYear, 11, 31),
        };

  if (dateRange.monthFirstDate > currentDate) {
    dateRange =
      month !== 'december'
        ? {
            monthFirstDate: new Date(currentYear - 1, monthIndex[month], 1),
            monthLastDate: new Date(currentYear - 1, monthIndex[month] + 1, 0),
          }
        : {
            monthFirstDate: new Date(currentYear - 1, 11, 1),
            monthLastDate: new Date(currentYear - 1, 11, 31),
          };
  }

  return dateRange;
};
