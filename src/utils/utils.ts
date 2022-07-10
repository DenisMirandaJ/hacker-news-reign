import Bottleneck from 'bottleneck';

export const apiRateLimiter = new Bottleneck({
  minTime: 100, //miliseconds,
  maxConcurrent: 1,
});

type RecursiveArray<T> = (T | RecursiveArray<T>)[];
function parseNestedCsv<T>(nestedCsvText: string): RecursiveArray<T> {
  
}
