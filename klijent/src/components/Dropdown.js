import React, { useState } from "react";
import styled from "styled-components";

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  padding: 10px 20px;
  background: #333;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1em;
  border-radius: 4px;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  background: #fff;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 160px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 0;
  margin: 0;
  z-index: 100;
  list-style: none;
`;

const DropdownItem = styled.li`
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
`;

function Dropdown({ options, onSelect }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    setOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <DropdownWrapper>
      <DropdownButton onClick={() => setOpen((prev) => !prev)}>
        Odaberi opciju ▼
      </DropdownButton>
      {open && (
        <DropdownList>
          {options.map((option, idx) => (
            <DropdownItem key={idx} onClick={() => handleSelect(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownWrapper>
  );
}

export default Dropdown;
