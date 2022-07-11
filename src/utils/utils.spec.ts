import { getDateRangeByLastMonth } from './date.utils';

describe('DateUtils', () => {
  describe('getDateRangeByLastMonth', () => {
    it('should be defined', () => {
      expect(getDateRangeByLastMonth).toBeDefined();
    });

    it('should return date range', () => {
      const dateRange = getDateRangeByLastMonth('january');
      expect(dateRange.monthFirstDate).toBeInstanceOf(Date);
      expect(dateRange.monthLastDate).toBeInstanceOf(Date);
    });
  });
});
