import Select from "react-select";
import { calculateTariff, formateSelectOptions } from "./constant";
import { useEffect, useState } from "react";
import Print from "./component/print";

const BillGenerate = () => {
  const [message,setMessage] = useState("")
  const [error,setError] = useState(false);
  const [formData, setFormData] = useState({
    meterNo: "",
    previousUnit:0,
    presentUnit:0,
    amount:0,
    // acknowledge:false,
  });
  const [isDataValid, setIsDataValid] = useState({
    meterNoValid: false,
    presentUnitValid:false
    // acknowledgeValid: false,
  });
const [formattedMeterno,setFormattedMeterno] =useState([])

  const handleInputChange = (fieldValue, fieldName) => {
    const inputValue =
      typeof fieldValue === "string"
        ? fieldValue.replace(/^\s+/, "")
        : fieldValue;

    setFormData({
      ...formData,
      [fieldName]: inputValue,
    });
        setIsDataValid({
          ...isDataValid,
          [`${fieldName}Valid`]: inputValue ? false : true,
        });
        
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const isCheckValidation = (formData, formValidation) => {
    const isFormDataEmpty = Object.values(formData).every(
      (value) => !value
    );
    console.log("isFormDataEmpty",isFormDataEmpty)
    if (isFormDataEmpty) {
      for (const key in formValidation) {
        formValidation[key] = true;
      }
      setIsDataValid({
        ...isDataValid,
        isDataValid: formValidation,
      });
      return false; 
    } 
    return true
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isCheckValidation(formData, isDataValid)){
        console.log("HIII")
      fetch('http://localhost:3002/api/bill/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setMessage(data.message);
          setError(data.success)
          Object.keys(formData).forEach(key => {
            formData[key] = '';
          });
          setFormData(formData)
          
          console.log('Success:', data);
        })
        .catch(error => {
          // Handle error
          setMessage('Error:Failed create customer');
          console.error('Error:', error);
          
        });
        scrollToTop();
        setTimeout(() => {
          setMessage('');
        }, 5000);
    }
    
  };
  useEffect(()=>{
    fetch('http://localhost:3002/api/get')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
            const meterData = data?.length >0  ? data?.map(record => ({ value: record.meter_no, label: record.meter_no })) :[];
            setFormattedMeterno(formateSelectOptions(meterData, false))
          console.log('Success:', data);
        })
        .catch(error => {
          // Handle error
          setMessage('Error:Failed create customer');
          console.error('Error:', error);
          scrollToTop();
        setTimeout(() => {
          setMessage('');
        }, 5000);
        });
        
  },[])

  const handleMeterChange=(number)=>{
    fetch(`http://localhost:3002/api/get/${number}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
            setFormData({
                ...formData,
                meterNo:number,
                customerName:data?.data?.[0]?.name,
                customerPhone:data?.data?.[0]?.phone ?? "",
                customerAddress:data?.data?.[0]?.address ?? "",
                previousUnit:data?.data?.[0]?.current_unit ?? 0,
            })
            setIsDataValid({
                ...isDataValid,
                "meterNo" : number ? false : true,
              });
          console.log('Success:', data);
        })
        .catch(error => {
          // Handle error
          setMessage('Error:Failed fetch data');
          console.error('Error:', error);
          scrollToTop();
        setTimeout(() => {
          setMessage('');
        }, 5000);
        });
  }
  const handleUnitChange=(value)=>{
    
const diffence = value - formData?.previousUnit;
 const energyCharges=calculateTariff(diffence);
 console.log("value",energyCharges);

setFormData({
    ...formData,
    presentUnit:value,
    amount:energyCharges?.amount ?? 0
})
  }
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 ">
          <div className="w-full rounded bg-white p-5 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
         { error && message !="" &&  <div class="p-4 m-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span class="font-medium">Success alert!</span>{message}
</div>}
{ !error && message !="" &&  <div class="p-4 m-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">Error alert!</span> {message}
</div>}
{error && <Print isOpen={true} />}

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
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                Bill Generate
              </h1>
              <div className="-mx-2 flex flex-wrap space-y-4  md:space-y-0">
                <div className="w-full p-2 ">
                  <label
                    htmlFor="meterNo"
                    className={`mb-2 block text-sm font-medium  dark:text-white`}
                  >
                    Meter no
                    <span className="text-red-600 dark:text-red-500">* </span>
                  </label>
                  <Select
                    id="meterNo"
                    name="meterNo"
                    options={formattedMeterno}
                    className={`${
                      isDataValid?.meterNoValid &&
                      "rounded border border-red-500"
                    }`}
                    onChange={(e) => {
                    handleMeterChange(e.value)
}}
                  />
                  {    console.log(isDataValid)
}
                  {isDataValid?.meterNoValid && (
                    <p className="text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">
                        {formData?.meterNo == ""
                          ? "required!"
                          : "Please select valid data"}
                      </span>
                    </p>
                  )}
                </div>
                <div className="w-full p-2 ">
                  <label
                    htmlFor="name"
                    className={`mb-2 block text-sm font-medium text-gray-900 dark:text-white`}
                  >
                    Customer name{" "}
                    <span className="text-red-600 dark:text-red-500">* </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className={`block w-full rounded border  p-2.5 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm ${
                      isDataValid?.customerNameValid
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Customer name"
                    onChange={(e) =>
                      handleInputChange(e.target.value, "customerName")
                    }
                    value={formData.customerName}
                    disabled={true}
                  />
                  
                </div>
                <div className="w-full p-2">
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Customer phone number{" "}
                    <span className="text-red-600 dark:text-red-500">* </span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phone number"
                    className={`block w-full rounded border  p-2.5 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm border-gray-300`}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "customerPhone")
                    }
                    value={formData.customerPhone}
                    disabled={true}
                  />
                </div>
                <div className="w-full p-2">
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Customer address{" "}
                    <span className="text-red-600 dark:text-red-500">* </span>
                  </label>
                  <textarea
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Customer address"
                    className={`block w-full rounded border  p-2.5 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm border-gray-300`}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "customerAddress")
                    }
                    value={formData.customerAddress}
                    disabled={true}
                  />
                </div>
                <div className="w-full p-2 ">
                  <label
                    htmlFor="presentUnit"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Present Reading
                    <span className="text-red-600 dark:text-red-500">* </span>
                  </label>
                  <input
                    type="text"
                    name="presentUnit"
                    id="presentUnit"
                    placeholder="Meter number"
                    className={`block w-full rounded border  p-2.5 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm ${
                      isDataValid?.presentUnitValid
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onChange={(e) =>
                     
                    handleUnitChange(e.target.value)}
                    
                    value={formData.presentUnit}
                  />
                  {isDataValid?.presentUnitValid && (
                    <p className="text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">
                        {formData?.presentUnit === ""
                          ? "required!"
                          : "Please enter valid digits"}
                      </span>
                    </p>
                  )}
                </div>
              
                <div className="w-full p-2 ">
                  <label
                    htmlFor="presentUnit"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Total Amount
                  </label>
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    placeholder="Amount"
                    className={`block w-full rounded border  p-2.5 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm border-gray-300`}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "Amount")
                    }
                    value={formData.amount}
                    disabled={true}
                  />
                 
                </div>
               
              </div>
              <button
                type="button"
                className="rounded border border-primary-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BillGenerate;
