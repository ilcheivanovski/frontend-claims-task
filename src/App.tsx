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

const NavLinkItem = styled(NavLink)`
  font-weight: bolder;
  padding: 10px;
  &:hover {
    background-color: white;
  }
  &.active {
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
        <NavLinkItem
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Home
        </NavLinkItem>

        <NavLinkItem
          to="/claims"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Claims
        </NavLinkItem>

        <NavLinkItem
          to="/covers"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Covers
        </NavLinkItem>
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
