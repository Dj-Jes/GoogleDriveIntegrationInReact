import React, { useState } from 'react';
import GoogleDriveGetImagesFromFolder from './GoogleDriveFunctions/GoogleDriveGetImagesFromFolder';
import GoogleDriveGetSubFolders from './GoogleDriveFunctions/GoogleDriveGetSubfolders';
import FolderGallery from "./Components/DisplayComponent/FolderGallery";
import PhotoGallery from "./Components/DisplayComponent/PhotoGallery";
import GoogleDriveGetImagesFromSubfolder from './GoogleDriveFunctions/GoogleDriveGetImagesFromSubfolder';

function App() {
    const [images, setImages] = useState([]);
    const [subFolders, setSubFolders] = useState([]);
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [selectedFolderImages, setSelectedFolderImages] = useState([]);

    const handleFolderClick = (folderId) => {
        // Set the selected folder ID
        setSelectedFolderId(folderId);
        // Fetch images from the clicked folder
        setSelectedFolderImages([]);
        return <GoogleDriveGetImagesFromSubfolder folderId={folderId} setImages={setSelectedFolderImages} />;
    };

    return (
        <div className="App">
            <h1>Photo Gallery</h1>

            <GoogleDriveGetSubFolders setSubfolders={setSubFolders} />
            <GoogleDriveGetImagesFromFolder setImages={setImages} />

            <h2>Predefined Images</h2>
            <PhotoGallery images={images} />

            <h2>Folders</h2>
            <FolderGallery folders={subFolders} onFolderClick={handleFolderClick} />

            {selectedFolderId && (
                <div>
                    <h2>Selected Folder ID: {selectedFolderId}</h2>
                    <GoogleDriveGetImagesFromSubfolder folderId={selectedFolderId} setImages={setSelectedFolderImages} />
                </div>
            )}

            {selectedFolderImages.length > 0 && (
                <div>
                    <h2>Images in Selected Folder</h2>
                    <PhotoGallery images={selectedFolderImages} />
                </div>
            )}
        </div>
    );
}

export default App;
