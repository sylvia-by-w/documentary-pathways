import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Directors from "./pages/Directors";
import XuTong from "./pages/XuTong";
import "./styles/style.css";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/directors" element={<Directors />} />
        <Route path="/directors/xu-tong" element={<XuTong />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;