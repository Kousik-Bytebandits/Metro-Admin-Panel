import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

const UpdateDealer = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); 

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    contact_person: "",
    phone_number: "",
    address: "",
    city: "",
    pincode: ""
  });

  useEffect(() => {
    if (state) {
      setFormData(state); 
    }
  }, [state]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://metro.bytebandits.in/dealers/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 9f3a7c1d2b4e8f0a"
      },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update dealer");
        return res.json();
      })
      .then(() => {
        alert("Dealer updated successfully!");
        navigate("/dealers"); 
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating dealer");
      });
  };

  return (
    <div className="min-h-screen bg-[#00193b] text-white font-sans flex flex-col items-center p-4">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-md mb-6 mt-4">
        <button onClick={() => navigate(-1)} className="bg-[#4F89FC] p-2 rounded-full">
          <FaArrowLeft className="text-3xl text-[#031123]" />
        </button>
        <h1 className="text-[25px] font-bold">Update Dealer</h1>
        <div className="w-12 h-12 bg-white p-1 rounded-full flex items-center justify-center">
          <img src="logo.png" alt="Logo" className="w-8 h-8 object-contain" />
        </div>
      </div>

      {/* Form */}
      <div className="bg-[#031123] text-[15px] text-[#CCCCCC] p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-[18px] font-semibold mb-4 text-white">Dealer Details</h2>
        <form className="space-y-5 " onSubmit={handleSubmit}>
          <div>
            <label className="block  mb-2">Dealer Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 bg-[#0a1f46] border border-[#0c2e63] rounded text-sm"
            />
          </div>
          <div>
            <label className="block  mb-2">Contact Person</label>
            <input
              name="contact_person"
              value={formData.contact_person}
              onChange={handleChange}
              className="w-full p-2 bg-[#0a1f46] border border-[#0c2e63] rounded text-sm "
            />
          </div>
          <div>
            <label className="block  mb-2">Phone Number</label>
            <input
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full p-2 bg-[#0a1f46] border border-[#0c2e63] rounded text-sm  "
            />
          </div>
          <div>
            <label className="block  mb-2">Address</label>
            <textarea
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 bg-[#0a1f46] border border-[#0c2e63] rounded  text-sm resize-none"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm mb-2">City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 bg-[#0a1f46] border border-[#0c2e63] rounded  text-sm"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm mb-2">Pincode</label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full p-2 bg-[#0a1f46] border border-[#0c2e63] rounded text-sm"
              />
            </div>
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="px-12 text-[16px] mt-5 py-2 bg-[#00BA9D] text-white font-bold rounded-full hover:opacity-90 transition"
            >
              Update
            </button>
          </div>
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

export default UpdateDealer;
