import React, { useState, useEffect } from 'react';
import GoogleDriveGetDocFile from '../GoogleDriveFunctions/GoogleDriveGetDocFile';
import fetchImagesFromSubfolder from '../GoogleDriveFunctions/GoogleDriveFetchImageIdsFromSubfolder';
import { docFileId, FOLDER_ID } from "../SharedRecources";

const HomePage = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Fetch images from the specific folder for the homepage
        fetchImagesFromSubfolder(FOLDER_ID, setImages);
    }, []);

    return (
        <div className="homepage">
            <h2>Welcome to the Photo Gallery</h2>

            {/* Display the document content */}
            <div className="doc-content">
                <GoogleDriveGetDocFile docFileId={docFileId} />
            </div>

        </div>
    );
};

export default HomePage;
