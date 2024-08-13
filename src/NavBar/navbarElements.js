// components/Navbar/navbarElements.js

import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: linear-gradient(90deg, #63a9d4 0%, #233329 100%);
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  z-index: 12;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const NavLink = styled(Link)`
  color: #f0f0f0;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1.5rem;
  height: 100%;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  transition: color 0.3s ease-in-out;

  &.active {
    color: #ffffff;
    border-bottom: 3px solid #ffffff;
  }

  &:hover {
    color: #000000;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #f0f0f0;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 50%;
    right: 1.5rem;
    transform: translate(-50%, -50%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #233329;
  padding: 10px 22px;
  color: #f0f0f0;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  margin-left: 24px;

  &:hover {
    background: #63d471;
    color: #ffffff;
    transition: all 0.3s ease-in-out;
  }
`;
