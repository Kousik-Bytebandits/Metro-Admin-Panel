import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import HomeManagement from "./components/Home-Management";
import Dealers from "./components/Dealers";
import DealerManagement from "./components/DealerManagement";
import UpdateDealer from "./components/UpdateDealer";
import DealerStocks from "./components/DealerStocks";
import ScrollToTop from "./components/ScrollToTop";
import StockDetails from "./components/StockDetails";
import CustomerInvoice from "./components/CustomerInvoice";
import PrintableInvoice from "./components/PrintableInvoice";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        
        <Route path="/" element={<Login />} />
        
        <Route
          path="/home-management"
          element={
            <ProtectedRoute>
              <HomeManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dealers"
          element={
            <ProtectedRoute>
              <Dealers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dealer-management"
          element={
            <ProtectedRoute>
              <DealerManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-dealer"
          element={
            <ProtectedRoute>
              <UpdateDealer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dealers/:id/stocks"
          element={
            <ProtectedRoute>
              <DealerStocks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dealers/:id/stocks/:date"
          element={
            <ProtectedRoute>
              <StockDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer-invoice"
          element={
            <ProtectedRoute>
              <CustomerInvoice />
            </ProtectedRoute>
          }
        />
         <Route
          path="/print"
          element={
            <ProtectedRoute>
              <PrintableInvoice />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
