import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

const AppHeader = () => (
    <Navbar fluid>
        <Navbar.Brand>
            <Link to="/">Tic-Tac-Toe (Standalone)</Link>
        </Navbar.Brand>
    </Navbar>
);

export default AppHeader;