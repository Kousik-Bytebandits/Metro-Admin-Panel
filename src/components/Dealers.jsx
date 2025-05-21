import { useEffect, useState } from 'react';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';

const Dealers = () => {
  const [dealerProfiles, setDealerProfiles] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('https://metro.bytebandits.in/dealers/', {
      headers: {
        Authorization: 'Bearer 9f3a7c1d2b4e8f0a',
      },
    })
      .then((res) => res.json())
      .then((data) => setDealerProfiles(data))
      .catch((err) => console.error('Failed to fetch dealer data:', err));
  }, []);

  const handleBack=()=>{
    navigate('/home-management')
  }
  const handleDealerManagement=()=>{
    navigate("/dealer-management");
  }
  return (
    <div className="min-h-screen font-archivo flex flex-col bg-[#00193b] text-white px-4 py-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 mt-4">
        <button onClick={handleBack} className="bg-[#4F89FC] text-[#031123] rounded-full p-2">
          <FaArrowLeft className="text-3xl" />
        </button>
        <h1 className="text-[25px] font-bold">Dealer Profiles</h1>
        <div className="rounded-full p-2 w-12 h-12 bg-white">
          <img src="logo.png" alt="Logo" className="w-8 h-8" />
        </div>
      </div>

      {/* Add Profile Button */}
      <div className="bg-[#031123] px-6 py-5 rounded mb-4">
        <button onClick={handleDealerManagement} className="w-full bg-[#00957E] text-white font-bold py-3  rounded text-[25px]">
          Add Profile
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-3 rounded mb-2">
        <div className="flex items-center border border-[#e5e7eb] rounded-full px-4 py-2 bg-[#182e4c]">
          <input
            type="text"
            placeholder="Search By Name"
            className="flex-grow text-white placeholder-[#e5e7eb] bg-[#182e4c] outline-none text-[14px] "
          />
          <FaSearch className="text-[#e5e7eb] text-lg" />
        </div>
      </div>

      {/* View Profiles Label */}
      <p className="text-[12px] mb-2 text-[#CCCCCC]">View Profiles</p>

      {/* Dealer Boxes */}
      <div className="space-y-6 mb-24">
        {dealerProfiles.map((dealer) => (
          <div key={dealer.id} className="bg-[#031123] text-[15px] text-[#CCCCCC] p-4 rounded">
            <h2 className="text-[30px] font-bold mb-8 text-center bg-white text-[#031123] py-4 rounded">
              {dealer.name}
            </h2>
            <p className='mb-2'>{dealer.address}</p>
            <p className='mb-2'>{dealer.city}</p>
            <p className="mb-10">{dealer.phone_number}</p>
            <div className="flex space-x-2">
              <button className="flex-1 bg-[#4F89FC] text-white py-2 rounded-lg">Edit Profile</button>
              <button className="flex-1 bg-[#6C0A93] text-white py-2 rounded-lg">View Stocks</button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-[#00193b] text-center text-xs text-[#CCCCCC] py-2">
        <p>Copyright © 2025 By Metro Scales. All Rights Reserved</p>
        <p>Powered By ByteBandits</p>
      </div>
    </div>
  );
};

export default Dealers;
