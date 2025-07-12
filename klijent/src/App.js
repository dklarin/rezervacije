import { Routes, Route, Navigate } from "react-router-dom";
import PrikazDetalja from "./views/PrikazDetalja";
import Rezervacije from "./views/Rezervacije";
import NovaRezervacija from "./views/NovaRezervacija";
import MojFullCalendar from "./views/Kalendar";
import Header from "./components/Header"; // prilagodi putanju prema svom projektu
import Rjecnik from "./views/Rjecnik";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/rezervacije" replace />} />
        <Route path="/rjecnik" element={<Rjecnik />} />
        <Route path="/rezervacije" element={<Rezervacije />} />
        <Route path="/rezervacija/:id" element={<PrikazDetalja />} />
        <Route path="/nova" element={<NovaRezervacija />} />
        <Route path="/kalendar" element={<MojFullCalendar />} />
      </Routes>
    </>
  );
}

export default App;
