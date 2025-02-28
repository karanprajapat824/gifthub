import "./App.css";
import Dashboard from "./component/Dashboard";
import Product from './component/Product';
import Navbar from './component/Navbar';
import { BrowserRouter,Routes,Route } from "react-router-dom";
function App() {
  return (
   <div>
    <BrowserRouter >
      <Navbar />
      <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/products" element={<Product />}></Route>
      </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
