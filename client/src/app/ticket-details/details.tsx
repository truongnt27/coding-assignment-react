import { Ticket } from '@acme/shared-models';
import { Box } from '@mui/material';
interface DetailProps {
  ticket: Ticket;
}
export default function Detail({ ticket }: DetailProps) {
  return (
    <div>
      <Box>{`ID: ${ticket?.id}`}</Box>
      <Box>{`Description: ${ticket?.description}`}</Box>
      <Box>{`Assignee: ${ticket.assignee?.name ?? '--'}`}</Box>
    </div>
  );
}
