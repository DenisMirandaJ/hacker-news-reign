declare type Class<T = any> = new (...args: any[]) => T;
/**
 * returns True if an exception of the specified type is thrown while running the fn function, false otherwise
 *
 * @param fn - Any function
 * @param exception - Exception Class
 * @returns {boolean} - True if an exception of the specified type is thrown, false otherwise
 */
export const throwsSpecificException = async (
  fn: () => any,
  exception: Class,
) => {
  try {
    await fn();
    return false;
  } catch (error) {
    if (error instanceof exception) {
      return true;
    }

    return false;
  }
};
