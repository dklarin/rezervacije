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
        <Value>{data.apartman}</Value>
      </DetailRow>
      <DetailRow>
        <Label>Status:</Label>
        <ColorValue color={data.boja}>{data.boja}</ColorValue>
      </DetailRow>
      <DetailRow>
        <Label>Dolazak:</Label>
        <Value>{data.dolazak}</Value>
      </DetailRow>
      <DetailRow>
        <Label>Odlazak:</Label>
        <Value>{data.odlazak}</Value>
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
