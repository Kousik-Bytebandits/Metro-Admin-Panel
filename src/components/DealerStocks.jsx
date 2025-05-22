import  { useState, useRef, forwardRef } from "react";
import { FaArrowLeft, FaChevronRight, FaCalendarAlt, FaChevronLeft,FaSyncAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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

// Custom calendar input with forwardRef
const CustomCalendarInput = forwardRef(({ value, onClick }, ref) => (
  <button
    onClick={onClick}
    ref={ref}
    className="flex items-center space-x-2 mr-4 mt-1 text-white"
  >
    <FaCalendarAlt size={24} />
    
  </button>
));

const DealerStocks = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [invoiceDates, setInvoiceDates] = useState([
      "May 04 2024",
    "May 09 2024",
    "May 14 2024",
    "May 22 2025",
  ]);
  const [selectedDate, setSelectedDate] = useState(null);
  const topRef = useRef(null);

  const goToNext = () => currentSlide < 2 && setCurrentSlide(currentSlide + 1);
  const goToPrev = () => currentSlide > 0 && setCurrentSlide(currentSlide - 1);

  const handleDateChange = (date) => {
    const formatted = formatDate(date);
    if (!invoiceDates.includes(formatted)) {
      setInvoiceDates((prev) =>
        [...prev, formatted].sort((a, b) => new Date(a) - new Date(b))
      );
    }
    setSelectedDate(date);
  };

  const scrollToTop = () => {
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const getDayName = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });
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
          <img src="logo.png" alt="Logo" className="w-8 h-8 object-contain" />
        </div>
      </div>

      {/* Slides */}
      <div className="relative bg-[#031123]">
        {currentSlide === 0 && (
          <div className="bg-[#031123] p-8 rounded-xl flex flex-col h-[300px]">
            <p className="text-xl text-[#8E8E8E] mb-1">Balance</p>
            <h1 className="text-[50px] mb-4">₹ 50,000</h1>
            <p className="text-xl text-[#8E8E8E] mt-2 mb-3">Net Revenue</p>
            <h2 className="text-[30px]">₹ 5,00,000</h2>
          </div>
        )}
        {currentSlide === 1 && (
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
        )}
        {currentSlide === 2 && (
          <div className="bg-[#031123] p-8 h-[300px] rounded-lg">
            <p className="text-sm text-[#8E8E8E] mb-2">Amount Paid</p>
            <input
              type="text"
              placeholder="₹ 24,000"
              className="w-full p-2 text-[30px] rounded bg-[#00193B] border border-[#1B2E5D] text-white mb-12"
            />
            <p className="text-sm text-[#8E8E8E] mb-2">New Balance</p>
            <div className="flex justify-between">
              <h2 className="text-[28px]">₹ 26,000</h2>
              <button className="bg-[#F94144] hover:bg-red-600 text-white px-12 text-[22px] rounded">
                Update
              </button>
            </div>
          </div>
        )}
        {currentSlide > 0 && (
          <button
            onClick={goToPrev}
            className="absolute -left-1 top-1/2 transform -translate-y-1/2 rounded-full p-1 text-gray-500"
          >
            <FaChevronLeft size={28} />
          </button>
        )}
        {currentSlide < 2 && (
          <button
            onClick={goToNext}
            className="absolute -right-1 top-1/2 transform -translate-y-1/2 rounded-full p-1 text-gray-500"
          >
            <FaChevronRight size={28} />
          </button>
        )}
        <div className="flex justify-center items-center space-x-1 mt-2 absolute bottom-2 left-1/2 transform -translate-x-1/2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${currentSlide === i ? "bg-white" : "bg-gray-400"}`}
            />
          ))}
        </div>
      </div>

      {/* Add Invoice Section */}
      <div className="flex items-center justify-between bg-[#00957e] px-3 py-2 mt-8 mb-8 rounded-full">
        <span className="font-bold text-[20px] ml-4">ADD INVOICE</span>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          customInput={<CustomCalendarInput />}
        />
      </div>

      {/* Label Instead of Refresh */}
      
  <div className="flex justify-between my-6">
    <div className="ml-1 text-[14px] text-[#CCCCCC]">Recent Invoices</div>
        <button
        
          className="bg-blue-600 -mt-2 p-2 rounded-full text-white "
        >
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
      <div className="grid grid-cols-[auto_1fr_auto] bg-[#031123] rounded-lg overflow-hidden  w-full max-w-md">
    <div className="flex items-center justify-center px-4 py-3">
      <div className="bg-[#011650] p-2 rounded-full border">
        <img src="invoice-icon.png" alt="icon" className="w-5 h-5" />
      </div>
    </div>
    <div className="flex items-center px-4 text-white ml-10 text-[16px] font-medium">
     {month} - {date} - {year}
    </div>
    <div className={`flex items-center w-[120px] justify-left px-4 text-black font-bold text-[18px] ${dayColors[day]}`}>
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
          className="bg-rose-500 mb-10 mt-3 px-12 py-2 rounded-full text-white font-bold"
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
