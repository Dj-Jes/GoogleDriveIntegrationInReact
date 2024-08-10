import React, { useState } from 'react';

import GoogleDriveGetImagesFromFolder from './GoogleDriveFunctions/GoogleDriveGetImagesFromFolder';
import GoogleDriveGetSubFolders from './GoogleDriveFunctions/GoogleDriveGetSubfolders';
import FolderGallery from "./Components/DisplayComponent/FolderGallery";
import PhotoGallery from "./Components/DisplayComponent/PhotoGallery";


function App() {
    const [images, setImages] = useState([]);
    const [subFolders, setSubFolders] = useState([]);

    return (
        <div className="App">
            <h1>Photo Gallery</h1>
            <GoogleDriveGetSubFolders setSubfolders={setSubFolders} />
            <GoogleDriveGetImagesFromFolder setImages={setImages} />

            <h2>Folders</h2>
            <FolderGallery folders={subFolders} />

            <h2>Images</h2>
            <PhotoGallery images={images} />
        </div>
    );
}

export default App;