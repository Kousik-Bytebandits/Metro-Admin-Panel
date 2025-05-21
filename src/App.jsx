import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import HomeManagement from "./components/Home-Management";
import Dealers from "./components/Dealers";
import DealerManagement from "./components/DealerManagement";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home-management" element={<HomeManagement/>}/>
        <Route path="/dealers" element={<Dealers/>}/>
        <Route path="/dealer-management" element={<DealerManagement/>}/>
      </Routes>
    </Router>
  );
}

export default App;
