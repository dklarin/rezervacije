import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
/*import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";*/

import styled from "styled-components";

import Loader from "../components/Loader";

// Primjer događaja (možeš dohvatiti iz API-ja ili state-a)
const pocetniDogadaji = [
  { title: "Rezervacija 1", date: "2025-06-23" },
  { title: "Rezervacija 2", date: "2025-06-25" },
];

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3%;
`;

export const NextButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  font-size: 20px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

const adresa = "https://rezervacije.onrender.com/"

const Kalendar = () => {
  const [dogadaji, setDogadaji] = useState(pocetniDogadaji);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // opcionalno za loading state

  useEffect(() => {
    fetch(`${adresa}/api/rezervacije`)
      .then((res) => res.json())
      .then((podaci) => {
        setData(podaci);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("Greška pri dohvaćanju podataka!");
      });
  }, []);

  // Primjer: dodaj novi događaj klikom na datum
  const handleDateClick = (info) => {
    const naslov = prompt("Unesi naziv događaja:");
    if (naslov) {
      setDogadaji([...dogadaji, { title: naslov, date: info.dateStr }]);
    }
  };

  // Funkcija za pretvaranje rezervacija u FullCalendar evente
  const events = data.map((r) => ({
    title: r.gost,
    start: r.dolazak,
    // Dodaj +1 dan na odlazak da bi i taj dan bio prikazan u rasponu
    end: new Date(new Date(r.odlazak).getTime() + 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10),
    color: r.boja,
  }));

  if (loading) return <Loader />;

  return (
    <div style={{ maxWidth: 1000, margin: "80px auto" }}>
      <h2>Kalendar rezervacija</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="hr" // hrvatski jezik
        height={740}
        events={events}
        dateClick={handleDateClick}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth",
        }}
      />
      <ButtonWrapper>
        <NextButton>Resetiraj kviz</NextButton>
      </ButtonWrapper>
    </div>
  );
};

export default Kalendar;
