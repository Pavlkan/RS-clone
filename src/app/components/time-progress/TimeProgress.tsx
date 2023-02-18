import { CircularProgress, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';

type TimeProgressProps = {
  minutes?: number;
};

const TimeProgress: React.FC<TimeProgressProps> = ({ minutes = 1 }) => {
  const [progress, setProgress] = useState(0);
  const increment = 5;
  const iterations = 100 / increment;
  const interval = (minutes * 60 * 1000) / iterations;
  const theme = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => (prevProgress >= 100 ? 0 : prevProgress + increment));
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
