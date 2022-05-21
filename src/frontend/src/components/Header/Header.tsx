/* eslint-disable jsx-a11y/anchor-is-valid */
import { AnimatePresence } from 'framer-motion';
import Flex from '../Flex/Flex';
import Grid from '../Grid/Grid';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import {
  fixTruncate,
  HeaderContent,
  HeaderPadding,
  HeaderProgressBar,
  HeaderWrapper,
} from './Styles';
import HeaderTitle from './Title';
import { Link } from 'react-router-dom';
import Tooltip from '../Tooltip';
import useProgress from '../../hooks/useProgress';

const headerVariants = {
  open: {
    height: 120,
    transition: { ease: 'easeInOut', duration: 0.3 },
  },
  collapsed: {
    height: 60,
    transition: { ease: 'easeInOut', duration: 0.3, delayChildren: 0.5 },
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

const Header = (props: HeaderProps) => {
  const { title, offsetHeight = 120, showProgressBarOnMobile } = props;
  const readingProgress = useProgress();

  return (
    <>
      <HeaderWrapper
        initial="open"
        variants={headerVariants}
        css={{
          borderColor: 'transparent',
        }}
      >
        <Grid columns="medium" gapX={4}>
          <HeaderContent
            alignItems="center"
            justifyContent="space-between"
            className={fixTruncate()}
          >
            <Flex className={fixTruncate()}>
              <Tooltip id="hometooltip" tooltipText="Home">
                <Link
                  to="/"
                  data-testid="header-logo"
                  aria-label="Home"
                  aria-describedby="hometooltip"
                >
                  Logo
                </Link>
              </Tooltip>
              {title ? <HeaderTitle text={title} /> : null}
            </Flex>
            <Flex gap={3}>
              <ThemeSwitch />
            </Flex>
          </HeaderContent>
        </Grid>
        {showProgressBarOnMobile && (
          <HeaderProgressBar
            style={{
              scaleX: readingProgress,
            }}
          />
        )}
      </HeaderWrapper>
      <HeaderPadding css={{ '--offsetHeight': `${offsetHeight}px` }} />
    </>
  );
};

export default Header;
