import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Dropdown from "../components/Dropdown";

// Početno prazno stanje forme
const PocetniRed = {
  gost: "",
  boja: "",
  dolazak: "",
  odlazak: "",
};

// Definiraš svoj styled input
const StyledInput = styled.input`
  padding: 10px 16px;
  border: 2px solid #3498db;
  border-radius: 6px;
  font-size: 1em;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #2ecc71;
  }
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

const NovaRezervacija = () => {
  const [noviRed, setNoviRed] = useState(PocetniRed);
  const [poruka, setPoruka] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Promjena vrijednosti inputa
  const handleChange = (e) => {
    setNoviRed({ ...noviRed, [e.target.name]: e.target.value });
  };

  // Slanje forme na Flask backend
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setPoruka("");
    fetch("http://localhost:5000/api/rezervacije", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noviRed),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Greška pri slanju!");
        return res.json();
      })
      .then(() => {
        setPoruka("Uspješno dodano!");
        setNoviRed(PocetniRed);
        // Redirekcija na /rezervacije
        navigate("/rezervacije");
      })
      .catch(() => setPoruka("Greška pri slanju!"))
      .finally(() => setLoading(false));
  };

  const opcije = ["Prva", "Druga", "Treća"];

  const handleSelect = (odabrano) => {
    alert(`Odabrali ste: ${odabrano}`);
  };

  return (
    <div style={{ margin: "32px 0" }}>
      <h3>Dodaj novu rezervaciju</h3>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          maxWidth: 320,
          margin: "0 auto",
        }}
      >
        <StyledInput
          name="gost"
          placeholder="Gost"
          value={noviRed.gost}
          onChange={handleChange}
          required
        />
        <Dropdown
          placeholder="boja"
          options={["brown", "green", "lighblue", "darkgray"]}
          onSelect={(value) => setNoviRed({ ...noviRed, boja: value })}
        />

        <StyledInput
          name="bojaa"
          placeholder="Boja (npr. red, green, lightblue)"
          value={noviRed.boja}
          onChange={handleChange}
          required
        />
        <StyledInput
          name="dolazak"
          placeholder="Dolazak (dd.mm.yyyy)"
          value={noviRed.dolazak}
          onChange={handleChange}
          required
        />
        <StyledInput
          name="odlazak"
          placeholder="Odlazak (dd.mm.yyyy)"
          value={noviRed.odlazak}
          onChange={handleChange}
          required
        />
        <NextButton type="submit" disabled={loading}>
          {loading ? "Dodavanje..." : "Dodaj"}
        </NextButton>
      </form>
      {poruka && <div style={{ marginTop: 8 }}>{poruka}</div>}
    </div>
  );
};

export default NovaRezervacija;
