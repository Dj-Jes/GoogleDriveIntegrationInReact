import React, { useState } from 'react';
import PhotoGallery from './PhotoGallery';
import GoogleDriveGetImagesFromFolder from './GoogleDriveFunctions/GoogleDriveGetImagesFromFolder';

function App() {
    const [images, setImages] = useState([]);

    return (
        <div className="App">
            <h1>Photo Gallery</h1>
            <GoogleDriveGetImagesFromFolder setImages={setImages} />
            <PhotoGallery images={images} />
        </div>
    );
}

export default App;
