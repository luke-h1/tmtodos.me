import { Shadows, styled } from '../../styles/stitches.config';
import Box from '../Box/Box';

export const CardWrapper = styled(Box, {
  position: 'relative',
  background: 'var(--card-background, var(--tmtodos-card-background-color))',
  backdropFilter: 'var(--card-blur, none)',
  borderRadius: 'var(--border-radius-2)',
  boxShadow: 'var(--card-shadow)',
  border: '1px solid var(--tmtodos-border-color)',
  overflow: 'hidden',

  variants: {
    glass: {
      true: {
        '--card-background': 'var(--tmtodos-colors-foreground)',
        '--card-blur': 'blur(6px)',
      },
    },
    depth: {
      0: {
        '--card-shadow': Shadows[0],
      },
      1: {
        '--card-shadow': Shadows[1],
      },
      2: {
        '--card-shadow': Shadows[2],
      },
      3: {
        '--card-shadow': Shadows[3],
      },
    },
  },
  defaultVariants: {
    depth: 1,
  },
});

export const CardHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTopLeftRadius: 'var(--border-radius-1)',
  borderTopRightRadius: 'var(--border-radius-1)',
  minHeight: '50px',
  padding: '0px 24px',
  color: 'var(--tmtodos-colors-typeface-tertiary)',
  fontWeight: 500,
  fontSize: 'var(--font-size-2)',
  borderBottom: '1px solid var(--tmtodos-border-color)',
});

CardHeader.displayName = 'CardHeader';

export const CardBody = styled('div', {
  overflow: 'hidden',
  padding: '36px 24px',
  position: 'relative',

  variants: {
    dotMatrix: {
      true: {
        backgroundImage:
          'radial-gradient(var(--tmtodos-border-color) 1px, transparent 0)',
        backgroundPosition: '50% center',
        backgroundSize: '20px 20px',
      },
    },
  },
});
