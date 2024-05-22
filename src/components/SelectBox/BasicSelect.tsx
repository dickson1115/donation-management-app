import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
type BasicSelectProps = {
    id: string,
    value: string,
    items: string[],
    label: string,
    onChange: any,
    error: boolean,
}
export default function BasicSelect({ id, value, items, label, onChange, error}: BasicSelectProps) {


    return (
        <Box
            id={id}
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            
        >
            <FormControl fullWidth>
                <InputLabel error={error} id={"demo-simple-select-label-" + label}>{label}</InputLabel>
                <Select
                    labelId={"demo-simple-select-label-" + label}
                    id={"demo-simple-select-" + label}
                    value={value}
                    label={label}
                    onChange={onChange}
                    error={error}
                >
                    {items.map((item, index) => (<MenuItem key={index} id={"menuItem-" + index} value={item as string} >{item}</MenuItem>))}
                </Select>
            </FormControl>
        </Box>
    );
}