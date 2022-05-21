import { CSS, VariantProps } from '../../styles/stitches.config';
import { DEFAULT_TAG } from './Typography.constants';
import Text from './TypographyText';
import { ComponentProps, HTMLAttributes } from 'react';

export type TextSizeVariants = Pick<
  VariantProps<typeof Text>,
  'size' | 'variant' | 'gradient'
>;

export type EMProps = HTMLAttributes<HTMLParagraphElement> & TextSizeVariants;

export type StrongProps = HTMLAttributes<HTMLParagraphElement> &
  TextSizeVariants;

export type HeadingSizeVariants = '1' | '2' | '3' | '4';

export type HeadingVariants = { size?: HeadingSizeVariants } & Omit<
  VariantProps<typeof Text>,
  'size'
>;

export type HeadingProps = ComponentProps<typeof DEFAULT_TAG> &
  HeadingVariants & { css?: CSS; as?: any };

export type ShortHandHeadingProps = Omit<HeadingProps, 'size' | 'as'>;
