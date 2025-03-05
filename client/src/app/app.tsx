import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styles from './app.module.css';
import TicketDetails from './ticket-details/ticket-details';
import Tickets from './tickets/tickets';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});
// Create a client
export const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <div className={styles['app']}>
          <h1>Ticketing App</h1>
          <Routes>
            <Route path="/" element={<Tickets />} />
            <Route path="/tickets/:id" element={<TicketDetails />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
