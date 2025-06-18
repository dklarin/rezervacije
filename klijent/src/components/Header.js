import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #333;
  color: #fff;
  padding: 20px;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav``;

const NavigacijaWrap = styled.div`
  display: flex;
  width: 100vw;
`;

const Prazno = styled.div`
  flex: 1;
`;

const Navigacija = styled.ul`
  flex: 2;
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: center;
`;

const NavigacijaItem = styled.li``;

const NavigacijaLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.2em;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #ffd700;
  }
`;

function Header() {
  return (
    <HeaderWrapper>
      <Nav>
        <NavigacijaWrap>
          <Prazno />
          <Navigacija>
            <NavigacijaItem>
              <NavigacijaLink to="/">Početna</NavigacijaLink>
            </NavigacijaItem>
            <NavigacijaItem>
              <NavigacijaLink to="/nova">Nova rezervacija</NavigacijaLink>
            </NavigacijaItem>
            <NavigacijaItem>
              <NavigacijaLink to="/kalendar">Kalendar</NavigacijaLink>
            </NavigacijaItem>
          </Navigacija>
        </NavigacijaWrap>
      </Nav>
    </HeaderWrapper>
  );
}

export default Header;
