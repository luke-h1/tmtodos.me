import { motion, useMotionValue, useTransform } from 'framer-motion';
import Text from '../Typography/TypographyText';
import { fixTruncate, HeaderTitleWrapper } from './Styles';

const titleVariants = {
  open: {
    y: 70,
    transition: {
      ease: 'easeInOut',
      duration: 0.4,
    },
  },
  collapsed: {
    y: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.4,
    },
  },
};

interface HeaderTitleProps {
  text: string;
}

interface HeaderProps {
  title?: string;
  offsetHeight?: number;
  showProgressBarOnMobile?: boolean;
}

const HeaderTitle = (props: HeaderTitleProps) => {
  const { text } = props;
  const titleY = useMotionValue(0);
  const titleOpacity = useTransform(titleY, [10, 0], [0, 1]);

  return (
    <HeaderTitleWrapper className={fixTruncate()}>
      <Text
        as={motion.span}
        data-testid="header-title"
        size={4}
        weight={4}
        variants={titleVariants}
        css={{
          marginBottom: 0,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
        style={{
          y: titleY,
          opacity: titleOpacity,
        }}
      >
        <a
          href="#top"
          onClick={event => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          tabIndex={-1}
        >
          {text}
        </a>
      </Text>
    </HeaderTitleWrapper>
  );
};

export default HeaderTitle;
