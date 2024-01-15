export const formateSelectOptions = (inputData,label)=>{
return inputData?.length > 0
  ? inputData.map((option) => ({
      label: label ? `${option.label} (${option.value})` : option.label,
      value: option.value,
    }))
  : [
      {
        label: `No data found`,
        value: "",
      },
    ];
}

export const downloadCSV = (array) => {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;
  const filename = "export.csv";
  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
};


export const convertArrayOfObjectsToCSV =(array)=> {
  let result;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}


export const calculateTariff = (units)=>{

  const tariffPlans = [
    { name: 'Plan A', minUnits: 0, maxUnits: 100, rate: 0.5 },
    { name: 'Plan B', minUnits: 101, maxUnits: 200, rate: 0.7 },
    { name: 'Plan C', minUnits: 201, maxUnits: Infinity, rate: 0.9 },
  ];

  const applicablePlan = tariffPlans.find(plan => units >= plan.minUnits && units <= plan.maxUnits);
  if (applicablePlan) {
    const billAmount = units * applicablePlan.rate;
    console.log(billAmount)

    return { plan: applicablePlan.name, amount: billAmount };
  } else {
    return { error: 'No applicable tariff plan found.' };
  }

  }