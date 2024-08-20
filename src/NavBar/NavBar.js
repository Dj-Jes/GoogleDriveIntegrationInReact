import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu
} from "./navbarElements";

const NavBar = () => {
    return (
        <Nav>
            <Bars />
            <NavMenu>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/subFolders">Subfolders</NavLink>
                <NavLink to="/Projects">Projects</NavLink>
            </NavMenu>
        </Nav>
    );
};

export default NavBar;
