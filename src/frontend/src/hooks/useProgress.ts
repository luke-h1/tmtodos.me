import { useViewportScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

const useProgress = () => {
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const { scrollYProgress } = useViewportScroll();

  useEffect(
    () =>
      scrollYProgress.onChange((latest: number) => {
        setReadingProgress(parseFloat(latest.toFixed(2)));
      }),
    [scrollYProgress],
  );
  return readingProgress;
};
export default useProgress;
