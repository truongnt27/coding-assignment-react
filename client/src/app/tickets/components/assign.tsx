import { Ticket, User } from '@acme/shared-models';
import { Assignment } from '@mui/icons-material';
import { IconButton, ListItemText, MenuItem, Popover } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TicketsApi } from 'client/src/api/tickets';
import { UsersApi } from 'client/src/api/users';
import * as React from 'react';
import { queryClient } from '../../app';

const UNASSIGN_KEY = 'Unassign';
interface Props {
  ticket: Ticket;
}
export default function Assign({ ticket }: Props) {
  const { data = [] } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: UsersApi.fetchUsers,
  });

  const { mutate: assignTicket } = useMutation({
    mutationFn: TicketsApi.assignTicket,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      alert('Ticket updated successfully!');
    },
    onError: (error) => {
      alert('Failed to update ticket.');
    },
  });

  const { mutate: unassignTicket } = useMutation({
    mutationFn: TicketsApi.unassignTicket,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      alert('Ticket updated successfully!');
    },
    onError: (error) => {
      alert('Failed to update ticket.');
    },
  });

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSelect = (event: React.MouseEvent<HTMLLIElement>) => {
    const userId = event.currentTarget.id;
    assignTicket({ id: ticket.id, userId: Number(userId) });
    handleClose();
  };

  const onUnassign = (event: React.MouseEvent<HTMLLIElement>) => {
    unassignTicket(ticket.id);
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <Assignment />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuItem key={UNASSIGN_KEY} onClick={onUnassign}>
          <ListItemText>Unassign</ListItemText>
        </MenuItem>
        {data.map((item) => (
          <MenuItem
            key={item.id.toString()}
            onClick={onSelect}
            id={item.id.toString()}
          >
            <ListItemText>{`${item.name} (ID: ${item.id})`}</ListItemText>
          </MenuItem>
        ))}
      </Popover>
    </React.Fragment>
  );
}
