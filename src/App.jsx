import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import HomeManagement from "./components/Home-Management";
import Dealers from "./components/Dealers";
import DealerManagement from "./components/DealerManagement";
import UpdateDealer from "./components/UpdateDealer";
import DealerStocks from "./components/DealerStocks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home-management" element={<HomeManagement/>}/>
        <Route path="/dealers" element={<Dealers/>}/>
        <Route path="/dealer-management" element={<DealerManagement/>}/>
        <Route path="/update-dealer" element={<UpdateDealer/>}/>
        <Route path="/dealer-stocks" element={<DealerStocks/>}/>
      </Routes>
    </Router>
  );
}

export default App;
