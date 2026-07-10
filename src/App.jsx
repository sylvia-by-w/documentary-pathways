import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Directors from "./pages/Directors";
import XuTong from "./pages/XuTong";
import Notes from "./pages/Notes";
import NoteDetail from "./pages/NoteDetail";
import Pathways from "./pages/Pathways";
import PathwayDetail from "./pages/PathwayDetail";
import "./styles/style.css";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/directors" element={<Directors />} />
        <Route path="/directors/xu-tong" element={<XuTong />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:id" element={<NoteDetail />} />
        <Route path="/pathways" element={<Pathways />} />
        <Route path="/pathways/:id" element={<PathwayDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;