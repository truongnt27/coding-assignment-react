import { Ticket, User } from '@acme/shared-models';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import styles from './app.module.css';
import Tickets from './tickets/tickets';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const App = () => {
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [users, setUsers] = useState([] as User[]);

  // Very basic way to synchronize state with server.
  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).
  useEffect(() => {
    async function fetchTickets() {
      const data = await fetch('/api/tickets').then();
      setTickets(await data.json());
    }

    async function fetchUsers() {
      const data = await fetch('/api/users').then();
      setUsers(await data.json());
    }

    fetchTickets();
    fetchUsers();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles['app']}>
        <h1>Ticketing App</h1>
        <Routes>
          <Route path="/" element={<Tickets tickets={tickets} />} />
          <Route path="/:id" element={<h2>Details Not Implemented</h2>} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
