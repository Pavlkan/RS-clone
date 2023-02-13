
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentRound, selectGame, selectIsFirstRound } from '../store/selectors';
import { WritingPhase } from '../components/game/writing-phase/WritingPhase';
import { DrawingPhase } from '../components/game/drawing-phase/DrawingPhase';
import { useNavigate } from 'react-router-dom';

export const GamePage = () => {
  const game = useSelector(selectGame);
  const currentRound = useSelector(selectCurrentRound);
  const isFirstRound = useSelector(selectIsFirstRound);
  const navigate = useNavigate();

  useEffect(() => {
    if (game.isCompleted) {
      navigate('/results');
    }
  }, [game.isCompleted]);

  if (currentRound?.type === 'writing') {
    return <WritingPhase isInitialWrite={isFirstRound} phaseAmount={game.roundsCount} currentPhase={game.rounds.length} />;
  } else if (currentRound?.type === 'drawing') {
    return <DrawingPhase isInitialWrite={isFirstRound} phaseAmount={game.roundsCount} currentPhase={game.rounds.length} />;
  } else {
    return null;
  }
};
