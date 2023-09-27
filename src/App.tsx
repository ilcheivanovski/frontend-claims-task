import React from "react";
import {
  Link,
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import styled from "styled-components";
import { Claims } from "./components/Claims";
import { Covers } from "./components/Covers";
import { Home } from "./components/Home";

const Navbar = styled.div`
  display: flex;
  align-items: center;
  & a {
    color: currentColor;
    text-decoration: none;
  }
  background-color: LightGray;
  height: 50px;
`;

const NavLinkItem = styled(Link)`
  font-weight: bolder;
  padding: 10px;
  &:hover {
    background-color: white;
  }
`;

const Content = styled.div`
  margin: 50px;
`;

function App() {
  return (
    <Router>
      <Navbar>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
          to="/"
        >
          <NavLinkItem to="/">Home</NavLinkItem>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
          to="/claims"
        >
          <NavLinkItem to="/claims">Claims</NavLinkItem>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
          to="/covers"
        >
          <NavLinkItem to="/covers">Covers</NavLinkItem>
        </NavLink>
      </Navbar>
      <Content>
        <Routes>
          <Route path="/claims" element={<Claims />} />
          <Route path="/covers" element={<Covers />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Content>
    </Router>
  );
}

export default App;
