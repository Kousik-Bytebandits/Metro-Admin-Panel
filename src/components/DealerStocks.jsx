import  { useState, useEffect, useRef, forwardRef } from "react";
import { FaArrowLeft, FaChevronRight, FaCalendarAlt, FaChevronLeft, FaSyncAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const dayColors = {
  Sunday: "bg-[#577590]",
  Monday: "bg-[#f94144]",
  Tuesday: "bg-[#F3722C]",
  Wednesday: "bg-[#F8961E]",
  Thursday: "bg-[#F9C74F]",
  Friday: "bg-[#90BE6D]",
  Saturday: "bg-[#43AA8B]",
};

const formatDate = (date) => {
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options).replace(/,/g, "");
};

const CustomCalendarInput = forwardRef(({ value, onClick }, ref) => (
  <button
    onClick={onClick}
    ref={ref}
    className="flex items-center space-x-2 mr-4 mt-1 text-white"
  >
    <FaCalendarAlt size={30} />
  </button>
));

const DealerStocks = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const dealerName = state?.dealerName;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [invoiceDates, setInvoiceDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [invoiceMap, setInvoiceMap] = useState({});
  const topRef = useRef(null);
  const [dealerStats, setDealerStats] = useState({ balance: null, revenue: null });

const [paymentAmount, setPaymentAmount] = useState("");


  const fetchInvoices = () => {
    fetch(`https://metro.bytebandits.in/invoices/maininvoice?dealerid=${id}`, {
      headers: {
        Authorization: "Bearer 9f3a7c1d2b4e8f0a",
      },
    })
      .then((res) => res.json())
      .then((data) => {
          if (!Array.isArray(data)) {
    throw new Error("Unexpected response format: " + JSON.stringify(data));
  }
  const dateToId = {};      
const dates = data.map((inv) => {
    const dateObj = new Date(inv.date);
    dateToId[dateObj.toDateString()] = inv.id;  // assuming inv.id is main_invoice_id
    return dateObj;
  });
        setInvoiceMap(dateToId);
        setInvoiceDates(dates.sort((a, b) => a-b));
      })
      .catch((err) => console.error("Failed to fetch invoices:", err));
  };
  const fetchDealerStats = () => {
    
  fetch(`https://metro.bytebandits.in/dealers/${id}/stats`, {
    headers: {
      Authorization: "Bearer 9f3a7c1d2b4e8f0a",
    },
  })
    .then((res) => res.json())
    .then((data) => {
       
      setDealerStats({ balance: data.balance, revenue: data.net_revenue });
    })
    .catch((err) => {
      console.error("Failed to fetch dealer stats:", err);
    });
};


  useEffect(() => {
    fetchInvoices();
     fetchDealerStats();
  }, [id]);

 
  const handleDateChange = (date) => {
    const formatted = formatDate(date);
    const day = new Date(date).toLocaleDateString("en-US", { weekday: "long" });

    fetch(`https://metro.bytebandits.in/invoices/maininvoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 9f3a7c1d2b4e8f0a",
      },
      body: JSON.stringify({
        dealerid: Number(id),
        date: formatted.replace(/ /g, "-"),
        day,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
          const newId = res.id;
  const newDateObj = new Date(date);
  setInvoiceMap((prev) => ({
    ...prev,
    [newDateObj.toDateString()]: newId
  }));
        fetchInvoices();
        setSelectedDate(date);
      })
      .catch((err) => console.error("Failed to create invoice:", err));
  };
const handlePaymentUpdate = () => {
  const amount = parseFloat(paymentAmount);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  fetch(`https://metro.bytebandits.in/dealers/${id}/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 9f3a7c1d2b4e8f0a"
    },
    body: JSON.stringify({ amount })
  })
    .then((res) => res.json())
    .then(() => {
      setPaymentAmount("");        
      fetchDealerStats();           
    })
    .catch((err) => {
      console.error("Payment update failed:", err);
      alert("Payment update failed.");
    });
};

  const scrollToTop = () => {
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const getDayName = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });
  };

  const navigate = useNavigate();
  const handleDayClick = (dateStr) => {
   const dateObj = new Date(dateStr);
  const day = dateObj.toLocaleDateString("en-US", { weekday: "long" });
  const invoiceId = invoiceMap[dateObj.toDateString()];
   if (!invoiceId) {
    console.error("Invoice ID not found for selected date:", dateStr);
    return;
  }
    navigate(`/dealers/${id}/stocks/${encodeURIComponent(dateStr)}`, {
      state: { dealerName, day, invoiceId }
    });
  };

  const [startX, setStartX] = useState(0);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50 && currentSlide < 1) {
      
      setCurrentSlide(currentSlide + 1);
    } else if (diff < -50 && currentSlide > 0) {
    
      setCurrentSlide(currentSlide - 1);
    }
  };
  return (
    <div className="bg-[#00193b] text-white font-archivo p-4 min-h-screen mx-auto" ref={topRef}>
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-6 mt-4">
        <button onClick={() => window.history.back()} className="bg-[#4F89FC] p-2 rounded-full">
          <FaArrowLeft className="text-3xl text-[#031123]" />
        </button>
        <h1 className="text-[25px] font-bold">Dealer Stocks</h1>
        <div className="w-12 h-12 bg-white p-1 rounded-full flex items-center justify-center">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
        </div>
      </div>

 <div
      className="relative overflow-hidden bg-[#031123] shadow-custom-blue rounded-lg h-[320px] w-full"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      
    >
      
     
      <div
        className="flex transition-transform duration-500 ease-in-out w-[100%] h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {/* Slide 1 */}
        <div className="w-full flex-shrink-0 p-8">
          <p className="text-xl text-[#8E8E8E]">Balance</p>
          <h1 className="text-[50px] mb-2">₹ {dealerStats.balance?.toLocaleString() || "0"}</h1>
          <p className="text-xl text-[#8E8E8E] mt-2 mb-4">Net Revenue</p>
          <h2 className="text-[35px]">₹ {typeof dealerStats.revenue === "number" ? dealerStats.revenue.toLocaleString() : "0"}</h2>
        </div>

        {/* Slide 2 */}
           <div className="w-full flex-shrink-0 p-8">
          <p className="text-sm text-[#8E8E8E] mb-2">Amount Paid</p>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            placeholder="₹ 24,000"
            className="w-full p-2 text-[30px] rounded bg-[#00193B] border border-[#1B2E5D] text-white mb-4"
          />
          <p className="text-[18px] text-[#8E8E8E] mb-4">New Balance</p>
          <div className="flex justify-between">
            <h2 className="text-[28px]">₹ {dealerStats.balance?.toLocaleString() || "0"}</h2>
            <button
              onClick={handlePaymentUpdate}
              className="bg-[#F94144] hover:bg-red-600 text-white px-8 -mt-1 text-[28px] rounded"
            >
              Update
            </button>
          </div>
        </div>
      </div>
      {/*{currentSlide === 1 && (
          <div className="bg-[#031123] p-8 rounded-lg h-[300px]">
            <p className="font-semibold mb-2 text-lg mb-3">Sales Profit by Category:</p>
            {[
              { label: "Weighing Machine", color: "bg-blue-500", width: "w-[80%]" },
              { label: "Bag Closer", color: "bg-green-400", width: "w-[60%]" },
              { label: "Counting Machine", color: "bg-yellow-400", width: "w-[50%]" },
              { label: "Billing Machine", color: "bg-gray-400", width: "w-[70%]" },
              { label: "Sealing Machine", color: "bg-pink-500", width: "w-[40%]" },
            ].map((item, idx) => (
              <div key={idx} className="mb-3">
                <p className="text-sm mb-0.5">{item.label}</p>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div className={`h-2 ${item.color} rounded-full ${item.width}`}></div>
                </div>
              </div>
            ))}
          </div>
        )}*/} 
      {/* Arrows */}
      {currentSlide > 0 && (
        <button
          onClick={() => setCurrentSlide(currentSlide - 1)}
          className="absolute  top-1/2 transform -translate-y-1/2 rounded-full p-1 text-gray-300 z-10"
        >
          <FaChevronLeft size={28} />
        </button>
      )}
      {currentSlide < 1 && (
        <button
          onClick={() => setCurrentSlide(currentSlide + 1)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full p-1 text-gray-300 z-10"
        >
          <FaChevronRight size={28} />
        </button>
      )}

      {/* Dots */}
      <div className="flex justify-center items-center space-x-1 absolute bottom-2 left-1/2 transform -translate-x-1/2">
        {[0, 1].map((i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${currentSlide === i ? "bg-white" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  
    
      {/* Add Invoice Section */}
      <div className="flex items-center justify-between bg-[#00957e]  px-3 py-2 mt-8  rounded-full">
        <span className="font-bold text-[20px] ml-4">ADD INVOICE</span>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          excludeDates={invoiceDates}
          customInput={<CustomCalendarInput />}
        />
      </div>

      <div className="flex justify-between my-5">
        <div className="ml-1 mt-1 text-[14px] text-[#CCCCCC]">Recent Invoices</div>
        <button onClick={fetchInvoices} className="bg-blue-500 mr-6 -mt-2 p-2 rounded-full text-white text-lg">
          <FaSyncAlt />
        </button>
      </div>

      {/* Invoices */}
      <div className="space-y-2">
        {invoiceDates.map((dateStr, i) => {
          const day = getDayName(dateStr);
          const dateObj = new Date(dateStr);
          const month = dateObj.toLocaleString("default", { month: "short" });
          const date = dateObj.getDate();
          const year = dateObj.getFullYear();

          return (
            <div
              key={i}
              className="flex items-center justify-between bg-[#011637]  rounded-md "
            >
              <div className="grid grid-cols-[auto_1fr_auto] bg-[#031123] bg-black/20 shadow-custom-blue rounded-lg overflow-hidden  w-full max-w-md">
                <div className="flex items-center justify-center px-4 py-3">
                  <div className="bg-[#011650] p-2 rounded-full border">
                    <img src="/invoice-icon.png" alt="icon" className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-center px-4 text-white ml-10 text-[16px] font-medium">
                  {month} - {date} - {year}
                </div>
                <div
                  className={`flex items-center w-[120px] justify-left px-4 text-black font-bold text-[18px] ${dayColors[day]}`}
                  onClick={() => handleDayClick(dateStr)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleDayClick(dateStr);
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {day}
                </div>
              </div>
            </div>
          );
        })}
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
  );
};

export default DealerStocks;
