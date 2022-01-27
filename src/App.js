import React, { useMemo } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import Layout from './Layout';

function App() {
  const mode = useSelector(state => state.option.theme);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          background: {
            default: mode === 'dark' ? '#121212' : '#e4e6eb',
          },

          mode,
        },
        components: {
          MuiTab: {
            styleOverrides: {
              root: {
                textTransform: 'none'
              }
            }
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout />
    </ThemeProvider>
  );
}

export default App;
