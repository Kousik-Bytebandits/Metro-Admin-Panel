import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DealerManagement = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    contact_person: "",
    phone_number: "",
    address: "",
    city: "",
    pincode: ""
  });

  const [loading, setLoading] = useState(false); 

  const handleBack = () => {
    navigate("/Admin_Pannel/dealers");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const res = await fetch("https://metro.bytebandits.in/dealers/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 9f3a7c1d2b4e8f0a"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        alert("Dealer created successfully!");
        navigate("/dealers");
      } else {
        alert(`Error: ${data.message || "Failed to create dealer"}`);
      }
    } catch (error) {
      alert("Network error");
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#00193b] flex items-center justify-center">
        <div className="flex space-x-2">
          <div className="w-1.5 h-3 bg-blue-400 animate-bounce-short delay-[0ms] rounded"></div>
          <div className="w-1.5 h-6 bg-blue-400 animate-bounce-tall delay-[150ms] rounded"></div>
          <div className="w-1.5 h-3 bg-blue-400 animate-bounce-short delay-[300ms] rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#00193b] font-archivo text-white p-4 flex flex-col items-center overflow-hidden">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4 mt-4">
        <button onClick={handleBack} className="bg-[#4F89FC] p-2 rounded-full">
          <FaArrowLeft className="text-3xl text-[#031123]" />
        </button>
        <h1 className="text-center text-[25px] font-bold leading-tight">
          Dealer<br />Management
        </h1>
        <img src="/favicon.png" alt="Logo" className="w-12 h-12 rounded-full bg-white p-1" />
      </div>

      {/* Form Container */}
      <div className="bg-[#031123] shadow-custom-blue w-full max-w-md mt-6 rounded p-4 mb-5">
        <h2 className="text-[18px] font-semibold mb-6">Dealer Details</h2>

        <form className="space-y-8 text-[15px] text-[#CCCCCC] mb-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1">Dealer Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md bg-[#0a1f46] border border-[#0c2e63] focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1">Contact Person Name</label>
            <input
              type="text"
              name="contact_person"
              value={formData.contact_person}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md bg-[#0a1f46] border border-[#0c2e63] focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md bg-[#0a1f46] border border-[#0c2e63] focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md bg-[#0a1f46] border border-[#0c2e63] focus:outline-none"
            />
          </div>

          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-md bg-[#0a1f46] border border-[#0c2e63] focus:outline-none"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-md bg-[#0a1f46] border border-[#0c2e63] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="text-lg mt-4 px-14 py-2 bg-[#4F89FC] text-white rounded-full font-semibold hover:bg-blue-600 transition mx-auto block"
          >
            Save
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-[#CCCCCC] mt-auto">
        <p>Copyright © 2025 By Metro Scales. All Rights Reserved</p>
        <p>Powered By ByteBandits</p>
      </div>
    </div>
  );
};

export default DealerManagement;
