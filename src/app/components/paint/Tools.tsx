import * as React from 'react';
import { Box, Grid, IconButton, Tooltip } from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import RectangleTwoToneIcon from '@mui/icons-material/RectangleTwoTone';
import PanoramaFishEyeTwoToneIcon from '@mui/icons-material/PanoramaFishEyeTwoTone';
import ChangeHistoryTwoToneIcon from '@mui/icons-material/ChangeHistoryTwoTone';

const toolsOptions = [
  { id: 'brush', name: 'Brush', icon: <BrushIcon sx={{ fontSize: 40 }} /> },
  { id: 'eraser', name: 'Eraser', icon: <AutoFixNormalIcon sx={{ fontSize: 40 }} /> },
  { id: 'rectangle', name: 'Rectangle', icon: <RectangleOutlinedIcon sx={{ fontSize: 40 }} /> },
  { id: 'circle', name: 'Circle', icon: <PanoramaFishEyeIcon sx={{ fontSize: 40 }} /> },
  { id: 'triangle', name: 'Triangle', icon: <ChangeHistoryIcon sx={{ fontSize: 40 }} /> },
  { id: 'rectangle-fill', name: 'Rectangle filled', icon: <RectangleTwoToneIcon sx={{ fontSize: 40 }} /> },
  { id: 'circle-fill', name: 'Circle filled', icon: <PanoramaFishEyeTwoToneIcon sx={{ fontSize: 40 }} /> },
  { id: 'triangle-fill', name: 'Triangle filled', icon: <ChangeHistoryTwoToneIcon sx={{ fontSize: 40 }} /> },
];

type ToolsProps = {
  activeToolId: string;
  onToolChange: (id: string) => void;
};

export const Tools: React.FC<ToolsProps> = ({ activeToolId, onToolChange }) => {
  const hanleSelectTool = (id: string) => {
    onToolChange(id);
  };

  const tools = toolsOptions.map(({ id, name, icon }) => {
    return (
      <Grid onClick={() => hanleSelectTool(id)} key={name} m={0.5} item xs={5} sx={{ opacity: id === activeToolId ? 1 : 0.5 }}>
        <Tooltip title={name}>
          <IconButton>{icon}</IconButton>
        </Tooltip>
      </Grid>
    );
  });

  return (
    <Box
      sx={{
        marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Grid container justifyContent="center" alignItems="flex-start" spacing={0}>
        {tools}
      </Grid>
    </Box>
  );
};
