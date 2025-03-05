import { Ticket } from '@acme/shared-models';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { TicketsApi } from 'client/src/api/tickets';
import { UsersApi } from 'client/src/api/users';
import { useParams } from 'react-router-dom';
import styles from './ticket-details.module.css';

/* eslint-disable-next-line */
export interface TicketDetailsProps {}

export function TicketDetails(props: TicketDetailsProps) {
  const params = useParams();
  const id = params['id'];

  const { data: ticketData, isLoading } = useQuery<Ticket>({
    queryKey: ['tickets'],
    queryFn: () => TicketsApi.fetchTicketById(Number(id)),
    enabled: !!id,
  });

  const { data: userData = [] } = useQuery({
    queryKey: ['users'],
    queryFn: () => UsersApi.fetchUserById(ticketData?.assigneeId as number),
    enabled: !!ticketData?.assigneeId,
  });
  return (
    <div className={styles['container']}>
      <Box>
        <Box>ID: {ticketData?.id}</Box>
        <Box>Description: {ticketData?.description}</Box>
        <Box>Assignee: {userData?.name ?? '--'}</Box>
      </Box>
    </div>
  );
}

export default TicketDetails;
