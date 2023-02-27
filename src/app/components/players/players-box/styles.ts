export const playersContainer = {
  height: '100%',
  padding: '2%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '1px solid',
  borderRadius: '10px',
};

export const playersListContainer = {
  height: '100%',
  width: '98%',
  overflow: 'auto',
  paddingLeft: '7px',
  paddingRight: '7px',

  '&::-webkit-scrollbar': {
    width: '5px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#e0e0e3',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#a3b8c8',
  },
};

export const playersList = {
  width: '100%',
  height: '1vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const playersListResults = {
  padding: '2%',
  width: '100%',
  height: '65vh',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
