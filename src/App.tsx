import React from "react";
import {
  Link,
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import styled from "styled-components";
import { ClaimsPage } from "./components/Claims";
import { CoversPage } from "./components/Covers";
import { HomePage } from "./components/Home";
import { CoverPage } from "./components/Cover";

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
          <Route path="/" element={<HomePage />} />
          <Route path="/claims" element={<ClaimsPage />} />
          <Route path="/covers" element={<CoversPage />} />
          <Route path="/covers/:coverId" element={<CoverPage />} />
        </Routes>
      </Content>
    </Router>
  );
}

export default App;
