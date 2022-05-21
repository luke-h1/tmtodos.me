import { useAnimation, motion } from 'framer-motion';
import {
  BaseSyntheticEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { css } from '../styles/stitches.config';
import VisuallyHidden from './VisuallyHidden';

interface Props {
  id: string;
  tooltipText: string;
  tooltipVisuallyHiddenText?: string;
  children?: React.ReactNode;
}

const wrapper = css({
  position: 'relative',
});

const tooltipStyle = css({
  color: 'hsla(var(--palette-gray-00))',
  background: 'hsla(var(--palette-gray-75))',
  borderRadius: 'var(--border-radius-0)',
  position: 'absolute',
  bottom: '-60%',
  fontWeight: 'var(--font-weight-3)',
  fontSize: 'var(--font-size-1)',
  display: 'flex',
  padding: '4px 10px',
  zIndex: 5,
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  userSelect: 'none',
});

const Tooltip = ({
  id,
  tooltipText,
  tooltipVisuallyHiddenText,
  children,
}: Props) => {
  const [dimensions, setDimensions] = useState({
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
  });

  const controls = useAnimation();

  const tooltipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function HandleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    window.addEventListener('resize', HandleResize);
    return () => {
      window.removeEventListener('resize', HandleResize);
    };
  }, []);

  const handlePosition = useCallback(
    (tooltipRef: RefObject<HTMLSpanElement>) => {
      const { current } = tooltipRef;

      if (current) {
        const tooltipRect = current.getBoundingClientRect();

        if (tooltipRect.left < 0) {
          current.style.left = '0';
          current.style.right = 'auto';
          current.style.transform = `translateX(${-tooltipRect.x - 40}px)`;
        } else if (tooltipRect.right > dimensions.width) {
          current.style.left = 'auto';
          current.style.right = '0';
          current.style.transform = `translateX(${
            dimensions.width - tooltipRect.right + 40
          }px)`;
        }
      }
    },
    [dimensions],
  );

  function hideTooltip() {
    if (tooltipRef.current) {
      tooltipRef.current.setAttribute('aria-hidden', 'true');
      controls.start('idle');
      resetPosition(tooltipRef);
    }
  }

  const resetPosition = (tooltipRef: RefObject<HTMLSpanElement>) => {
    const { current } = tooltipRef;

    if (current) {
      current.style.removeProperty('left');
      current.style.removeProperty('right');
      current.style.removeProperty('transform');
    }
  };
  const showTooltip = (event: BaseSyntheticEvent) => {
    let target = event.target;

    if (target.hasAttribute('disabled')) {
      target = target.parentElement;
    }
    target.addEventListener('mouseLeave', hideTooltip);

    if (tooltipRef.current) {
      tooltipRef.current.setAttribute('aria-hidden', 'false');
      controls.start('hover');
      handlePosition(tooltipRef);
    }
  };

  const tipVariants = {
    hover: {
      scale: 1,
      y: 6,
      opacity: 1,
    },
    idle: {
      scale: 0.95,
      y: 10,
      opacity: 0,
    },
  };

  return (
    <motion.div
      className={wrapper()}
      initial="idle"
      animate={controls}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      onKeyDown={e => {
        if (e.key === 'Escape') {
          e.preventDefault();
          hideTooltip();
          return false;
        }
      }}
    >
      {children}
      <motion.span
        id={id}
        className={tooltipStyle()}
        aria-hidden="true"
        ref={tooltipRef}
        variants={tipVariants}
        transition={{ delay: 0.15 }}
        role="tooltip"
      >
        {tooltipText}
        {tooltipVisuallyHiddenText && (
          <VisuallyHidden as="p">{tooltipVisuallyHiddenText}</VisuallyHidden>
        )}
      </motion.span>
    </motion.div>
  );
};
export default Tooltip;
