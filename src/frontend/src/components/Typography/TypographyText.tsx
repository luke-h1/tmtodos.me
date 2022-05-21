import React from 'react';
import { styled } from '../../styles/stitches.config';
import { EMProps, StrongProps } from './Typography.types';

const Text = styled('span', {
  margin: '0 0 2.25rem 0',
  padding: 0,
  textRendering: 'optimizeLegibility',

  variants: {
    outline: {
      true: {
        color: 'transparent !important',
        WebkitTextStrokeColor: 'var(--tmtodos-colors-typeface-primary)',
        WebkitTextStrokeWidth: '1px',
      },
    },
    spaced: {
      true: {
        letterSpacing: '0.3px',
        lineHeight: 1.9,
      },
    },
    family: {
      default: {
        fontFamily: 'inherit',
      },
      display: {
        fontFamily: 'var(--font-display)',
      },
      mono: {
        fontFamily: 'var(--font-mono)',
      },
      numeric: {
        fontFamily: 'var(--font-numeric)',
      },
    },
    size: {
      1: {
        fontSize: 'var(--font-size-1)',
      },
      2: {
        fontSize: 'var(--font-size-2)',
      },
      3: {
        fontSize: 'var(--font-size-3)',
      },
      4: {
        fontSize: 'var(--font-size-4)',
      },
      5: {
        fontSize: 'var(--font-size-5)',
      },
      6: {
        fontSize: 'var(--font-size-6)',
      },
      7: {
        fontSize: 'var(--font-size-7)',
      },
    },
    truncate: {
      true: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
    variant: {
      default: { color: 'currentColor' },
      primary: { color: 'var(--tmtodos-colors-typeface-primary)' },
      secondary: { color: 'var(--tmtodos-colors-typeface-secondary)' },
      tertiary: { color: 'var(--tmtodos-colors-typeface-tertiary)' },
      info: { color: 'var(--tmtodos-colors-brand)' },
      success: { color: 'var(--tmtodos-colors-success)' },
      warning: { color: 'var(--tmtodos-colors-warning)' },
      danger: { color: 'var(--tmtodos-colors-danger)' },
    },
    weight: {
      1: {
        fontWeight: 'var(--font-weight-1)',
      },
      2: {
        fontWeight: 'var(--font-weight-2)',
      },
      3: {
        fontWeight: 'var(--font-weight-3)',
      },
      4: {
        fontWeight: 'var(--font-weight-4)',
      },
    },
    gradient: {
      true: {
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    },
  },
  defaultVariants: {
    family: 'default',
    size: '3',
    variant: 'default',
    weight: '2',
    spaced: true,
  },
});

const EM = React.forwardRef<React.ElementRef<'em'>, EMProps>((props, ref) => {
  return (
    <Text
      {...props}
      as="em"
      variant="tertiary"
      weight="3"
      ref={ref}
      spaced={false}
      style={{
        letterSpacing: '-0.3px',
      }}
    />
  );
});
EM.displayName = 'EM';

const Strong = React.forwardRef<React.ElementRef<'strong'>, StrongProps>(
  (props, ref) => {
    return (
      <Text {...props} as="strong" variant="primary" weight="4" ref={ref} />
    );
  },
);
Strong.displayName = 'Strong';
export default Text;
export { EM, Strong };
