import { ReactElement, ReactNode } from 'react';
import { isElementOfType } from '../../styles/utils/isElementOfType';
import { CardHeader } from './Card.styles';

export function isHeaderElement(
  child: ReactNode,
): child is ReactElement<{ children?: React.ReactNode }> {
  return isElementOfType(child, CardHeader);
}
