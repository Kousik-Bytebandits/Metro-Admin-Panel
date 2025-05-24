import { FaArrowLeft } from "react-icons/fa";

const CustomerInvoice = () => {
  return (
    <div className="bg-[#00193b] p-4 text-white font-archivo min-h-screen flex flex-col items-center ">
      {/* Header */}
     <div className="flex justify-between items-center w-full mb-6 mt-4">
             <button onClick={() => window.history.back()} className="bg-[#4F89FC] p-2 rounded-full">
               <FaArrowLeft className="text-3xl text-[#031123]" />
             </button>
             <h1 className="text-[25px] font-bold">Customer  Invoice</h1>
             <div className="w-12 h-12 bg-white p-1 rounded-full flex items-center justify-center">
               <img src="logo.png" alt="Logo" className="w-8 h-8 object-contain" />
             </div>
           </div>

      {/* Customer Details */}
      <div className="bg-[#031123] p-4 rounded-lg shadow-custom-blue w-full  ">
        <h3 className="text-white font-semibold mb-3">Customer Details</h3>
        <div className="mb-2" >
        <label className="text-xs text-gray-300">Customer Name</label>
        <input
          type="text"
          className="w-full p-2 bg-[#00193B] border border-[#1B2E5D] text-white rounded outline-none text-sm"
        />
        </div>
        <div className="mb-2">
         <label className="text-xs text-gray-300 ">Date</label>
        <input
          type="text"
          className="w-full p-2 bg-[#00193B] border border-[#1B2E5D] text-white rounded outline-none text-sm"
        />
        </div>
        <div className="mb-3">
        <label className="text-xs text-gray-300 ">Phone Number</label>
        <input
          type="text"
          className="w-full p-2 bg-[#00193B] border border-[#1B2E5D] text-white rounded outline-none text-sm"
        />
        </div>
        <div >
        <label className="text-xs text-gray-300">Address</label>
        <textarea
          rows="3"
          className="w-full p-2 bg-[#00193B] border border-[#1B2E5D] text-white rounded outline-none text-sm resize-none"
        ></textarea>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="mt-4 w-full p-1 ">
        <h4 className="mb-3 text-sm text-[#CCCCCC] ">Invoice:</h4>
        <table className="w-full text-center rounded-xl text-white shadow-custom-blue">
          <thead>
            <tr className="bg-[#031123] text-[#CCCCCC] text-sm">
              <th className=" p-2">Particulars</th>
              <th className="  p-2">Qty</th>
              <th className=" p-2">Rate</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(4)].map((_, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-[#00193B]" : "bg-[#00214F]"}>
                <td className="border border-[#1B2E5D] p-3"></td>
                <td className="border border-[#1B2E5D] p-3"></td>
                <td className="border border-[#1B2E5D]  p-3"></td>
                <td className="border border-[#1B2E5D] p-3"></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="shadow-custom-blue flex justify-between bg-[#031123] p-3 mt-5 rounded text-sm">
          <span>Total Payable Amount</span>
          <span className=" font-semibold">₹ 50,000 INR/-</span>
        </div>
      </div>

      {/* Print Button */}
      <button
        className="mt-8 mb-10 bg-[#FF5470] text-white font-semibold py-2 px-8 rounded-full shadow-lg"
        onClick={() => window.print()}
      >
        Print
      </button>

      {/* Footer */}
      <div className="text-center text-xs text-[#CCCCCC] mt-auto">
        <p>Copyright © 2025 By Metro Scales. All Rights Reserved</p>
        <p>Powered By ByteBandits</p>
      </div>
    </div>
  );
};

export default CustomerInvoice;
