import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CustomerInvoice = () => {
  const navigate = useNavigate();

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    date: "",
    phone: "",
    address: "",
  });

 
  const [invoiceRows, setInvoiceRows] = useState(
    Array.from({ length: 10 }, () => ({ particulars: "", qty: 0, rate: "", total: 0 }))
  );
  const [showAllRows, setShowAllRows] = useState(false);

  const handleRowChange = (index, field, value) => {
    const newRows = [...invoiceRows];
    if (field === "qty" || field === "rate") {
      value = field === "qty" ? parseInt(value, 10) : value;
      newRows[index][field] = value;
      const rate = parseFloat(newRows[index].rate) || 0;
      const qty = parseInt(newRows[index].qty) || 0;
      newRows[index].total = rate && qty ? rate * qty : 0;
    } else {
      newRows[index][field] = value;
    }

    if (!showAllRows && newRows.slice(0, 5).every(row => row.particulars && row.qty && row.rate)) {
      setShowAllRows(true);
    }

    setInvoiceRows(newRows);
  };

  const handlePrintClick = () => {
    const total = invoiceRows.reduce((sum, row) => sum + (parseFloat(row.total) || 0), 0);
    navigate("/print", {
  state: {
    buyerName: customerDetails.name,
    buyerAddress: customerDetails.address,
    buyerPhone: customerDetails.phone,
    date: customerDetails.date,
    items: invoiceRows,
    totalQuantity: total,
    totalAmount: totalPayable,
  },
});

  };
const totalPayable = invoiceRows.reduce((sum, row) => sum + (parseFloat(row.total) || 0), 0);
  const visibleRows = showAllRows ? invoiceRows : invoiceRows.slice(0, 5);

  return (
    <div className="bg-[#00193b] p-4 text-white font-archivo min-h-screen flex flex-col items-center">
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-6 mt-4">
        <button onClick={() => window.history.back()} className="bg-[#4F89FC] p-2 rounded-full">
          <FaArrowLeft className="text-3xl text-[#031123]" />
        </button>
        <h1 className="text-[25px] font-bold">Customer Invoice</h1>
        <div className="w-12 h-12 bg-white p-1 rounded-full flex items-center justify-center">
          <img src="/favicon.png" alt="Logo" className="w-8 h-8 object-contain" />
        </div>
      </div>

      {/* Customer Details */}
      <div className="bg-[#031123] p-4 rounded-lg shadow-custom-blue w-full ">
        <h3 className="text-white text-[22px] font-semibold mb-3">Customer Details</h3>
       <label className="text-[16px] text-[#cccccc]" >Customer Name</label>
        <input
          type="text"
          value={customerDetails.name}
          onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
          className="w-full p-2 mb-2 bg-[#00193B] border border-[#1B2E5D] text-white rounded outline-none text-[16px]"
        />
        <label className="text-[16px] text-[#cccccc]" >Date</label>
        <input
          type="date"
          value={customerDetails.date}
          onChange={(e) => setCustomerDetails({ ...customerDetails, date: e.target.value })}
          className="w-full  max-w-full min-w-0 overflow-hidden p-2 mb-2 bg-[#00193B] border border-[#1B2E5D] text-white rounded outline-none text-[14px] appearance-none"
        />
        <label className="text-[16px] text-[#cccccc]" >Phone Number</label>
        <input
          type="text"
          
          value={customerDetails.phone}
          onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
          className="w-full p-2 mb-2 bg-[#00193B] border border-[#1B2E5D] text-white rounded outline-none text-[16px]"
        />
        <label className="text-[16px] text-[#cccccc]" >Address</label>
        <textarea
          rows="3"
         
          value={customerDetails.address}
          onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
          className="w-full p-2 bg-[#00193B] border border-[#1B2E5D] text-white rounded outline-none text-[16px] resize-none"
        />
      </div>

      {/* Invoice Table */}
      <div className="mt-4 w-full p-1">
        <h4 className="mb-3 text-[18px] text-[#CCCCCC]">Invoice:</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-center rounded-xl text-white shadow-custom-blue">
            <thead>
              <tr className="bg-[#031123] text-[#CCCCCC] text-[18px]">
                <th className="p-3">Particulars</th>
                <th className="p-3 w-16">Qty</th>
                <th className="p-3 w-20">Rate</th>
                <th className="p-3 w-28">Total</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-[#00193B]" : "bg-[#00214F]"}>
                  <td className="border border-[#1B2E5D] p-2">
                    <input
                      type="text"
                      value={row.particulars}
                      onChange={(e) => handleRowChange(i, "particulars", e.target.value)}
                      className="w-full bg-transparent text-white outline-none text-[16px]"
                    />
                  </td>
                  <td className="border border-[#1B2E5D] p-2">
                    <select
                      value={row.qty}
                      onChange={(e) => handleRowChange(i, "qty", e.target.value)}
                      className="w-full bg-transparent text-white outline-none text-[16px]"
                    >
                      <option value={0} className="text-black">Qty</option>
                      {Array.from({ length: 20 }, (_, idx) => (
                        <option key={idx + 1} value={idx + 1} className="text-black">
                          {idx + 1}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-[#1B2E5D] p-2">
                    <input
                      type="number"
                      value={row.rate}
                      onChange={(e) => handleRowChange(i, "rate", e.target.value)}
                      className="w-full bg-transparent text-white outline-none text-[16px] text-center"
                    />
                  </td>
                  <td className="border border-[#1B2E5D] p-2 text-left">
                    {(row.qty && row.rate) ? `₹ ${row.total}` : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="shadow-custom-blue flex justify-between bg-[#031123] p-3 mt-8 rounded ">
          <span>Total Payable Amount</span>
          <span className="font-semibold">₹ {totalPayable.toFixed(2)} INR/-</span>
        </div>
       
      </div>
       
    
      

      {/* Print Button */}
      <button
        className="mt-8 mb-10 bg-[#FF5470] text-white font-semibold py-2 px-8 rounded-full "
        onClick={handlePrintClick}
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
