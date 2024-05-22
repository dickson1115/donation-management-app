import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


type BasicBoxTextFieldsProps = {
  id: string,
  label: string,
  value: string|number,
  onChange: any,
  type: string,
  error: boolean,
  hidden: boolean
}
export default function BasicBoxTextFields({id, label, value, onChange, type, error, hidden}: BasicBoxTextFieldsProps) {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      hidden={hidden}
    >
      <TextField  error={error} id={id} label={label} variant="outlined" value={value} onChange={onChange} type={type} />
    </Box>
  );
}