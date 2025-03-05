import { Ticket } from '@acme/shared-models';
import { Done, RemoveDone } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { TicketsApi } from 'client/src/api/tickets';
import { queryClient } from '../../app';

export default function CompleteAction({ ticket }: { ticket: Ticket }) {
  const { mutate: completeTicket } = useMutation({
    mutationFn: TicketsApi.markTicketComplete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      alert('Ticket updated successfully!');
    },
    onError: (error) => {
      alert('Failed to update ticket.');
    },
  });

  const { mutate: incompleteTicket } = useMutation({
    mutationFn: TicketsApi.markTicketIncomplete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      alert('Ticket updated successfully!');
    },
    onError: (error) => {
      alert('Failed to update ticket.');
    },
  });

  const onSubmit = () => {
    if (ticket.completed) {
      incompleteTicket(ticket.id);
    } else {
      completeTicket(ticket.id);
    }
  };

  return (
    <IconButton onClick={onSubmit}>
      {ticket.completed ? <RemoveDone /> : <Done />}
    </IconButton>
  );
}
