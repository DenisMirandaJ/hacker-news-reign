import { parseNestedCsv, RecursiveArray } from '../../../utils/utils';

/**
 * Parse the tags query Parameter. Ex. "a, (b,c)" becomes ["a", ["b", "c"]]
 * @param tagsStr - Tags search query as expected from the original Hacker News API https://hn.algolia.com/api/
 * @returns Parsed tags as a recursive Array.
 */
export const transformSearchQueryTags = (
  tagsStr: any,
): RecursiveArray<string> => {
  if (!tagsStr) {
    return undefined;
  }
  return parseNestedCsv(tagsStr as string);
};
