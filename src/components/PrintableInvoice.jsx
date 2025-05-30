import  { useEffect, useState ,useRef} from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PrintableInvoice =() => {
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceData = location.state || {};
   const hasGeneratedInvoice = useRef(false); 
  const [amountInWords, setAmountInWords] = useState("");
  const [invoiceId, setInvoiceId] = useState("");



  useEffect(() => {
     if (hasGeneratedInvoice.current) return; 
    hasGeneratedInvoice.current = true;
  let currentInvoiceNumber = localStorage.getItem("invoiceCounter");
  currentInvoiceNumber = currentInvoiceNumber ? parseInt(currentInvoiceNumber, 10) : 1;
  const randomId = `M-${currentInvoiceNumber}/25-26`;
  setInvoiceId(randomId);
  localStorage.setItem("invoiceCounter", currentInvoiceNumber + 1);

    
    const fetchAmountInWords = async () => {
      try {
        const response = await fetch("https://metro.bytebandits.in/helper/convert", {
          method: "POST",
          headers: {
            Authorization: "Bearer 9f3a7c1d2b4e8f0a",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ number: invoiceData.totalAmount || 0 }),
        });
        const data = await response.json();
        setAmountInWords(data.words || "");
      } catch (error) {
        console.error("Error fetching amount in words:", error);
      }
    };

    if (invoiceData.totalAmount) {
      fetchAmountInWords();
    }
  }, [invoiceData.totalAmount]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-[148mm] h-[210mm] px-6 pt-4 pb-10 text-sm text-black font-archivo">
      <div className="border border-black">
        <h1 className="text-center font-bold text-lg border-b border-black pb-1">INVOICE</h1>

        <div className="flex justify-between border-b border-black py-1 text-sm px-4">
          <div>
            <span className="font-semibold">Bill No :</span> {invoiceId}
          </div>
          <div>
            <span className="font-semibold">Date :</span> {invoiceData.date || "--"}
          </div>
        </div>

        <div className="flex   text-xs">
        <img src="/black.png" className="w-16 h-16 p-2 mt-1">
        </img>
          <div className="w-1/2 p-2 border-r border-black leading-snug">
            <h2 className="font-bold text-[15px]">NEW METRO HARDWARES</h2>
            <p>No.39/175, Kayidey Millath Salai,<br/> Palakarai, Trichy-8.</p>
            <p className="font-bold text-[15px]">89401 45069.</p>
            <p>GST : 33DLGPA1807P1Z6</p>
            <p>M.D.L.NO. 4213</p>
            <p>MFG.L.No.TN/TRP/LM/15-23-00096</p>
            <p>Email: newmetrohardwares68@gmail.com</p>
          </div>
          <div className="w-[40.5%] p-2 leading-snug">
            <h2 className="font-bold">Buyer:</h2>
            <p className="text-[15px] font-bold mb-1">{invoiceData.buyerName || "--"}</p>
            <p >{invoiceData.buyerAddress || "--"}</p>
            <p>{invoiceData.buyerPhone || "--"}</p>
          </div>
        </div>

     <table className="w-full  text-xs text-center border-collapse">
  <thead>
    <tr className="border-y border-black">
      <th className="p-1 border-r border-black">S.No</th>
      <th className="p-1 border-r border-black">Description Of Goods</th>
      <th className="p-1 border-r border-black">Quantity</th>
      <th className="p-1 border-r border-black">Rate Per Piece</th>
      <th className="p-1">Amount</th>
    </tr>
  </thead>
  <tbody>
    {invoiceData.items
      ?.filter(item => item.qty || item.rate || item.total)
      .map((item, index) => (
        <tr key={index}>
          <td className="p-1 border-r border-black">{index + 1}.</td>
          <td className="p-1 border-r border-black font-semibold">{item.particulars}</td>
          <td className="p-1 border-r border-black">{item.qty}</td>
          <td className="p-1 border-r border-black">{item.rate?.toLocaleString()}</td>
          <td className="p-1">{item.total?.toLocaleString()}</td>
        </tr>
      ))}

   
    {Array.from({ length: 10 - invoiceData.items.filter(item => item.qty || item.rate || item.total).length }).map((_, idx) => (
      <tr key={`blank-${idx}`}>
        <td className="p-1 border-r border-black">&nbsp;</td>
        <td className="p-1 border-r border-black">&nbsp;</td>
        <td className="p-1 border-r border-black">&nbsp;</td>
        <td className="p-1 border-r border-black">&nbsp;</td>
        <td className="p-1">&nbsp;</td>
      </tr>
    ))}
  </tbody>
  <tfoot>
    <tr className="border-y border-black font-semibold">
      <td className="p-1 border-r border-black">&nbsp;</td>
      <td className="p-1  pr-2 border-r border-black">Total</td>
      <td className="p-1 border-r border-black">
        {invoiceData.items?.reduce((sum, item) => sum + (parseInt(item.qty) || 0), 0)} Nos
      </td>
      <td className="p-1 border-r border-black">&nbsp;</td>
      <td className="p-1">₹ {invoiceData.totalAmount?.toLocaleString() || "--"}</td>
    </tr>
  </tfoot>
</table>


        <div className="mt-2 text-xs px-4">
          <p className="font-semibold">Amount Chargeable In Words</p>
          <p className="font-bold">INR {amountInWords} Only/-</p>
        </div>

        <div className="mt-4 mx-0 px-4 py-2 bg-gray-300 text-xs relative border-t border-black">
          <div>
            <p><span className="font-semibold underline">Bank Details:</span> <span className="font-bold">KARUR VYSYA BANK</span></p>
            <p>AC.No : 1196135000012000</p>
            <p>IFSC : KVBL0001196</p>
            <p>Branch: Cantonment Branch, Trichy</p>
            <p className="mt-2"><span className="underline">Declaration:</span><br />GOODS ONCE SOLD CANNOT BE TAKEN BACK</p>
          </div>
          <div className="absolute bottom-2 right-2 border border-black px-2 py-1 text-xs text-right">
            <p>For <span className="font-semibold">NEW METRO HARDWARES</span></p>
            <p className="mt-6">Authorised Signatory</p>
          </div>
        </div>
      </div>

      <div className="text-xs mt-1 px-4">
        <p className="text-center">This is a Computer Generated Invoice</p>
        <p className="text-center font-semibold">For Customer Feedback and Complaints mail us : newmetrohardwares68@gmail.com</p>
        <p className="text-center font-semibold">Whatsapp: +91 8940145069.</p>
      </div>

      <div className="mt-4 flex justify-between px-4 no-print">
        <button onClick={() => navigate(-1)} className="bg-gray-200 border border-black px-4 py-1 text-xs font-semibold">Back</button>
        <button onClick={handlePrint} className="bg-blue-500 text-white px-4 py-1 text-xs font-semibold">Print</button>
      </div>
    </div>
  );
};

export default PrintableInvoice;
