import React from 'react';
import DonationsTable from './components/DonationsTable/DonationsTable';
import dayjs, { Dayjs } from 'dayjs';
import BasicTable from './components/DonationsTable/BasicTable';

// This is a list of donations types that currently exist. The application is dynamically coded base on the variables "donationTypes" and "donationTypeSet".
// Developer can add or remove any types in this list and the applicationw will change accordingly. 
export type donationTypes = "Money" | "Food" | "Clothing" | "Toy" | "Houseware" | "Furniture" | "Books" | "Other" | ""
const donationTypeSet: donationTypes[] = ["Money", "Food", "Clothing", "Toy", "Houseware", "Furniture", "Books", "Other"]

export type donationItem = {
  id: number,
  donorName: string,
  donationType: donationTypes,
  donationAmount: number,
  donationQuantity: number,
  donationDate: Dayjs,
}

export type summaryData = {
  id: number,
  label: string,
  value: number,
}

const tableHeaders = ["Donor's Name", "Type of Donation", "Amount", "Quantity", "Date"]

function App() {

  // This state is representing the data form a database of the application
  const [donationItemSet, setDonationItemSet] = React.useState<donationItem[]>([
    { id: 0, donorName: 'John', donationType: "Clothing", donationAmount: 0, donationQuantity: 15, donationDate: dayjs('2010-01-01') },
    { id: 1, donorName: 'Tom', donationType: "Other", donationAmount: 0, donationQuantity: 2, donationDate: dayjs('2012-04-20') },
    { id: 2, donorName: 'Alex', donationType: "Money", donationAmount: 92, donationQuantity: 0, donationDate: dayjs('2015-02-11') },
    { id: 3, donorName: 'Aamir', donationType: "Toy", donationAmount: 0, donationQuantity: 20, donationDate: dayjs('2010-01-01') },
    { id: 4, donorName: 'Krishan', donationType: "Clothing", donationAmount: 0, donationQuantity: 15, donationDate: dayjs('2010-01-01') },
    { id: 5, donorName: 'Sylvia', donationType: "Food", donationAmount: 0, donationQuantity: 7, donationDate: dayjs('2010-01-01') },
    { id: 6, donorName: 'Lina', donationType: "Houseware", donationAmount: 0, donationQuantity: 15, donationDate: dayjs('2010-01-01') },
    { id: 7, donorName: 'Davis', donationType: "Food", donationAmount: 0, donationQuantity: 2, donationDate: dayjs('2012-04-20') },
    { id: 8, donorName: 'Calhoun', donationType: "Furniture", donationAmount: 0, donationQuantity: 12, donationDate: dayjs('2015-02-11') },
    { id: 9, donorName: 'Cassandra', donationType: "Toy", donationAmount: 0, donationQuantity: 20, donationDate: dayjs('2010-01-01') },
    { id: 10, donorName: 'Heidi', donationType: "Books", donationAmount: 0, donationQuantity: 15, donationDate: dayjs('2010-01-01') },
    { id: 11, donorName: 'Barron', donationType: "Food", donationAmount: 0, donationQuantity: 7, donationDate: dayjs('2010-01-01') },
  ]
  );
  
  // This function will group the data base on their type and add the quantity or amount together.
  function convertDonationItemSetToSummaryData(donationItemSet: donationItem[], donationTypeSet: string[]) {
    const dataMap = new Map();
    donationItemSet.forEach((donationItem: donationItem) => {
      const addition = donationItem["donationType"] === "Money" ? donationItem["donationAmount"] : donationItem["donationQuantity"]
      if (dataMap.has(donationItem["donationType"])) {
        dataMap.set(donationItem["donationType"], dataMap.get(donationItem["donationType"]) + addition)
      }
      else {
        dataMap.set(donationItem["donationType"], addition)
      }
    })
    let summaryDataSet: summaryData[] = [];
    let index = 0;

    // To set money to be on top of the summary data
    summaryDataSet.push({ id: index++, label: "Money", value: dataMap.get("Money") })
    dataMap.delete("Money")
    dataMap.forEach((value, key) => summaryDataSet.push({ id: index++, label: key, value: value }) )
    return summaryDataSet
  }

  return (
    <div className="App">
      <DonationsTable
        donationItemSet={donationItemSet}
        setDonationItemSet={setDonationItemSet}
        donationTypeSet={donationTypeSet}
        tableHeaders={tableHeaders}
      />
      <BasicTable
        listHeaders={["Type", "Amount/Quantity"]}
        dataArray={convertDonationItemSetToSummaryData(donationItemSet, donationTypeSet)}
      />
    </div>
  );
}

export default App;
