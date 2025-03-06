import { FilterAlt } from '@mui/icons-material';
import {
  Box,
  IconButton,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { useState } from 'react';

export interface BasicTableProps {
  onChange: (payload: {
    field: string;
    condition: string;
    value: string;
    label: string;
  }) => void;
}
export default function Filter({ onChange }: BasicTableProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const handleChange = (event: SelectChangeEvent) => {
    onChange({
      field: 'completed',
      condition: 'isCompleted',
      value: event.target.value as string,
      label: 'Status isCompleted ' + event.target.value,
    });
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <FilterAlt />
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
        <Box sx={{ px: 2, py: 3 }}>
          <div>Filters</div>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Select
              labelId="demo-simple-select-label"
              defaultValue="status"
              label="Field"
              size="small"
            >
              <MenuItem value={'status'}>status</MenuItem>
            </Select>
            <Select
              labelId="demo-simple-select-label"
              defaultValue={'isCompleted'}
              label="Condition"
              size="small"
            >
              <MenuItem value={'isCompleted'}>isCompleted</MenuItem>
            </Select>
            <Select
              labelId="demo-simple-select-label"
              label="Age"
              size="small"
              onChange={handleChange}
            >
              <MenuItem value={'true'}>True</MenuItem>
              <MenuItem value={'false'}>False</MenuItem>
            </Select>
          </Box>
        </Box>
      </Popover>
    </>
  );
}
