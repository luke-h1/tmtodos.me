/**
 * Returns true if the element is of type P, returns false otherwise
 * @param {any} element
 * @param {React.ComponentType<P>} ComponentType
 * @returns {boolean}
 */

export function isElementOfType<T = {}>(
  element: unknown,
  ComponentType: React.ComponentType<T>,
): element is React.ElementType<T> {
  // return element instanceof ComponentType;
  const reactElement = element as React.ReactElement;

  // @ts-ignore ts complains about displayName not existing on `type`
  return reactElement?.type?.displayName === ComponentType.displayName;
}
