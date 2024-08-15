import React from 'react';


import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import NavBar from "./NavBar/NavBar";
import HomePage from "./Pages/HomePage";
import FolderPage from "./Pages/FolderPage";
import FolderPageTest from "./Pages/FolderPageTest";

function App() {

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/subFolders" element={<FolderPage />} />
                <Route path="/subFoldersTest" element={<FolderPageTest />} />
            </Routes>
        </Router>
    );
}

export default App;
