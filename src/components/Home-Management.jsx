
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomeManagement = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("de-DE"); 
   const navigate = useNavigate();
 const handleBack=()=>{
    navigate(-1);
 }
 const handleDealer=()=>{
  navigate("/Admin_Pannel/dealers");
 }
 const handleCustomer=()=>{
  navigate("/Admin_Pannel/customer-invoice");
 }
  return (
    <div className="min-h-screen bg-[#001a3d] font-archivo  text-white flex flex-col items-center py-8 px-4 overflow-hidden">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-6 ">
        <button className="bg-[#4F89FC] rounded-full p-2" onClick={handleBack}>
          <FaArrowLeft className="text-[#031123] text-3xl" />
        </button>
        <h1 className="text-[25px] font-bold ">Metro Scales</h1>
        <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
          <img
            src="/favicon.png"
            alt="Logo"
            className="w-8 h-8 object-contain"
          />
        </div>
      </div>
       <div className="space-y-10">
      {/* Date */}
      <div className="w-full bg-[#031123] shadow-custom-blue rounded-lg p-6 text-center text-[25px] font-semibold mb-6">
        {formattedDate}
      </div>
       
      {/* Dealer Button */}
      <button className="w-full h-[200px] font-archivo bg-[#00957e] rounded p-8 text-[40px] font-bold shadow-md mb-6" onClick={handleDealer}>
        DEALER
      </button>

      {/* Customer Button */}
      <button onClick={handleCustomer} className="w-full h-[200px] font-archivo bg-[#cc435a] rounded p-8 text-[40px] font-bold shadow-md mb-6">
        CUSTOMER
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

export default HomeManagement;
