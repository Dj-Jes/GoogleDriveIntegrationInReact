import React from 'react';


import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import NavBar from "./NavBar/NavBar";
import HomePage from "./Pages/HomePage";
import FolderPage from "./Pages/FolderPage";
import Projects from "./Pages/Projects";

function App() {

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/subFolders" element={<FolderPage />} />
                <Route path="/Projects" element={<Projects />} />
            </Routes>
        </Router>
    );
}

export default App;
