import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';

type BasicDatePickerProps = {
  id: string,
  label: string,
  value: Dayjs | null,
  onChange: any,
}

export default function BasicDatePicker({ id, label, onChange, value}: BasicDatePickerProps) {

  return (
    <Box
      id={id}
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      autoComplete="off"
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker label={label} onChange={onChange} value={value} />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}