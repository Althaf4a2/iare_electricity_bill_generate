import Select from "react-select";
import { formateSelectOptions } from "./constant";
import { useState } from "react";

const Home = () => {
  const [message,setMessage] = useState("")
  const [error,setError] = useState(false);
  const [formData, setFormData] = useState({
    areaCode: "",
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    meterNo: "",
    category: "",
    connectionType: "",
    // acknowledge:false,
  });
  const [isDataValid, setIsDataValid] = useState({
    areaCodeValid:false,
    customerNameValid: false,
    customerPhoneValid: false,
    customerAddressValid: false,
    meterNoValid: false,
    categoryValid: false,
    connectionTypeValid: false,
    // acknowledgeValid: false,
  });
  const category = [
    {value:0,label:"Select category"},
    { value: 1, label: "Domestic" },
    { value: 2, label: "Commercial" },
  ];
  const connectionType = [
    { value: 1, label: "One phase" },
    { value: 2, label: "Three phase" },
  ];
  const areaCode = [
    { value: 16032, label: "Dundigal" },
    { value: 16031, label: "Jeedimetla" },
  ];
  const formattedAreaCode = formateSelectOptions(areaCode, true);
  const formattedCategory = formateSelectOptions(category);
  const formattedConnectionType = formateSelectOptions(connectionType);

  const handleInputChange = (fieldValue, fieldName) => {
    const inputValue =
      typeof fieldValue === "string"
        ? fieldValue.replace(/^\s+/, "")
        : fieldValue;

    setFormData({
      ...formData,
      [fieldName]: inputValue,
    });
    switch (fieldName) {
      case "customerPhone":
        setIsDataValid({
          ...isDataValid,
          [`${fieldName}Valid`]: /^\d{10}$/.test(inputValue) ? false : true,
        });
        break;
      case "meterNo":
        setIsDataValid({
          ...isDataValid,
          [`${fieldName}Valid`]: /^\d{4}$/.test(inputValue) ? false : true,
        });
        break;
      default:
        setIsDataValid({
          ...isDataValid,
          [`${fieldName}Valid`]: inputValue ? false : true,
        });
        break;
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const isCheckValidation = (formData, formValidation) => {
    const isFormDataEmpty = Object.values(formData).every(
      (value) => value === ""
    );
    if (isFormDataEmpty) {
      for (const key in formValidation) {
        formValidation[key] = true;
      }
      setIsDataValid({
        ...isDataValid,
        isDataValid: formValidation,
      });
      return false; 
    } else {
      const checkTwo ={}
      for (const key in formData) {
        if (formData[key] === "" || isDataValid[`${key}Valid`]) {
          checkTwo[`${key}Valid`] = true;
        }else{
          checkTwo[`${key}Valid`] = false;
        }
      }
      setIsDataValid(checkTwo);
       const allCheckValidation = Object.keys(formData).every(
         (key, index) => formData[key] && !isDataValid[`${key}Valid`]
       );
return allCheckValidation;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isCheckValidation(formData, isDataValid)){
      fetch('http://localhost:3002/api/create', {
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
                Create Customer
              </h1>
              <div className="-mx-2 flex flex-wrap space-y-4  md:space-y-0">
                <div className="w-full p-2 ">
                  <label
                    htmlFor="areaCode"
                    className={`mb-2 block text-sm font-medium  dark:text-white`}
                  >
                    Area code{" "}
                    <span className="text-red-600 dark:text-red-500">* </span>
                  </label>
                  <Select
                    id="areaCode"
                    name="areaCode"
                    options={formattedAreaCode}
                    className={`${
                      isDataValid?.areaCodeValid &&
                      "rounded border border-red-500"
                    }`}
                    onChange={(e) => handleInputChange(e.value, "areaCode")}
                  />
                  {isDataValid?.areaCodeValid && (
                    <p className="text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">
                        {formData?.areaCode === ""
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
                  />
                  {isDataValid?.customerNameValid && (
                    <p className="text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">
                        {formData?.customerName === ""
                          ? "required!"
                          : "Please enter valid data"}
                      </span>
                    </p>
                  )}
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
                    className={`block w-full rounded border  p-2.5 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm ${
                      isDataValid?.customerPhoneValid
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "customerPhone")
                    }
                    value={formData.customerPhone}
                  />
                  {isDataValid?.customerPhoneValid && (
                    <p className="text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">
                        {formData?.customerPhone === ""
                          ? "required!"
                          : "Please enter valid 10 digits phone number"}
                      </span>
                    </p>
                  )}
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
                    className={`block w-full rounded border  p-2.5 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm ${
                      isDataValid?.customerAddressValid
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "customerAddress")
                    }
                    value={formData.customerAddress}
                  />
                  {isDataValid?.customerAddressValid && (
                    <p className="text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">
                        {formData?.customerAddress === ""
                          ? "required!"
                          : "Please enter valid data"}
                      </span>
                    </p>
                  )}
                </div>
                <div className="w-full p-2 ">
                  <label
                    htmlFor="meterNo"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Meter number{" "}
                    <span className="text-red-600 dark:text-red-500">* </span>
                  </label>
                  <input
                    type="text"
                    name="meterNo"
                    id="meterNo"
                    placeholder="Meter number"
                    className={`block w-full rounded border  p-2.5 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm ${
                      isDataValid?.meterNoValid
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "meterNo")
                    }
                    value={formData.meterNo}
                  />
                  {isDataValid?.meterNoValid && (
                    <p className="text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">
                        {formData?.meterNo === ""
                          ? "required!"
                          : "Please enter valid 4 digit number"}
                      </span>
                    </p>
                  )}
                </div>
                <div className="w-full p-2 ">
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category{" "}
                    <span className="text-red-600 dark:text-red-500">* </span>
                  </label>
                  <Select
                    id="category"
                    name="category"
                    options={formattedCategory}
                    className={`${
                      isDataValid?.categoryValid &&
                      "rounded border border-red-500"
                    }`}
                    onChange={(e) => handleInputChange(e.value, "category")}
                  />
                  {isDataValid?.categoryValid && (
                    <p className="text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">
                        {formData?.category === ""
                          ? "required!"
                          : "Please select valid data"}
                      </span>
                    </p>
                  )}
                </div>
                <div className="w-full p-2">
                  <label
                    htmlFor="phaseType"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Connection type{" "}
                    <span className="text-red-600 dark:text-red-500">* </span>
                  </label>
                  <Select
                    id="phaseType"
                    name="phaseType"
                    options={formattedConnectionType}
                    className={`${
                      isDataValid?.connectionTypeValid &&
                      "rounded border border-red-500"
                    }`}
                    onChange={(e) =>
                      handleInputChange(e.value, "connectionType")
                    }
                  />
                  {isDataValid?.connectionTypeValid && (
                    <p className="text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">
                        {formData?.connectionType === ""
                          ? "required!"
                          : "Please select valid data"}
                      </span>
                    </p>
                  )}
                </div>

                <div className="w-full p-2">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-light text-gray-500 dark:text-gray-300"
                      >
                        I accept the{" "}
                        <a
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          href="#"
                        >
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
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

export default Home;
