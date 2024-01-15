
import DataTable from "react-data-table-component";
import { useState, useMemo, useEffect } from "react";
import { downloadCSV } from "./constant";
import Export from "./component/export";
import Print from "./component/print";


const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
];
const BillList =()=> {
  const [tableData,setTableData]=useState({})
  // const [records,setRecords] = useState(data);

  useEffect(()=>{
    fetch("http://localhost:3002/api/bill/get")
    .then(response => response.json())
    .then(data =>{console.log(data); setTableData(data)})
    .catch(()=> { 
      console.log('Swallowed!') 
    });
  },[]);
  
const handleFilter =(event)=>{
  const newData = tableData.filter((row)=>{
    return row.name.toLowerCase().includes(event.target.value.toLowerCase());
  })
  setTableData(newData)
}
const actionsMemo = useMemo(
  () => <Export onExport={() => downloadCSV(tableData)} />,
  [tableData]
);
const columns = [
  {name:"SNo",
selector:(row)=>row.id,
sortable :true},
  {
    name: "Meter no",
    selector: (row) => row.meter_no,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row) => row.net_amount,
    sortable: true,
  },
  {
    name: "Due date",
    selector: (row) => row.due_date,
    sortable: true,
  },
  {
    name: "Action",
    cell: () => (
        <Print isOpen={false} />
    
    ),
    button: true,
  },
];
const clickHandler = () => {};

    return (
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 ">
          <div className="w-full rounded bg-white p-5 shadow dark:border dark:border-gray-700 dark:bg-gray-800 md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <div className="mb-6 flex items-center">
                <img
                  className="mr-2 h-24 w-24"
                  src="./Tsspdcl_logo.png"
                  alt="logo"
                />
                <div>
                  <p className="text-4xl font-bold text-blue-900">TSSPDCL</p>
                  <p className="text-2xl font-medium text-red-400">
                    Electricity bill cum notice
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between ">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl"></h1>
                <input
                  type="text"
                  className={`block w-[300px] rounded border border-gray-300 p-2.5 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm`}
                  onChange={handleFilter}
                  placeholder="Search customer"
                />
              </div>
              <DataTable
                title="Customer Bill Generate"
                columns={columns}
                data={tableData && tableData.length > 0 ? tableData : []}
                fixedHeader
                pagination
                actions={actionsMemo}
              />{" "}
            </div>
          </div>
        </div>
      </section>
    );
}

  export default BillList;


