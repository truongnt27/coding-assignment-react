import { Ticket } from '@acme/shared-models';
import { Visibility } from '@mui/icons-material';
import { Box, Chip, IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import Assign from './assign';
import CompleteAction from './complete';
import Filter from './table-filter';

const headers = ['id', 'description', 'status', 'assignee', 'actions'];

export interface BasicTableProps {
  tickets: Ticket[];
  loading?: boolean;
}
export default function BasicTable({ tickets, loading }: BasicTableProps) {
  const [filter, setFilter] = useState<
    { field: string; condition: string; value: string; label: string }[]
  >([]);

  const onFilter = ({
    field,
    condition,
    value,
    label,
  }: {
    field: string;
    condition: string;
    value: string;
    label: string;
  }) => {
    setFilter([
      {
        field,
        condition,
        value,
        label,
      },
    ]);
  };

  const filteredTickets = tickets.filter((ticket) => {
    return filter.every((item) => {
      if (item.condition === 'isCompleted') {
        return ticket[item['field'] as keyof Ticket]?.toString() === item.value;
      }
      return false;
    });
  });

  const handleDelete = () => {
    setFilter([]);
  };

  return (
    <TableContainer component={Paper}>
      <Box sx={{ display: 'flex', justifyContent: 'end', p: 2 }}>
        <Filter onChange={onFilter} />
      </Box>
      {filter.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
          Filters:
          {filter.map((item) => (
            <Chip
              variant="outlined"
              color="info"
              label={item.label}
              onDelete={handleDelete}
            />
          ))}
        </Box>
      )}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((item) => (
              <TableCell
                sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                align="left"
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading
            ? filteredTickets.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="left">
                    {row.completed ? (
                      <Chip label="Completed" color="success" />
                    ) : (
                      <Chip label="In progress" color="info" />
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {row.assignee ? row.assignee.name : '--'}
                  </TableCell>
                  <TableCell align="left">
                    <IconButton href={'/tickets/' + row.id}>
                      <Visibility />
                    </IconButton>
                    <CompleteAction ticket={row} />
                    <IconButton>
                      <Assign ticket={row} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            : 'Loading'}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
