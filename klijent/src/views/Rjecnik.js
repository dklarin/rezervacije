import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable, useSortBy } from "react-table";
// ...import tvojih styled komponenti i labelMap
import styled from "styled-components";
import Loader from "../components/Loader"; // prilagodi putanju ako treba

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Centriraj sve horizontalno */
  width: 100%;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  min-width: 600px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
`;

const StyledTh = styled.th`
  padding: 12px 20px;
  background: #f4f6f8;
  text-align: ${(props) => props.align || "left"};
  font-weight: 600;
  border-bottom: 2px solid #e0e0e0;
`;

const StyledTd = styled.td`
  padding: 10px 18px;
  text-align: ${(props) => props.align || "left"};
  border-bottom: 1px solid #e0e0e0;
  background: ${(props) => props.cellcolor || "transparent"};
  color: ${(props) => (props.cellcolor ? "#fff" : "#222")};
  font-weight: ${(props) => (props.cellcolor ? "bold" : "normal")};
  transition: background 0.3s;
`;

const labelMap = {
  brown: "Smeđi",
  green: "Zeleni",
  lightblue: "Svijetloplavi",
  darkgray: "Stan",
};

const ColorCell = styled.div`
  background: ${(props) => props.color || "transparent"};
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
`;

const StyledRow = styled.tr`
  cursor: pointer;
  &:hover {
    background: #f0f6ff;
  }
`;

const StyledInput = styled.input`
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  color: #111827;
  min-width: 600px;
  border: none;
  border-radius: 0.375rem;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 1.5rem; /* Razmak ispod inputa */
  transition: background-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    background-color: #e0e7ef;
    box-shadow: 0 0 0 2px #3b82f6;
  }
`;

const adresa = "https://rezervacije.onrender.com/"
//const adresa = "http://localhost:5000/";

const Rjecnik = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // opcionalno za loading state
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${adresa}/api/rjecnik`)
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

  function getDaysBetween(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    // Postavi vrijeme na ponoć za točan izračun
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    return Math.round(Math.abs((d2 - d1) / millisecondsPerDay));
  }

  function getDaysUntil(dateString) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // postavi na početak dana
    const targetDate = new Date(dateString);
    targetDate.setHours(0, 0, 0, 0);
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    return Math.ceil((targetDate - today) / millisecondsPerDay);
  }

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Talijanski", accessor: "talijanski" },
      { Header: "Hrvatski", accessor: "hrvatski" },
      { Header: "Grupa", accessor: "grupa" },     
    ],
    []
  );

  // Filtriranje podataka prema ključnoj riječi
  /*const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        value && value.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );*/

  const filteredData = React.useMemo(
    () =>
      data.filter((row) =>
        Object.values(row).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(filter.toLowerCase())
        )
      ),
    [data, filter]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: filteredData,
        initialState: { sortBy: [{ id: "dolazak", desc: false }] },
      },
      useSortBy
    );

  /*const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: filteredData,
        initialState: { sortBy: [{ id: "dolazak", desc: false }] }, // sortiraj po datumu uzlazno po defaultu
      },
      useSortBy
    );*/

  //if (loading) return <div>Učitavanje...</div>;
  if (loading) return <Loader />;

  return (
    <CenterWrapper>
      <StyledInput
        style={{ marginTop: 100 }}
        placeholder="Pretraži po ključnoj riječi..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <StyledTh
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                  align={column.align}
                >
                  {column.render("Header")}
                  {/* Ikona sortiranja */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </StyledTh>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <StyledRow
                {...row.getRowProps()}
                key={row.id}
                onClick={() => navigate(`/rezervacija/${row.original.id}`)}
              >
                {row.cells.map((cell) => (
                  <StyledTd
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    align={cell.column.align}
                    cellcolor={
                      cell.column.id === "boja" ? cell.value : undefined
                    }
                  >
                    {cell.render("Cell")}
                  </StyledTd>
                ))}
              </StyledRow>
            );
          })}
        </tbody>
      </StyledTable>
    </CenterWrapper>
  );
};

export default Rjecnik;
