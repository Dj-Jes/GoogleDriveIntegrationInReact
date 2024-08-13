import React, { useState, useEffect } from 'react';
import fetchSubfolders from '../GoogleDriveFunctions/GoogleDriveGetSubfolders';
import fetchImagesFromSubfolder from '../GoogleDriveFunctions/GoogleDriveGetImagesFromSubfolder';
import PhotoGallery from '../Components/DisplayComponent/PhotoGallery';
import FolderGallery from "../Components/DisplayComponent/FolderGallery";

const FolderPage = () => {
    const [subFolders, setSubFolders] = useState([]);
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [selectedFolderImages, setSelectedFolderImages] = useState([]);

    useEffect(() => {
        fetchSubfolders(setSubFolders);
    }, []);

    useEffect(() => {
        if (selectedFolderId) {
            fetchImagesFromSubfolder(selectedFolderId, setSelectedFolderImages);
        }
    }, [selectedFolderId]);

    const handleFolderClick = (folderId) => {
        setSelectedFolderId(folderId);  // This will trigger the useEffect above
    };

    return (
        <div>
            <h2>Folders</h2>
            <FolderGallery folders={subFolders} onFolderClick={handleFolderClick} />
            {selectedFolderImages.length > 0 && <PhotoGallery images={selectedFolderImages} />}
        </div>
    );
};

export default FolderPage;
