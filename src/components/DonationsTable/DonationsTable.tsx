import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import type { donationItem } from '../../App'
import type { donationTypes } from '../../App'
import BasicSelect from '../SelectBox/BasicSelect';
import { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Checkbox } from '@mui/material';
import DonationInputForm from '../DonationInputForm/DonationInputForm';

type DonationListProps = {
    donationItemSet: donationItem[],
    setDonationItemSet: any,
    donationTypeSet: donationTypes[],
    tableHeaders: string[],
}

export default function DonationsTable({ donationItemSet, setDonationItemSet, donationTypeSet, tableHeaders }: DonationListProps) {

    const [selectedCheckBoxesDonationsIDSet, setSelectedCheckBoxesDonationsIDSet] = React.useState<number[]>([]); // Checkboxes in the donation table, the number in the set indicates the id of the donation item
    const [selectedFilteringDonationType, setSelectedFilteringDonationType] = React.useState(donationTypeSet); // The type of the donation the user chose to filter in the table
    const [filteredDonationItemSet, setFilteredDonationItemSet] = React.useState(donationItemSet); // A list of the donation items that were filtered based on the type of the donation user selected
    const [selectedDonationItem, setSelectedDonationItem] = React.useState<donationItem>({ id: 0, donorName: "", donationType: "", donationAmount: 0, donationQuantity: 0, donationDate: dayjs() }); //This react state indicated the donation item user selected in the table
    const [newDonationItem, setNewDonationItem] = React.useState<donationItem>({ id: 0, donorName: "", donationType: "", donationAmount: 0, donationQuantity: 0, donationDate: dayjs() }); //state for a new donation item being created in the donation input form

    // Filtering the data from "donationItemSet" based on the types of the donation from the array, "donationTypes"
    function filterByDonationType(donationItemSet: donationItem[], donationTypes: donationTypes[]) {
        setFilteredDonationItemSet(donationItemSet.filter((donationItem) => donationTypes.includes(donationItem["donationType"])))
    }

    // It is an onChange event that is fired when the user selects the type of donation they want to show in the table
    const handleSelectFilter = (event: SelectChangeEvent) => {
        setSelectedFilteringDonationType([event.target.value as donationTypes]);
        filterByDonationType(donationItemSet, [event.target.value as donationTypes]);
    }

    // This function adds a the information of a new donation itme into the "database" and the filtered table
    const handleAddDonationItem = (donationItem: donationItem) => {
        donationItem.id = donationItemSet[donationItemSet.length - 1].id + 1;
        if (selectedFilteringDonationType.includes(donationItem.donationType)) { setFilteredDonationItemSet([...filteredDonationItemSet, donationItem]) };
        setDonationItemSet([...donationItemSet, donationItem]);
    }

    // This function allow users to change the info of the existed donation item from the "database" and the filtered table
    const handleUpdateDonationItem = (donationItem: donationItem) => {
        donationItem.id = selectedCheckBoxesDonationsIDSet[0]
        const newFilteredDonationItemSet = filteredDonationItemSet.map((item) => { return (item.id === selectedCheckBoxesDonationsIDSet[0] ? donationItem : item) })
        if (selectedFilteringDonationType.includes(donationItem.donationType)) { setFilteredDonationItemSet(newFilteredDonationItemSet) };
        const newDonationItemSet = donationItemSet.map((item) => { return item.id === selectedCheckBoxesDonationsIDSet[0] ? donationItem : item })
        setDonationItemSet(newDonationItemSet);
    }

    const handleResetfilter = () => {
        setSelectedFilteringDonationType(donationTypeSet);
        setFilteredDonationItemSet(donationItemSet);
    }

    const handleOnDeleteDonation = () => {
        setFilteredDonationItemSet(filteredDonationItemSet.filter((item) => !selectedCheckBoxesDonationsIDSet.includes(item.id)));
        setDonationItemSet(donationItemSet.filter((item) => !selectedCheckBoxesDonationsIDSet.includes(item.id)));
        setSelectedCheckBoxesDonationsIDSet([]);
    }

    // This function is called when the user clicks ona checkbox
    const handleOnSelectCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSelectedDonationItem: donationItem = filteredDonationItemSet.filter((item) => Number(event.target.value) === item.id)[0]
        setSelectedDonationItem( newSelectedDonationItem )
        setSelectedCheckBoxesDonationsIDSet([Number(event.target.value)]);
    }

    return (
        <Box
            sx={{ border: '2px solid lightgrey' }}
            m={2}
        >
            <DonationInputForm
                donationItem={newDonationItem}
                setDonationItem={setNewDonationItem}
                donationTypeSet={donationTypeSet}
                handleChangeDonationItemsDataSet={handleAddDonationItem}
                tableLable={"Donation Input Form"}
                buttonLabel="Submit"
                sx={true}
                hidden={false} />
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                mt={1}
                gap={4}
                p={2}
            >
                <BasicSelect
                    id="selectBox-donationType-filter"
                    value={selectedFilteringDonationType.length > 1 ? "" : selectedFilteringDonationType[0]} //TODO: selectedFilteringDonationType could be a number instead of a array for simplicity. Changes will be made base on further development
                    items={donationTypeSet}
                    label="Filter"
                    onChange={handleSelectFilter}
                    error={false}
                />
                <Button variant="contained" onClick={handleResetfilter}>Reset Filter</Button>
                <Button variant="contained" onClick={handleOnDeleteDonation}>Delete</Button>
                {/* </Box> */}
            </Grid>
            <Box
                mb={1}
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
            >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                {/* This line will create a list of headers, <TableCell> jsx, for the table base on the elements in the tableHeaders array */}
                                {tableHeaders.map((tableHeader, index) => (<TableCell key={index} align={index === 0 ? "left" : "right"}>{tableHeader}</TableCell>))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* The following map function is to create a row of data onto the table per donation item in the array */}
                            {filteredDonationItemSet.map((filteredDonationItem) => (
                                <TableRow
                                    key={filteredDonationItem.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            value={filteredDonationItem.id}
                                            onChange={handleOnSelectCheckBox}
                                            inputProps={{
                                                'aria-label': 'select all desserts',
                                            }}
                                            checked={selectedCheckBoxesDonationsIDSet.includes(filteredDonationItem.id)}
                                        />
                                    </TableCell>
                                    {Object.keys(filteredDonationItem).map((keyName, index) => (keyName === "id" ? null : <TableCell key={index}
                                        align={index === 1 ? "left" : "right"}>{filteredDonationItem[keyName as keyof donationItem].toString()}</TableCell>))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <DonationInputForm
                    donationItem={selectedDonationItem}
                    setDonationItem={setSelectedDonationItem}
                    donationTypeSet={donationTypeSet}
                    handleChangeDonationItemsDataSet={handleUpdateDonationItem}
                    tableLable={"Edit Form"}
                    buttonLabel="Update"
                    sx={false}
                    hidden={selectedCheckBoxesDonationsIDSet.length === 0}
                />
        </Box>
    );
}