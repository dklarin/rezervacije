import React, { useState, useEffect } from "react";
import styled from "styled-components";
//import data from "../data.json";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader"; // prilagodi putanju ako treba

// Stilizirani kontejner za detalje
const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  margin: 40px auto;
  padding: 24px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

// Redak s labelom i vrijednošću
const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  color: #888;
  font-weight: 500;
`;

const Value = styled.span`
  color: #222;
  font-weight: 600;
`;

const ColorValue = styled(Value)`
  background: ${(props) => props.color || "transparent"};
  color: #fff;
  padding: 2px 10px;
  border-radius: 6px;
`;

const labelMap = {
  brown: "Smeđi",
  green: "Zeleni",
  lightblue: "Svijetloplavi",
  darkgray: "Stan",
};

const PrikazDetalja = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true); // opcionalno za loading state

  const { id } = useParams();

  const navigate = useNavigate();

  const dohvatiRezervaciju = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/rezervacije/${id}`
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      alert("Greška pri dohvaćanju rezervacije!");
    }
  };

  useEffect(() => {
    dohvatiRezervaciju(id);
  }, [id]);

  const obrisiRezervaciju = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/rezervacije-brisi/${id}`
      );
      if (response.data.status === "obrisano") {
        navigate("/rezervacije");
        alert(`Rezervacija s ID ${id} je obrisana!`);
        // Osvježi prikaz ili ponovno učitaj podatke
      }
    } catch (error) {
      alert("Greška pri brisanju rezervacije!");
    }
  };

  function formatirajDatum(datum) {
    const [godina, mjesec, dan] = datum.split("-");
    return `${dan}.${mjesec}.${godina}.`;
  }

  function getDaysBetween(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    // Postavi vrijeme na ponoć za točan izračun
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    return Math.round(Math.abs((d2 - d1) / millisecondsPerDay));
  }

  if (loading) return <Loader />;

  return (
    <DetailWrapper>
      <DetailRow>
        <Label>ID:</Label>
        <Value>{data.id}</Value>
      </DetailRow>
      <DetailRow>
        <Label>Gost:</Label>
        <Value>{data.gost}</Value>
      </DetailRow>
      <DetailRow>
        <Label>Apartman:</Label>
        <ColorValue color={data.boja}>
          {labelMap[data.boja] || data.boja}
        </ColorValue>
      </DetailRow>
      <DetailRow>
        <Label>Dolazak:</Label>
        <Value>{formatirajDatum(data.dolazak)}</Value>
      </DetailRow>
      <DetailRow>
        <Label>Odlazak:</Label>
        <Value>{formatirajDatum(data.odlazak)}</Value>
      </DetailRow>
      <DetailRow>
        <Label>Broj noći:</Label>
        <Value>{getDaysBetween(data.dolazak, data.odlazak)}</Value>
      </DetailRow>
      <DetailRow>
        <Label>Kanal prodaje:</Label>
        <Value>{data.kanal_prodaje}</Value>
      </DetailRow>
      <button onClick={() => navigate(-1)}>Natrag</button>
      <button onClick={() => obrisiRezervaciju(id)}>Obriši</button>
    </DetailWrapper>
  );
};

export default PrikazDetalja;
