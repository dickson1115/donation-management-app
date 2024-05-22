import { PieChart } from '@mui/x-charts/PieChart';
import {
  // blueberryTwilightPalette,
  blueberryTwilightPaletteDark,
} from '@mui/x-charts/colorPalettes';

type data = {
  id: number,
  value: number,
  label: string,
};

type BasicPieProps = {
  dataArray: data[],
  width: number,
  height: number,
}

const palette = [
  'gray',
  'lightgray',
  'black',
  '#8da0cb',
  '#e78ac3',
  '#a6d854',

];

export default function BasicPie({ dataArray, width, height }: BasicPieProps) {
  return (
    <PieChart
      series={[{
        data: dataArray,
        // arcLabel: (params) => params.label ?? '',
      }]}
      width={width}
      height={height}
      colors={[...blueberryTwilightPaletteDark, ...palette]}
    />
  );
}