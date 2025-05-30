import { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader"; 

const StockDetails = () => {
  const { date, id } = useParams();
  const location = useLocation();
  const { day, dealerName,invoiceId } = location.state || {};

  const [invoices, setInvoices] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [product, setProduct] = useState({
    product_name: "",
    quantity: "",
    standard_price: "",
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const token = "9f3a7c1d2b4e8f0a";

  const topRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(interval);
  }, []);

  const formattedTime = format(currentTime, "dd.MM.yyyy hh:mm a");



  useEffect(() => {
    fetchInvoices();
  }, [date, id]);

  // Fetch subinvoices by dealer_invoice_id (which is id param)
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await fetch
      (`https://metro.bytebandits.in/invoices/subinvoices/${invoiceId}?date=${date}`, {
  method: "GET",
  headers: { Authorization: `Bearer ${token}` },
});

      if (!res.ok) throw new Error("Failed to fetch sub-invoices");
      const data = await res.json();
const filtered = data.filter((item) => item.date === date);


setInvoices(filtered);

      setInvoices(data);
      setSelectedIds([]);
      
    } catch (err) {
      console.error(err);
    }
     finally {
      setLoading(false);
    }
  };

  // Add subinvoice using dealer_invoice_id (id param)
  const handleAddProduct = async () => {
    const { product_name, quantity, standard_price } = product;

    if (!product_name || !quantity || !standard_price) return;

    const payload = {
      main_invoice_id: invoiceId,
      product_name,
      quantity: parseInt(quantity),
      standard_price: parseFloat(standard_price),
    };

    setLoading(true);

    try {
      const res = await fetch(`https://metro.bytebandits.in/invoices/subinvoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create sub-invoice");

      setProduct({ product_name: "", quantity: "", standard_price: "" });
      fetchInvoices();
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
  try {
    await Promise.all(
      selectedIds.map((subinvoiceId) =>
        fetch(`https://metro.bytebandits.in/invoices/del_subinvoice`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            dealer_id: parseInt(id),       
            subinvoice_id: subinvoiceId,
          }),
        })
      )
    );

    fetchInvoices();
  } catch (err) {
    console.error("Delete failed:", err);
  }
};


  const total = invoices.reduce(
    (sum, item) => sum + item.quantity * item.standard_price,
    0
  );

  const scrollToTop = () => {
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen bg-[#00193b] p-4 text-white font-archivo"
      ref={topRef}
    >
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-md mb-6 mt-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#4F89FC] p-2 rounded-full"
        >
          <FaArrowLeft className="text-3xl text-[#031123]" />
        </button>
        <h1 className="text-[25px] font-bold">{day} Stocks</h1>
        <div className="w-12 h-12 bg-white p-1 rounded-full flex items-center justify-center">
          <img src="/favicon.png" alt="Logo" className="w-8 h-8 object-contain" />
        </div>
      </div>

      {/* Title */}
      <div className="bg-[#031123] font-bold shadow-custom-blue rounded-lg p-3 text-center space-y-1 py-6">
        <h2 className="text-[24px]  text-white">{dealerName}</h2>
        <p
          className="text-[16px] py-2 rounded mx-6 border bg-[#00193B] border-[#1B2E5D]"
        >
          {formattedTime}
        </p>
      </div>

      {/* Form */}
      <p className="text-sm text-[#CCCCCC] ml-2 mt-5 mb-1">Add Items:</p>
      <div className="bg-[#031123] rounded-lg p-4 space-y-4 shadow-custom-blue">
        <div className="flex flex-col space-y-1">
          <label className="text-sm">Product Name</label>
          <input
            type="text"
            className="bg-[#00193B] rounded-md px-3 py-2 outline-none w-full border border-[#1B2E5D]"
            value={product.product_name}
            onChange={(e) =>
              setProduct({ ...product, product_name: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm">Quantity</label>
          <input
            type="number"
            className="bg-[#00193B] rounded-md px-3 py-2 outline-none w-full bg-[#00193B] border border-[#1B2E5D]"
            value={product.quantity}
            onChange={(e) =>
              setProduct({ ...product, quantity: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm">Cost per Piece</label>
          <input
            type="number"
            className="bg-[#00193B] rounded-md px-3 py-2 outline-none w-full bg-[#00193B] border border-[#1B2E5D]"
            value={product.standard_price}
            onChange={(e) =>
              setProduct({ ...product, standard_price: e.target.value })
            }
          />
        </div>

        <button
          onClick={handleAddProduct}
          disabled={loading}
          className="w-full bg-[#00957e] hover:bg-teal-600 py-3 rounded-full font-bold text-white"
        >
          {loading ? "Adding..." : "ADD PRODUCT"}
        </button>
      </div>

      {/* Product List */}
      <div className="border-t border-gray-600 pt-4 space-y-4 mt-12 pt-10">
        <div className="flex justify-between items-center">
          <p className="text-sm text-white">Product List</p>
          <FaTrash
            onClick={handleDeleteSelected}
            className="text-red-500 cursor-pointer"
          />
        </div>
          {loading && <Loader />}
        {invoices.map((item, i) => (
          <div key={item.id || i} className="flex items-center space-x-2 ">
            <input
              type="checkbox"
              className="accent-blue-600"
              checked={selectedIds.includes(item.id)}
              onChange={() => handleCheckboxChange(item.id)}
            />
            <div className="flex flex-grow items-stretch bg-[#0B1120] rounded-lg overflow-hidden">
              <div className="flex-grow grid grid-cols-4 items-center pl-1">
                <div className="col-span-2 flex flex-col justify-center ml-2">
                  <p className="text-[14px]  font-semibold leading-tight">
                    {item.product_name}
                  </p>
                  <p className="text-xs text-gray-400">{item.quantity} Units</p>
                </div>
                <div className="text-left ml-2 text-[14px] ">
                  <p className="font-semibold">
                    ₹ {item.standard_price.toLocaleString()}
                  </p>
                  <p className="text-gray-400 ml-2">Piece</p>
                </div>
              </div>
              <div className=" bg-[#C541F9] w-[115px] text-white text-left font-bold py-4 px-3 text-[20px] whitespace-nowrap">
                ₹ {(item.quantity * item.standard_price).toLocaleString()}
              </div>
            </div>
          </div>
        ))}

        {/* Total Cost */}
        <div className="bg-black font-bold text-white rounded-lg py-3 px-4 flex justify-between">
          <span className="mt-1 text-[16px]">Total Cost:</span>
          <span className="  text-[20px]">₹ {total.toLocaleString()}</span>
        </div>

        {/* Scroll to Top */}
        <div className="flex justify-center mt-4">
          <button
            onClick={scrollToTop}
            className="bg-[#FF5470] mb-10 mt-3 px-12 py-2 rounded-full text-white font-bold"
          >
            TOP
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-[#CCCCCC] mt-auto">
          <p>Copyright © 2025 By Metro Scales. All Rights Reserved</p>
          <p>Powered By ByteBandits</p>
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
