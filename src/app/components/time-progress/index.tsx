import { CircularProgress, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';

type TimeProgressProps = {
  timeInMilsec?: number;
};

const TimeProgress: React.FC<TimeProgressProps> = ({ timeInMilsec = 60000 }) => {
  const [progress, setProgress] = useState(0);
  const increment = 5;
  const iterations = 100 / increment;
  const interval = timeInMilsec / iterations;
  const theme = useTheme();

  useEffect(() => {
    let timer = setTimeout(function tick() {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 0;
        } else {
          return prevProgress + increment;
        }
      });
      timer = setTimeout(tick, interval);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <CircularProgress
      sx={{ color: progress < 80 ? theme.palette.text.primary : theme.palette.warning.light }}
      variant="determinate"
      value={progress}
      thickness={12}
      size={60}
    />
  );
};

export default TimeProgress;
