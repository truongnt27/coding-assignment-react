import { Ticket, User } from '@acme/shared-models';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { TicketsApi } from 'client/src/api/tickets';
import { UsersApi } from 'client/src/api/users';
import { useMemo } from 'react';
import CreateDialog from './components/dialog';
import TicketsTable from './components/table';

export interface TicketsProps {}

export function Tickets() {
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ['tickets'],
    queryFn: TicketsApi.fetchTickets,
  });

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: UsersApi.fetchUsers,
  });

  const hashUser = useMemo(
    () =>
      users.reduce((acc: Record<number, User>, user: User) => {
        acc[user.id] = user;
        return acc;
      }, {}),
    [users]
  );

  const normalizeTickets = useMemo(
    () =>
      tickets.map((item: Ticket) => ({
        ...item,
        assignee: (item.assigneeId && hashUser[item.assigneeId]) || undefined,
      })),
    [tickets]
  );

  return (
    <Box display={'flex'} flexDirection={'column'} gap={2}>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <CreateDialog />
      </Box>
      <TicketsTable tickets={normalizeTickets} loading={isLoading} />
    </Box>
  );
}

export default Tickets;
