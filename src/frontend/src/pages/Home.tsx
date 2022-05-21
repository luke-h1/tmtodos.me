import { motion, MotionProps } from 'framer-motion';
import { css } from '../styles/stitches.config';

const WavingHand = () => {
  return (
    <motion.div
      style={{
        marginBottom: '-20px',
        marginRight: '-45px',
        paddingBottom: '20px',
        paddingRight: '45px',
        display: 'inline-block',
      }}
      animate={{ rotate: 20 }}
      transition={{
        repeat: 7,
        repeatType: 'mirror',
        duration: 0.2,
        delay: 0.5,
        ease: 'easeInOut',
        type: 'tween',
      }}
    >
      👋
    </motion.div>
  );
};

let year = 0;

const cardVariants = {
  hover: {
    scale: 1.05,
  },
  initial: {
    scale: 1,
  },
};

const glowVariants = {
  hover: {
    opacity: 0.8,
  },
  initial: {
    scale: 1.05,
    opacity: 0,
  },
};

const wrapperGrid = css({
  '> *': {
    gridColumn: 2,
  },
});

const HomePage = () => {
  return <p>hi</p>;
};

export default HomePage;
