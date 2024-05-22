import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { summaryData } from '../../App';
import BasicPie from '../PieChart/BasicPie';
import Box from '@mui/material/Box';

type BasicTableProps = {
  listHeaders: string[],
  dataArray: summaryData[],
}

export default function BasicTable({ listHeaders, dataArray }: BasicTableProps) {
  return (
    <Box
      sx={{ border: '2px solid lightgrey' }}
      m={2}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
    >
      <BasicPie
        /* Remove money type from the piechart to keep the quantity of the rest of the item types in scale */
        dataArray={dataArray.filter((type)=> type.label !== "Money")}
        width={800}
        height={400}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              {listHeaders.map((listHeader, index) => (<TableCell key={index} align={index === 0 ? "left" : "right"}>{listHeader}</TableCell>))}
            </TableRow>
          </TableHead>
          <TableBody>

            {dataArray.map((data) => (

              <TableRow
                key={data.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding="checkbox">
                </TableCell>
                {Object.keys(data).map((keyName, index) => (keyName === "id" ? null : <TableCell key={index}
                  align={index === 1 ? "left" : "right"}>{data[keyName as keyof summaryData]}</TableCell>))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}