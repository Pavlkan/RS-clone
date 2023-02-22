export const landingPageContainer = {
  padding: '2%',
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  gridTemplateColumns: '100%',
  gap: '5%',
  minHeight: '100vh',
};

export const playersAuthorizationContainer = {
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10%',
  border: '1px solid',
  borderRadius: '10px',
  maxHeight: '50vh',
};

export const playersNickNameContainer = {
  '& > :not(style)': { m: 1, width: '25ch' },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
