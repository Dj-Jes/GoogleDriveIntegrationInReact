import React, { useState, useEffect } from 'react';
import GoogleDriveGetDocFile from '../GoogleDriveFunctions/GoogleDriveGetDocFile';
import fetchImagesFromSubfolder from '../GoogleDriveFunctions/GoogleDriveFetchImageIdsFromSubfolder';

import { docFileId, FOLDER_ID } from "../SharedRecources"; // Add your image folder ID here

const HomePage = () => {
    const [sections, setSections] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Fetch images from the specific folder for the homepage
        fetchImagesFromSubfolder(FOLDER_ID, setImages);
    }, []);

    return (
        <div className="homepage">
            <h2>Welcome to the Photo Gallery</h2>

            {/* Display the document sections */}
            <div className="doc-content">
                <GoogleDriveGetDocFile docFileId={docFileId} setSections={setSections} />
                {sections.map((section, index) => (
                    <div key={index} className="doc-section">
                        <h3>{section.type}</h3>
                        <p>{section.content}</p>
                    </div>
                ))}
            </div>

            {/* Display images */}
            <div className="image-gallery">
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Gallery Image ${index + 1}`} className="gallery-image" />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
