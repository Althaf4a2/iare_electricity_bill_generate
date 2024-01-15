import { useState } from "react";

export default function Print(props) {
  const [open, setOpen] = useState(props.isOpen);
  return (
    <>
    {!props.isOpen &&
      <button
        className="rounded border border-green-500 bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-green-700 hover:bg-green-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300"
        type="button"
        onClick={() => setOpen(true)}
      >
        P
      </button>
      }

      {open && (
        <div
          class="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-20 items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                <div class="bg-white px-4 pb-4 pt-5 uppercase sm:p-6 sm:pb-4  ">
                  <div class=" pb-2 sm:flex sm:items-center sm:justify-center">
                    <div class=" ">
                      <img
                        className="h-18 mr-2 w-24"
                        src="../Tsspdcl_logo.png"
                        alt="logo"
                      />
                    </div>
                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-center ">
                      <h1
                        class="text-2xl font-extrabold leading-6 tracking-[5px] text-blue-900"
                        id="modal-title"
                      >
                        TSSPDCL
                      </h1>
                      <h3
                        class="text-lg font-bold leading-6 text-blue-900"
                        id="modal-title"
                      >
                        Electricity
                      </h3>
                      <h3
                        class="text-lg font-bold leading-6 text-blue-900"
                        id="modal-title"
                      >
                        Bill-cum notice
                      </h3>
                    </div>
                  </div>
                  <br />
                  <hr />
                  <div class="mt-2 flex justify-between text-blue-900">
                    <div class="text-left font-semibold">
                      <div>Date: 10/11/2022</div>

                      <div>Bill No: 0456</div>
                      <div>ERO: HASBSIGUDA</div>
                      <div>Area code: 09:14</div>
                    </div>

                    <div class="text-right font-semibold">
                      <div>Time: 09:14</div>
                      <div>ERONo: 311</div>
                      <div>SEC: HASBSIGUDA</div>
                    </div>
                  </div>

                  <br />
                  <hr />
                  <div class="mt-2 flex text-blue-900">
                    <div class="text-left font-semibold">
                      <div class="text-lg font-medium">SC.NO: 1603 09090</div>
                      <div class="text-lg font-medium">USC: 10787886863</div>
                      <div>Name: Althaf Shaik</div>
                      <div class="flex">
                        <div class="w-[52px]" >ADDR:</div>
                        <div>
                    
                          H No 1-154, Narasingapuram, chittor, chandragiri,
                          chandragiri
                        </div>
                      </div>
                      <div>Category: 1B(II) Domestic</div>
                      <div>Connection load: 1.00Kw</div>
                      <div>Meter no: 121321323 </div>
                      <div class="flex justify-between">
                        <p>MF: 1.00 </p>
                        <p>PH:1</p>
                        <p></p>
                      </div>
                    </div>
                  </div>
                  <br />
                  <hr />
                  <div class="mt-2 flex justify-between text-blue-900">
                    <div class="text-left font-semibold">
                      <div class="h-5 w-4"></div>
                      <div>KWH:</div>
                      <div>Date:</div>
                      <div>Status:</div>
                      <div>Units:</div>
                    </div>
                    <div class="text-right">
                      <div class="font-bold">PREVIOUS</div>
                      <div>4467</div>
                      <div>90/May/18</div>
                      <div>01</div>
                      <div>40067 </div>
                    </div>
                    <div class="text-right">
                      <div class="font-bold">PRESENT</div>
                      <div>44343</div>
                      <div>90/May/18</div>
                      <div>01</div>
                      <div>DAYS: 32</div>
                    </div>
                  </div>
                  <br />
                  <hr />
                  <div class="mt-2 flex justify-between text-blue-900">
                    <div class="text-left font-semibold">
                      <div>ENERGY CHARGES</div>
                      <div>CUST CHARGES </div>
                      <div>ELECTRICI DUTY</div>
                      <div>ADDL. CHARGES</div>
                      <div>INT.ON SD</div>
                      <div>BILL AMOUNT </div>
                      <div>LOSS/GAIN </div>
                      <div>NET AMOUNT </div>
                      <div class="font-bold">ARREARS ----- </div>
                      <div>AS ON 31-03-18</div>
                      <div>AFTER 31-03-18</div>
                      <div>TOTAL AMOUNT</div>
                      <div>A.C.D DUE</div>
                      <div class="text-xl font-medium">TOTAL DUE</div>
                    </div>
                    <div class="text-center font-semibold">
                      <div>:</div>
                      <div>:</div>
                      <div>:</div>
                      <div>:</div>
                      <div>:</div>
                      <div>:</div>
                      <div>:</div>
                      <div>:</div>
                      <div class="font-bold">---</div>
                      <div>:</div>
                      <div>:</div>
                      <div>:</div>
                      <div>:</div>
                      <div>:</div>
                    </div>
                    <div class="text-right">
                      <div>373773.00</div>
                      <div>80.00</div>
                      <div>80.00</div>
                      <div>0.00</div>
                      <div>0.00</div>
                      <div>0.00</div>
                      <div>0.00</div>
                      <div>80.00</div>
                      <div class="font-bold">---</div>
                      <div>0.00</div>
                      <div>0.00</div>
                      <div>0.00</div>
                      <div>0.00</div>
                      <div class="text-xl font-medium">234340.00</div>
                    </div>
                  </div>
                  <br />
                  <hr />
                  <div class="mt-2 flex justify-between text-blue-900">
                    <div class="text-left font-semibold">
                      <div>Dues date: 1603 09090</div>

                      <div>AAO cell no:</div>

                      <div>Subsidy/unit: 0.00</div>
                      <div>E&0E for AAO/ERO 311</div>
                    </div>
                    <div class="text-right font-semibold">
                      <div>last paid DT: 10787886863</div>
                      <div>ADE cell no: 8686866886</div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 sm:ml-3 sm:w-1/4 print:hidden"
                    onClick={() => window.print()}
                  >
                    Print
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-1/4 print:hidden"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
