import React from 'react';
import { Box, Stack, Paper, Avatar, Typography } from '@mui/material';
import { albumContainer, album, albumItemLeft, paper, albumItemRight, itemDataRight, itemDataLeft } from './styles';
import { GameAlbum } from '../../store/gameSlice';
import { useSelector } from 'react-redux';
import { selectLobby } from '../../store/selectors';

export interface ResultsAlbumProps {
  albumIndex: number;
  gameAlbum: GameAlbum;
}

export const ResultsAlbum = (props: ResultsAlbumProps) => {
  const lobby = useSelector(selectLobby);

  const gameAlbumData = new Map();
  props.gameAlbum.data?.forEach(([key, value]) => gameAlbumData.set(key, value));
  const currentAlbumItem = gameAlbumData.get(lobby.players[props.albumIndex].id);

  return (
    <Box sx={albumContainer}>
      <Stack style={album}>
        {currentAlbumItem?.map(([player, playerData]: [string, string], index: number) => {
          const playerName = lobby.players.filter(lobbyPlayer => lobbyPlayer.id === player)[0].name;
          const playerAvatar = lobby.players.filter(lobbyPlayer => lobbyPlayer.id === player)[0].avatar;
          const playerPaint = index % 2 === 0 ? null : playerData;
          const itemPosition = index % 2 === 0 ? albumItemRight : albumItemLeft;
          const dataPosition = index % 2 === 0 ? itemDataRight : itemDataLeft;
          return (
            <Box sx={itemPosition} key={index}>
              <Avatar src={playerAvatar} alt="playerAvatar"></Avatar>
              <Box sx={dataPosition}>
                <Typography style={{ marginBottom: '1%' }}>{playerName}</Typography>
                <Paper elevation={12} style={paper}>
                  {(playerPaint && <img style={{ width: '20vw', boxShadow: '0px 0px 10px 1px black' }} src={playerPaint} alt="fe" />) ||
                    playerData}
                </Paper>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};
