import BasicTextFields from "../TextFields/BasicBoxTextFields";
import BasicSelect from "../SelectBox/BasicSelect"
import BasicDatePicker from "../BasicDatePicker/BasicDatePicker"
import * as React from 'react';
import { Dayjs } from 'dayjs';
import { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import { donationItem, donationTypes } from '../../App'

type DonationInputFormProps = {
    donationItem: donationItem, //Inital donation item object that could be an existed item or a new one. 
    setDonationItem: any, // Update the info of the donation item object
    donationTypeSet: string[], 
    handleChangeDonationItemsDataSet: any // This is a function that is called when the user click on the button at the end of the input form. In this version, the function could be adding or updating a donation item
    tableLable: string,
    buttonLabel: string,
    sx: boolean,
    hidden: boolean, // To show the input form or not
}

export default function DonationInputForm({donationItem, setDonationItem, donationTypeSet, handleChangeDonationItemsDataSet, tableLable, buttonLabel, sx, hidden}: DonationInputFormProps) {

    // Default true so that the text field will not turn red which indicates invalid input
    // Since the initial validation is set to true, additional validations on all inputs are required at the end before sumbitting

    const [validDonorName, setValidDonorName] = React.useState(true);
    const [validDonationType, setValidDonationType] = React.useState(true);
    const [validDonationAmount, setValidDonationAmount] = React.useState(true);
    const [validDonationQuantity, setValidDonationQuantity] = React.useState(true);

    // Following functions are used to validate the input from the users
    function isWithinTwoDecimalPlaces(num: number) {
        const numString = num.toString();
        return numString.length - numString.indexOf(".") < 4 || numString.indexOf(".") === -1
        // older versions
        // num = Math.abs(num)
        // const newNum = (num * 100 % 1).toFixed(10) // this line of code is to prevent floating point precision problem
        // return Number(newNum) === 0
    }

    function isInteger(num: number) {
        num = Math.abs(num);
        const newNum = (num % 1).toFixed(10)
        return Number(newNum) === 0
    }
    function isNumber(text: string) {
        return !isNaN(Number(text))
    }

    function isValidDonorName(text: string) {
        return text !== ""
    }

    function isValidDonationType(text: string) {
        return donationTypeSet.includes(text) && text!==""
    }

    function isValidDonationAmount(text: string) {
        if (isNumber(text)) {
            const amount = Number(text);
            return amount > 0 && isWithinTwoDecimalPlaces(amount)
        }
        else {
            return false;
        }
    }

    function isValidDonationQuantity(text: string) {
        if (isNumber(text)) {
            const quantity = Number(text);
            return quantity > 0 && isInteger(quantity)
        }
        else {
            return false;
        }
    }

    // The following handle functions will be called according to the changes from the user's input in the text field
    // The main purpose of these functions is to validate the input using the validation function above and set the react state accordingly

    const handleChangeSetDonorName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDonationItem({ ...donationItem, donorName: event.target.value})
        isValidDonorName(event.target.value) ? setValidDonorName(true) : setValidDonorName(false);
    };

    const handleChangeSetDonationType = (event: SelectChangeEvent) => {
        if (isValidDonationType(event.target.value)) {
            setDonationItem({ ...donationItem, donationType: event.target.value as donationTypes})
            setValidDonationType(true)
        }
        else {
            setValidDonationType(false)
        }
    };

    const handleChangeSetDonationAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isNumber(event.target.value)) {
            isValidDonationAmount(event.target.value) ? setValidDonationAmount(true) : setValidDonationAmount(false);
            setDonationItem({ ...donationItem, donationAmount: Number(event.target.value)})
        }
    };

    const handleChangeSetDonationQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isNumber(event.target.value)) {
            isValidDonationQuantity(event.target.value) ? setValidDonationQuantity(true) : setValidDonationQuantity(false);
            setDonationItem({ ...donationItem, donationQuantity: Number(event.target.value)})
        }
    };

    const handleChangeSetDonationDate = (newDate: Dayjs) => { donationItem.donationDate = newDate; setDonationItem(donationItem) }

    
    // Final and second validation will be needed before submitting the data to the "database"
    // Having an addictional validation due to the validation state of the variables were set to be true at the inital state and in case of any unexpected input bypass the first validation
    const handleOnSubmitInputForm = () => {
        isValidDonorName(donationItem.donorName) ? setValidDonorName(true) : setValidDonorName(false);
        isValidDonationType(donationItem.donationType) ? setValidDonationType(true) : setValidDonationType(false);
        isValidDonationAmount(donationItem.donationAmount.toString()) ? setValidDonationAmount(true) : setValidDonationAmount(false);
        isValidDonationQuantity(donationItem.donationQuantity.toString()) ? setValidDonationQuantity(true) : setValidDonationQuantity(false);
        if (isValidDonorName(donationItem.donorName) && isValidDonationType(donationItem.donationType) && ((donationItem.donationType === "Money" && isValidDonationAmount(donationItem.donationAmount.toString())) || (donationItem.donationType !== "Money" && isValidDonationQuantity(donationItem.donationQuantity.toString())))) {
            donationItem.donationType === "Money" ? donationItem.donationQuantity = 0 : donationItem.donationAmount = 0; // To cleanup the unwanted input. Each donation can either have a non-zero value in the variable of quantity or amount.
            handleChangeDonationItemsDataSet(donationItem)
        }
    }

    return (
        <div hidden={hidden}>
            <Box
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
                pb={4}
                m={2}
                mb={2}
                sx={sx ? { borderBottom: '2px solid lightgrey' } : null}
            >
                <div>{tableLable}</div>
                <BasicTextFields
                    id="textField-donorName"
                    label="Donor's Name"
                    value={donationItem.donorName}
                    onChange={handleChangeSetDonorName}
                    type="text"
                    error={!validDonorName}
                    hidden={false}
                />
                <BasicSelect
                    id="selectBox-donationType"
                    value={donationItem.donationType}
                    items={donationTypeSet}
                    label="Donation Type"
                    onChange={handleChangeSetDonationType}
                    error={!validDonationType}
                />
                <BasicTextFields
                    id="textField-donationAmount"
                    label="Amount"
                    value={donationItem.donationAmount}
                    onChange={handleChangeSetDonationAmount}
                    type="text"
                    error={!validDonationAmount}
                    hidden={donationItem.donationType !== "Money"}
                />
                <BasicTextFields
                    id="textField-donationQuantity"
                    label="Quantity"
                    value={donationItem.donationQuantity}
                    onChange={handleChangeSetDonationQuantity}
                    type="text"
                    error={!validDonationQuantity}
                    hidden={donationItem.donationType === "Money" || donationItem.donationType === ''}
                />
                <BasicDatePicker
                    id="datePicker-donationDate"
                    label="Donation Date"
                    value={donationItem.donationDate}
                    onChange={handleChangeSetDonationDate}
                />
                <Button variant="contained" onClick={handleOnSubmitInputForm }>{buttonLabel}</Button>
            </Box>

        </div>
    );
}