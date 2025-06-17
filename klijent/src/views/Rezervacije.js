import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
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

const Rezervacije = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // opcionalno za loading state
   const [filter, setFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/rezervacije")
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

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Gost", accessor: "gost" },
      {
        Header: "Apartman",
        accessor: "boja",
        Cell: ({ value }) => (
          <ColorCell color={value}>{labelMap[value] || value}</ColorCell>
        ),
      },
      {
        Header: "Dolazak",
        accessor: "dolazak",
        align: "center",
        Cell: ({ value }) => {
          if (!value) return "";
          const date = new Date(value);
          return date.toLocaleDateString("hr-HR"); // daje format 25.08.2025.
        }
      },
      {
        Header: "Odlazak",
        accessor: "odlazak",
        align: "center",
        Cell: ({ value }) => {
          if (!value) return "";
          const date = new Date(value);
          return date.toLocaleDateString("hr-HR"); // daje format 25.08.2025.
        },
      },
    ],
    []
  );

  // Filtriranje podataka prema ključnoj riječi
  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: filteredData });

  //if (loading) return <div>Učitavanje...</div>;
  if (loading) return <Loader />;

  return (
    <CenterWrapper>
      <StyledInput
        style={{marginTop: 100}}
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
                  {...column.getHeaderProps()}
                  key={column.id}
                  align={column.align}
                >
                  {column.render("Header")}
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

export default Rezervacije;
