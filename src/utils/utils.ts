import Bottleneck from 'bottleneck';
import { toJson } from 'really-relaxed-json';

export const apiRateLimiter = new Bottleneck({
  minTime: 100, //miliseconds,
  maxConcurrent: 1,
});

/**
 * Check if str has valid brackets
 * '(hello (world))' => true
 * '(hello (world)' => false
 *
 * taken from https://www.tutorialspoint.com/validating-brackets-in-a-string-in-javascript
 * @param str - string to check
 * @returns {boolean}
 */
export const validateBrackets = (str: string) => {
  const strArr = str.split('');
  let counter = 0;
  for (let i = 0, len = strArr.length; i < len; i++) {
    if (strArr[i] === '(') {
      counter++;
    } else if (strArr[i] === ')') {
      counter--;
    }
    if (counter < 0) {
      return false;
    }
  }
  if (counter === 0) {
    return true;
  }
  return false;
};

export type RecursiveArray<T> = (T | RecursiveArray<T>)[];
/**
 * Transform a comma separated strings with parenthesis to a recursive Array
 * @param nestedCsvText - CSV string with optional and posibly recursive parenthesis, Ex. "a, b, c, (d, e, (f , g)), (h, i), j"
 * @returns parsed recursive array. Ex. ['a', 'b', 'c', ['d', 'e', ['f', 'g']], ['h', 'i'], 'j']
 */
export function parseNestedCsv<T>(nestedCsvText: string): RecursiveArray<T> {
  // We basically replace paretheses with brackets and let JSON.parse do the rest of the job
  let nestedCsvTextWithBrackets = nestedCsvText
    .replace('(', '[')
    .replace(')', ']')
    .trim();

  nestedCsvTextWithBrackets = `[${nestedCsvTextWithBrackets}]`;

  // We use the relaxed-json library, to parse the tags string into a Json array. It avoids using eval so it's safe to use
  const parsedRelaxedJson = toJson(nestedCsvTextWithBrackets);

  return JSON.parse(parsedRelaxedJson);
}

interface ToNumberOptions {
  default?: number;
  min?: number;
  max?: number;
}
export function parseQueryNumber(
  value: string,
  opts: ToNumberOptions = {},
): number {
  let newValue: number = Number.parseInt(value || String(opts.default), 10);

  if (Number.isNaN(newValue)) {
    newValue = opts.default;
  }

  if (opts.min) {
    if (newValue < opts.min) {
      newValue = opts.min;
    }

    if (newValue > opts.max) {
      newValue = opts.max;
    }
  }

  return newValue;
}
