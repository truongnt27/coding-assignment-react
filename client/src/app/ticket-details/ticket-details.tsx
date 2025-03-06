import { Ticket } from '@acme/shared-models';
import { useQuery } from '@tanstack/react-query';
import { TicketsApi } from 'client/src/api/tickets';
import { UsersApi } from 'client/src/api/users';
import { useParams } from 'react-router-dom';
import Detail from './details';
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

  const { data: userData } = useQuery({
    queryKey: ['users'],
    queryFn: () => UsersApi.fetchUserById(ticketData?.assigneeId as number),
    enabled: !!ticketData?.assigneeId,
  });

  if (!ticketData || isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <div className={styles['container']}>
      <Detail ticket={{ ...ticketData, assignee: userData }} />
    </div>
  );
}

export default TicketDetails;
